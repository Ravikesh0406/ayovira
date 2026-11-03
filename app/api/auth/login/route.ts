import { NextResponse } from "next/server";

import { startSession, verifyPassword } from "@/lib/auth";
import {
  findCustomerByEmail,
  findCustomerByMobile,
  toCustomer,
} from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { normalizeMobile } from "@/lib/validation";

export async function POST(request: Request) {
  const limit = rateLimit(`login:${clientIp(request)}`, 10, 10 * 60 * 1000);
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

  const identifier =
    typeof body.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!identifier || !password) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          identifier: !identifier ? "Enter your mobile number or email." : "",
          password: !password ? "Enter your password." : "",
        },
      },
      { status: 422 },
    );
  }

  const row = identifier.includes("@")
    ? await findCustomerByEmail(identifier)
    : await findCustomerByMobile(normalizeMobile(identifier));

  if (!row || !verifyPassword(password, row.password_hash)) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "That mobile number or email and password don't match. Please try again.",
        },
      },
      { status: 401 },
    );
  }

  await startSession(row.id);
  const customer = toCustomer(row);

  return NextResponse.json({
    ok: true,
    customer: { id: customer.id, fullName: customer.fullName },
  });
}
