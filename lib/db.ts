import { mkdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
import { createClient, type Client, type Row } from "@libsql/client";

import type { Customer, InterestValue, RoleValue } from "./types";

type CustomerRow = {
  id: string;
  full_name: string;
  mobile: string;
  email: string | null;
  password_hash: string;
  area: string;
  role: string | null;
  interests: string;
  consent_updates: number;
  consent_contact: number;
  consent_text_version: string;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
};

type NewCustomer = {
  fullName: string;
  mobile: string;
  email: string | null;
  passwordHash: string;
  area: string;
  role: RoleValue | null;
  interests: InterestValue[];
  consentUpdates: boolean;
  consentContact: boolean;
  consentTextVersion: string;
  sourcePage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

const globalForDb = globalThis as unknown as {
  ayoviraClient?: Client;
  ayoviraSchema?: Promise<void>;
};

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    area TEXT NOT NULL,
    role TEXT,
    interests TEXT NOT NULL DEFAULT '[]',
    consent_updates INTEGER NOT NULL DEFAULT 0,
    consent_contact INTEGER NOT NULL DEFAULT 0,
    consent_text_version TEXT NOT NULL,
    source_page TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_customer ON sessions(customer_id);
  CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
`;

function createDbClient(): Client {
  const url = process.env.TURSO_DATABASE_URL;
  if (url) {
    return createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  // Local fallback for development when Turso is not configured.
  const filePath = process.env.DATABASE_PATH
    ? path.resolve(process.env.DATABASE_PATH)
    : path.join(process.cwd(), "data", "ayovira.db");
  mkdirSync(path.dirname(filePath), { recursive: true });
  const fileUrl = pathToFileURL(filePath).href;
  return createClient({ url: fileUrl });
}

function getClient(): Client {
  if (!globalForDb.ayoviraClient) {
    globalForDb.ayoviraClient = createDbClient();
  }
  return globalForDb.ayoviraClient;
}

async function ensureSchema(): Promise<void> {
  if (!globalForDb.ayoviraSchema) {
    globalForDb.ayoviraSchema = getClient()
      .executeMultiple(SCHEMA)
      .catch((error) => {
        // Allow a later request to retry if the first attempt failed.
        globalForDb.ayoviraSchema = undefined;
        throw error;
      });
  }
  await globalForDb.ayoviraSchema;
}

async function db(): Promise<Client> {
  await ensureSchema();
  return getClient();
}

function toRow(row: Row): CustomerRow {
  return {
    id: String(row.id),
    full_name: String(row.full_name),
    mobile: String(row.mobile),
    email: row.email === null ? null : String(row.email),
    password_hash: String(row.password_hash),
    area: String(row.area),
    role: row.role === null ? null : String(row.role),
    interests: String(row.interests ?? "[]"),
    consent_updates: Number(row.consent_updates),
    consent_contact: Number(row.consent_contact),
    consent_text_version: String(row.consent_text_version),
    source_page: row.source_page === null ? null : String(row.source_page),
    utm_source: row.utm_source === null ? null : String(row.utm_source),
    utm_medium: row.utm_medium === null ? null : String(row.utm_medium),
    utm_campaign: row.utm_campaign === null ? null : String(row.utm_campaign),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

function parseInterests(value: string): InterestValue[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as InterestValue[]) : [];
  } catch {
    return [];
  }
}

export function toCustomer(row: CustomerRow): Customer {
  return {
    id: row.id,
    fullName: row.full_name,
    mobile: row.mobile,
    email: row.email,
    area: row.area,
    role: (row.role as RoleValue | null) ?? null,
    interests: parseInterests(row.interests),
    consentUpdates: Boolean(row.consent_updates),
    consentContact: Boolean(row.consent_contact),
    consentTextVersion: row.consent_text_version,
    sourcePage: row.source_page,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findCustomerByMobile(
  mobile: string,
): Promise<CustomerRow | undefined> {
  const client = await db();
  const result = await client.execute({
    sql: "SELECT * FROM customers WHERE mobile = ? LIMIT 1",
    args: [mobile],
  });
  return result.rows[0] ? toRow(result.rows[0]) : undefined;
}

export async function findCustomerByEmail(
  email: string,
): Promise<CustomerRow | undefined> {
  const client = await db();
  const result = await client.execute({
    sql: "SELECT * FROM customers WHERE email = ? LIMIT 1",
    args: [email],
  });
  return result.rows[0] ? toRow(result.rows[0]) : undefined;
}

export async function findCustomerById(id: string): Promise<Customer | null> {
  const client = await db();
  const result = await client.execute({
    sql: "SELECT * FROM customers WHERE id = ? LIMIT 1",
    args: [id],
  });
  return result.rows[0] ? toCustomer(toRow(result.rows[0])) : null;
}

export async function createCustomer(input: NewCustomer): Promise<Customer> {
  const client = await db();
  const id = randomUUID();
  const now = new Date().toISOString();

  await client.execute({
    sql: `INSERT INTO customers (
      id, full_name, mobile, email, password_hash, area, role, interests,
      consent_updates, consent_contact, consent_text_version, source_page,
      utm_source, utm_medium, utm_campaign, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.fullName,
      input.mobile,
      input.email,
      input.passwordHash,
      input.area,
      input.role,
      JSON.stringify(input.interests),
      input.consentUpdates ? 1 : 0,
      input.consentContact ? 1 : 0,
      input.consentTextVersion,
      input.sourcePage,
      input.utmSource,
      input.utmMedium,
      input.utmCampaign,
      now,
      now,
    ],
  });

  const created = await findCustomerById(id);
  if (!created) {
    throw new Error("Customer could not be created.");
  }
  return created;
}

export async function updateCustomer(
  id: string,
  input: {
    fullName: string;
    email: string | null;
    area: string;
    role: RoleValue | null;
    interests: InterestValue[];
    consentUpdates: boolean;
    consentContact: boolean;
  },
): Promise<Customer | null> {
  const client = await db();
  await client.execute({
    sql: `UPDATE customers SET
      full_name = ?, email = ?, area = ?, role = ?, interests = ?,
      consent_updates = ?, consent_contact = ?, updated_at = ?
    WHERE id = ?`,
    args: [
      input.fullName,
      input.email,
      input.area,
      input.role,
      JSON.stringify(input.interests),
      input.consentUpdates ? 1 : 0,
      input.consentContact ? 1 : 0,
      new Date().toISOString(),
      id,
    ],
  });
  return findCustomerById(id);
}

export async function updatePasswordHash(
  id: string,
  passwordHash: string,
): Promise<void> {
  const client = await db();
  await client.execute({
    sql: "UPDATE customers SET password_hash = ?, updated_at = ? WHERE id = ?",
    args: [passwordHash, new Date().toISOString(), id],
  });
}

export async function deleteCustomer(id: string): Promise<void> {
  const client = await db();
  await client.batch(
    [
      { sql: "DELETE FROM sessions WHERE customer_id = ?", args: [id] },
      { sql: "DELETE FROM customers WHERE id = ?", args: [id] },
    ],
    "write",
  );
}

export async function createSession(input: {
  tokenHash: string;
  customerId: string;
  expiresAt: string;
}): Promise<void> {
  const client = await db();
  await client.execute({
    sql: "INSERT INTO sessions (token_hash, customer_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
    args: [
      input.tokenHash,
      input.customerId,
      new Date().toISOString(),
      input.expiresAt,
    ],
  });
}

export async function findSessionCustomer(
  tokenHash: string,
): Promise<Customer | null> {
  const client = await db();
  const result = await client.execute({
    sql: `SELECT c.* FROM sessions s
      JOIN customers c ON c.id = s.customer_id
      WHERE s.token_hash = ? AND s.expires_at > ?
      LIMIT 1`,
    args: [tokenHash, new Date().toISOString()],
  });
  return result.rows[0] ? toCustomer(toRow(result.rows[0])) : null;
}

export async function deleteSession(tokenHash: string): Promise<void> {
  const client = await db();
  await client.execute({
    sql: "DELETE FROM sessions WHERE token_hash = ?",
    args: [tokenHash],
  });
}

export async function deleteSessionsForCustomer(
  customerId: string,
): Promise<void> {
  const client = await db();
  await client.execute({
    sql: "DELETE FROM sessions WHERE customer_id = ?",
    args: [customerId],
  });
}

export async function purgeExpiredSessions(): Promise<void> {
  const client = await db();
  await client.execute({
    sql: "DELETE FROM sessions WHERE expires_at <= ?",
    args: [new Date().toISOString()],
  });
}
