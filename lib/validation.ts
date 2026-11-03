import {
  INTEREST_VALUES,
  ROLE_VALUES,
  type InterestValue,
  type RoleValue,
  type ValidationResult,
} from "./types";

export const CONSENT_TEXT_VERSION = "2026-11-02-v1";

export type NormalizedSignup = {
  fullName: string;
  mobile: string;
  email: string | null;
  password: string;
  area: string;
  role: RoleValue | null;
  interests: InterestValue[];
  consentUpdates: boolean;
  consentContact: boolean;
  sourcePage: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

export type NormalizedProfile = {
  fullName: string;
  email: string | null;
  area: string;
  role: RoleValue | null;
  interests: InterestValue[];
  consentUpdates: boolean;
  consentContact: boolean;
};

const MOBILE_PATTERN = /^[6-9]\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeMobile(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function cleanName(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().replace(/\s+/g, " ") : "";
}

function cleanArea(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().replace(/\s+/g, " ") : "";
}

function cleanEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim().toLowerCase();
  return value.length > 0 ? value : null;
}

function cleanInterests(raw: unknown): InterestValue[] {
  if (!Array.isArray(raw)) return [];
  const values = raw.filter(
    (item): item is InterestValue =>
      typeof item === "string" && INTEREST_VALUES.includes(item as InterestValue),
  );
  return Array.from(new Set(values));
}

function cleanRole(raw: unknown): RoleValue | null {
  if (typeof raw !== "string") return null;
  return ROLE_VALUES.includes(raw as RoleValue) ? (raw as RoleValue) : null;
}

function cleanUtm(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim().slice(0, 80);
  return value.length > 0 ? value : null;
}

function consentError(): Record<string, string> {
  return {
    consent:
      "Please tick at least one option so we know how you'd like to hear from us.",
  };
}

export function validateSignup(
  body: Record<string, unknown>,
): ValidationResult<NormalizedSignup> {
  const errors: Record<string, string> = {};

  // Honeypot: real people never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return { ok: false, errors: { form: "Something went wrong. Please try again." } };
  }

  const fullName = cleanName(body.fullName);
  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length > 80) {
    errors.fullName = "Please keep your name under 80 characters.";
  }

  const mobile = normalizeMobile(String(body.mobile ?? ""));
  if (!MOBILE_PATTERN.test(mobile)) {
    errors.mobile = "Please enter a valid 10-digit Indian mobile number.";
  }

  const email = cleanEmail(body.email);
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, or leave it blank.";
  }
  if (email && email.length > 160) {
    errors.email = "Please use a shorter email address.";
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (password.length < 8) {
    errors.password = "Use at least 8 characters for your password.";
  } else if (password.length > 128) {
    errors.password = "Please use a password under 128 characters.";
  }

  const area = cleanArea(body.area);
  if (area.length < 2) {
    errors.area = "Please tell us your area or city.";
  } else if (area.length > 120) {
    errors.area = "Please keep this under 120 characters.";
  }

  if (!Array.isArray(body.interests)) {
    errors.interests = "Please choose at least one interest.";
  }

  const consentUpdates = body.consentUpdates === true;
  const consentContact = body.consentContact === true;
  if (!consentUpdates && !consentContact) {
    Object.assign(errors, consentError());
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName,
      mobile,
      email,
      password,
      area,
      role: cleanRole(body.role),
      interests: cleanInterests(body.interests),
      consentUpdates,
      consentContact,
      sourcePage: cleanUtm(body.sourcePage),
      utmSource: cleanUtm(body.utmSource),
      utmMedium: cleanUtm(body.utmMedium),
      utmCampaign: cleanUtm(body.utmCampaign),
    },
  };
}

export function validateProfile(
  body: Record<string, unknown>,
): ValidationResult<NormalizedProfile> {
  const errors: Record<string, string> = {};

  const fullName = cleanName(body.fullName);
  if (fullName.length < 2) errors.fullName = "Please enter your full name.";
  else if (fullName.length > 80) {
    errors.fullName = "Please keep your name under 80 characters.";
  }

  const email = cleanEmail(body.email);
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, or leave it blank.";
  }
  if (email && email.length > 160) {
    errors.email = "Please use a shorter email address.";
  }

  const area = cleanArea(body.area);
  if (area.length < 2) errors.area = "Please tell us your area or city.";
  else if (area.length > 120) errors.area = "Please keep this under 120 characters.";

  const consentUpdates = body.consentUpdates === true;
  const consentContact = body.consentContact === true;
  if (!consentUpdates && !consentContact) {
    Object.assign(errors, consentError());
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName,
      email,
      area,
      role: cleanRole(body.role),
      interests: cleanInterests(body.interests),
      consentUpdates,
      consentContact,
    },
  };
}

export function validatePassword(password: unknown): string | null {
  if (typeof password !== "string" || password.length < 8) {
    return "Use at least 8 characters for your new password.";
  }
  if (password.length > 128) return "Please use a password under 128 characters.";
  return null;
}
