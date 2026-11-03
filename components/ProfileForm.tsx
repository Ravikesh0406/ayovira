"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, ChevronDown, Loader2 } from "lucide-react";

import { INTERESTS, ROLES, type Customer } from "@/lib/types";

type ProfileFormProps = {
  customer: Customer;
};

export function ProfileForm({ customer }: ProfileFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interests, setInterests] = useState<string[]>(customer.interests);
  const [fullName, setFullName] = useState(customer.fullName);
  const [email, setEmail] = useState(customer.email ?? "");
  const [area, setArea] = useState(customer.area);
  const [role, setRole] = useState(customer.role ?? "");
  const [consentUpdates, setConsentUpdates] = useState(customer.consentUpdates);
  const [consentContact, setConsentContact] = useState(customer.consentContact);

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) nextErrors.fullName = "Please enter your full name.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address, or leave it blank.";
    }
    if (area.trim().length < 2) nextErrors.area = "Please tell us your area or city.";
    if (!consentUpdates && !consentContact) {
      nextErrors.consent =
        "Please keep at least one option ticked, or message us to close your account.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSaved(false);
      return;
    }

    setPending(true);
    setErrors({});
    setSaved(false);

    try {
      const response = await fetch("/api/customer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          area,
          role,
          interests,
          consentUpdates,
          consentContact,
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: "Something went wrong. Please try again." });
        return;
      }

      setSaved(true);
      router.refresh();
    } catch {
      setErrors({
        form:
          "Something went wrong. Please try again, or email us at theayovira@gmail.com.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {saved ? (
        <div className="form-banner success" role="status">
          Your details are saved.
        </div>
      ) : null}
      {errors.form ? (
        <div className="form-banner" role="alert">
          {errors.form}
        </div>
      ) : null}

      <div className="form-grid">
        <div className="field field-full">
          <label htmlFor="fullName">Full name</label>
          <input
            className="input"
            id="fullName"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            required
          />
          {errors.fullName ? (
            <p className="field-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="mobile">Mobile number</label>
          <input
            className="input"
            id="mobile"
            value={`+91 ${customer.mobile}`}
            disabled
            aria-describedby="mobile-help"
          />
          <p className="field-hint" id="mobile-help">
            Your mobile number identifies your account. Email us to change it.
          </p>
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="muted">(optional)</span>
          </label>
          <input
            className="input"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="field-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.email}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="area">Area in Faridabad (or city)</label>
          <input
            className="input"
            id="area"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.area)}
            required
          />
          {errors.area ? (
            <p className="field-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.area}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="role">
            I am a <span className="muted">(optional)</span>
          </label>
          <div className="select-wrap">
            <select
              className="select"
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              <option value="">Select one</option>
              {ROLES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" />
          </div>
        </div>

        <fieldset className="field field-full" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="field-label" style={{ marginBottom: 8 }}>
            I&apos;m interested in <span className="muted">(optional)</span>
          </legend>
          <div className="chip-group">
            {INTERESTS.map((interest) => {
              const checked = interests.includes(interest.value);
              return (
                <label className="chip" key={interest.value} data-checked={checked}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleInterest(interest.value)}
                  />
                  {checked ? <Check size={14} aria-hidden="true" /> : null}
                  {interest.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="consent-block">
          <label className="consent-row" htmlFor="consentUpdates">
            <input
              type="checkbox"
              id="consentUpdates"
              checked={consentUpdates}
              onChange={(event) => setConsentUpdates(event.target.checked)}
            />
            <span>
              Send me wellness tips and updates from Ayovira on WhatsApp or email.
            </span>
          </label>
          <label className="consent-row" htmlFor="consentContact">
            <input
              type="checkbox"
              id="consentContact"
              checked={consentContact}
              onChange={(event) => setConsentContact(event.target.checked)}
            />
            <span>Contact me about Ayovira camps and services.</span>
          </label>
          {errors.consent ? (
            <p className="field-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.consent}
            </p>
          ) : null}
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </button>
          <Link className="btn btn-ghost" href="/dashboard">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
