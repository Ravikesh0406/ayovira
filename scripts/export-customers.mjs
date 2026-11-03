import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createClient } from "@libsql/client";

// Load local development settings when present. In production the values
// should already be provided by the environment.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    // Ignore missing files.
  }
}

const remoteUrl = process.env.TURSO_DATABASE_URL;
const localPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.join(process.cwd(), "data", "ayovira.db");

if (!remoteUrl && !existsSync(localPath)) {
  console.error(
    `No database found. Set TURSO_DATABASE_URL, or run the app locally to create ${localPath}.`,
  );
  process.exit(1);
}

const client = remoteUrl
  ? createClient({ url: remoteUrl, authToken: process.env.TURSO_AUTH_TOKEN })
  : createClient({ url: pathToFileURL(localPath).href });

let rows;
try {
  const result = await client.execute(
    `SELECT full_name, mobile, email, area, role, interests, consent_updates,
            consent_contact, consent_text_version, source_page, utm_source,
            utm_medium, utm_campaign, created_at, updated_at
     FROM customers
     ORDER BY created_at DESC`,
  );
  rows = result.rows;
} catch (error) {
  console.error(
    "Could not read customers:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}

const headers = [
  "full_name",
  "mobile",
  "email",
  "area",
  "role",
  "interests",
  "consent_updates",
  "consent_contact",
  "consent_text_version",
  "source_page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "created_at",
  "updated_at",
];

function escapeCell(value) {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (text.startsWith("=") || text.startsWith("+") || text.startsWith("-") || text.startsWith("@")) {
    text = `'${text}`;
  }
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

const lines = [headers.join(",")];
for (const row of rows) {
  const record = {
    ...row,
    interests: (() => {
      try {
        return JSON.parse(row.interests).join("; ");
      } catch {
        return row.interests;
      }
    })(),
    consent_updates: row.consent_updates ? "yes" : "no",
    consent_contact: row.consent_contact ? "yes" : "no",
  };
  lines.push(headers.map((header) => escapeCell(record[header])).join(","));
}

const exportDir = path.join(process.cwd(), "exports");
mkdirSync(exportDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const outPath = path.join(exportDir, `ayovira-customers-${stamp}.csv`);
writeFileSync(outPath, "\uFEFF" + lines.join("\r\n") + "\r\n", "utf8");

console.log(`Exported ${rows.length} customer(s) to ${outPath}`);
