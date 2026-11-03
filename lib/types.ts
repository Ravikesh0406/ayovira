export const INTERESTS = [
  { value: "yoga", label: "Yoga" },
  { value: "fitness", label: "Fitness and Zumba" },
  { value: "nutrition", label: "Nutrition" },
  { value: "meditation", label: "Meditation" },
  { value: "checkups", label: "Health check-ups" },
  { value: "all", label: "All of these" },
] as const;

export type InterestValue = (typeof INTERESTS)[number]["value"];

export const INTEREST_VALUES = INTERESTS.map((item) => item.value) as InterestValue[];

export const ROLES = [
  { value: "parent", label: "Parent" },
  { value: "professional", label: "Working professional" },
  { value: "student", label: "Student" },
  { value: "senior", label: "Senior citizen" },
  { value: "wellness-professional", label: "Wellness professional" },
  { value: "other", label: "Other" },
] as const;

export type RoleValue = (typeof ROLES)[number]["value"];

export const ROLE_VALUES = ROLES.map((item) => item.value) as RoleValue[];

export function roleLabel(value: string | null): string | null {
  return ROLES.find((role) => role.value === value)?.label ?? null;
}

export function interestLabel(value: string): string {
  return INTERESTS.find((interest) => interest.value === value)?.label ?? value;
}

export type Customer = {
  id: string;
  fullName: string;
  mobile: string;
  email: string | null;
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
  createdAt: string;
  updatedAt: string;
};

export type SignupInput = {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
  area: string;
  role: string;
  interests: string[];
  consentUpdates: boolean;
  consentContact: boolean;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  website?: string;
};

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };
