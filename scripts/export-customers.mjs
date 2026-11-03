import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.join(process.cwd(), "data", "ayovira.db");

if (!existsSync(dbPath)) {
  console.error(`No database found at ${dbPath}. Run the app and create an account first.`);
  process.exit(1);
}

const db = new DatabaseSync(dbPath);
const rows = db
  .prepare(
    `SELECT full_name, mobile, email, area, role, interests, consent_updates,
            consent_contact, consent_text_version, source_page, utm_source,
            utm_medium, utm_campaign, created_at, updated_at
     FROM customers
     ORDER BY created_at DESC`,
  )
  .all();

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
