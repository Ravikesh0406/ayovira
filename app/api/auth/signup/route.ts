import { NextResponse } from "next/server";

import { startSession, hashPassword } from "@/lib/auth";
import {
  createCustomer,
  findCustomerByEmail,
  findCustomerByMobile,
  purgeExpiredSessions,
} from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { CONSENT_TEXT_VERSION, validateSignup } from "@/lib/validation";

export async function POST(request: Request) {
  const limit = rateLimit(`signup:${clientIp(request)}`, 8, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "Too many attempts. Please wait a few minutes and try again.",
        },
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Something went wrong. Please try again." } },
      { status: 400 },
    );
  }

  const result = validateSignup(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const input = result.data;

  if (findCustomerByMobile(input.mobile)) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          mobile:
            "An account with this mobile number already exists. Please log in instead.",
        },
      },
      { status: 409 },
    );
  }

  if (input.email && findCustomerByEmail(input.email)) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          email: "An account with this email already exists. Please log in instead.",
        },
      },
      { status: 409 },
    );
  }

  try {
    const customer = createCustomer({
      fullName: input.fullName,
      mobile: input.mobile,
      email: input.email,
      passwordHash: hashPassword(input.password),
      area: input.area,
      role: input.role,
      interests: input.interests,
      consentUpdates: input.consentUpdates,
      consentContact: input.consentContact,
      consentTextVersion: CONSENT_TEXT_VERSION,
      sourcePage: input.sourcePage,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
    });

    purgeExpiredSessions();
    await startSession(customer.id);

    return NextResponse.json(
      {
        ok: true,
        customer: { id: customer.id, fullName: customer.fullName },
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNIQUE constraint failed")) {
      return NextResponse.json(
        {
          ok: false,
          errors: {
            form: "An account with those details already exists. Please log in instead.",
          },
        },
        { status: 409 },
      );
    }
    console.error("Signup failed", error);
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "Something went wrong. Please try again, or email us at theayovira@gmail.com.",
        },
      },
      { status: 500 },
    );
  }
}
