import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { randomUUID } from "node:crypto";

import type { Customer, InterestValue, RoleValue } from "./types";

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.join(process.cwd(), "data", "ayovira.db");

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

const globalForDb = globalThis as unknown as { ayoviraDb?: DatabaseSync };

function init(): DatabaseSync {
  mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const database = new DatabaseSync(DB_PATH);
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

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
      customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_customer ON sessions(customer_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
  `);
  return database;
}

export function getDb(): DatabaseSync {
  if (!globalForDb.ayoviraDb) {
    globalForDb.ayoviraDb = init();
  }
  return globalForDb.ayoviraDb;
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

export function findCustomerByMobile(mobile: string): CustomerRow | undefined {
  return getDb()
    .prepare("SELECT * FROM customers WHERE mobile = ?")
    .get(mobile) as CustomerRow | undefined;
}

export function findCustomerByEmail(email: string): CustomerRow | undefined {
  return getDb()
    .prepare("SELECT * FROM customers WHERE email = ?")
    .get(email) as CustomerRow | undefined;
}

export function findCustomerById(id: string): Customer | null {
  const row = getDb()
    .prepare("SELECT * FROM customers WHERE id = ?")
    .get(id) as CustomerRow | undefined;
  return row ? toCustomer(row) : null;
}

export function createCustomer(input: NewCustomer): Customer {
  const id = randomUUID();
  const now = new Date().toISOString();
  getDb()
    .prepare(
      `INSERT INTO customers (
        id, full_name, mobile, email, password_hash, area, role, interests,
        consent_updates, consent_contact, consent_text_version, source_page,
        utm_source, utm_medium, utm_campaign, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
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
    );

  const created = findCustomerById(id);
  if (!created) {
    throw new Error("Customer could not be created.");
  }
  return created;
}

export function updateCustomer(
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
): Customer | null {
  getDb()
    .prepare(
      `UPDATE customers SET
        full_name = ?, email = ?, area = ?, role = ?, interests = ?,
        consent_updates = ?, consent_contact = ?, updated_at = ?
      WHERE id = ?`,
    )
    .run(
      input.fullName,
      input.email,
      input.area,
      input.role,
      JSON.stringify(input.interests),
      input.consentUpdates ? 1 : 0,
      input.consentContact ? 1 : 0,
      new Date().toISOString(),
      id,
    );
  return findCustomerById(id);
}

export function updatePasswordHash(id: string, passwordHash: string): void {
  getDb()
    .prepare("UPDATE customers SET password_hash = ?, updated_at = ? WHERE id = ?")
    .run(passwordHash, new Date().toISOString(), id);
}

export function deleteCustomer(id: string): void {
  getDb().prepare("DELETE FROM customers WHERE id = ?").run(id);
}

export function createSession(input: {
  tokenHash: string;
  customerId: string;
  expiresAt: string;
}): void {
  getDb()
    .prepare(
      "INSERT INTO sessions (token_hash, customer_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
    )
    .run(input.tokenHash, input.customerId, new Date().toISOString(), input.expiresAt);
}

export function findSessionCustomer(tokenHash: string): Customer | null {
  const row = getDb()
    .prepare(
      `SELECT c.* FROM sessions s
       JOIN customers c ON c.id = s.customer_id
       WHERE s.token_hash = ? AND s.expires_at > ?`,
    )
    .get(tokenHash, new Date().toISOString()) as CustomerRow | undefined;
  return row ? toCustomer(row) : null;
}

export function deleteSession(tokenHash: string): void {
  getDb().prepare("DELETE FROM sessions WHERE token_hash = ?").run(tokenHash);
}

export function deleteSessionsForCustomer(customerId: string): void {
  getDb().prepare("DELETE FROM sessions WHERE customer_id = ?").run(customerId);
}

export function purgeExpiredSessions(): void {
  getDb()
    .prepare("DELETE FROM sessions WHERE expires_at <= ?")
    .run(new Date().toISOString());
}
