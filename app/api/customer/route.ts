import { NextResponse } from "next/server";

import { endSession, getCurrentCustomer } from "@/lib/auth";
import {
  deleteCustomer,
  findCustomerByEmail,
  updateCustomer,
} from "@/lib/db";
import { validateProfile } from "@/lib/validation";

export async function GET() {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return NextResponse.json(
      { ok: false, errors: { form: "Please log in to continue." } },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { ok: true, customer },
    {
      headers: {
        "Content-Disposition": 'attachment; filename="ayovira-my-data.json"',
        "Cache-Control": "no-store",
      },
    },
  );
}

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

  const result = validateProfile(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const input = result.data;

  if (input.email) {
    const existing = await findCustomerByEmail(input.email);
    if (existing && existing.id !== customer.id) {
      return NextResponse.json(
        {
          ok: false,
          errors: {
            email: "Another account already uses this email address.",
          },
        },
        { status: 409 },
      );
    }
  }

  try {
    const updated = await updateCustomer(customer.id, input);
    return NextResponse.json({ ok: true, customer: updated });
  } catch (error) {
    console.error("Profile update failed", error);
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

export async function DELETE() {
  const customer = await getCurrentCustomer();
  if (!customer) {
    return NextResponse.json(
      { ok: false, errors: { form: "Please log in to continue." } },
      { status: 401 },
    );
  }

  await endSession();
  await deleteCustomer(customer.id);
  return NextResponse.json({ ok: true });
}
