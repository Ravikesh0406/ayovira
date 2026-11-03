import { NextResponse } from "next/server";

import { getCurrentCustomer, hashPassword, verifyPassword } from "@/lib/auth";
import { findCustomerByMobile, updatePasswordHash } from "@/lib/db";
import { validatePassword } from "@/lib/validation";

export async function PATCH(request: Request) {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return NextResponse.json(
      { ok: false, errors: { form: "Please log in to continue." } },
      { status: 401 },
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

  const currentPassword =
    typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = body.newPassword;
  const newPasswordError = validatePassword(newPassword);

  const errors: Record<string, string> = {};
  if (!currentPassword) {
    errors.currentPassword = "Enter your current password.";
  }
  if (newPasswordError) {
    errors.newPassword = newPasswordError;
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const row = findCustomerByMobile(customer.mobile);
  if (!row || !verifyPassword(currentPassword, row.password_hash)) {
    return NextResponse.json(
      { ok: false, errors: { currentPassword: "That password is not correct." } },
      { status: 401 },
    );
  }

  updatePasswordHash(customer.id, hashPassword(newPassword as string));
  return NextResponse.json({ ok: true });
}
