"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { INTERESTS, ROLES } from "@/lib/types";

type SignupFormProps = {
  variant?: "landing" | "page";
};

type FormErrors = Record<string, string>;

const FIELD_ORDER = [
  "fullName",
  "mobile",
  "email",
  "password",
  "area",
  "role",
  "interests",
  "consent",
];

export function SignupForm({ variant = "landing" }: SignupFormProps) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [interests, setInterests] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const tracking = useRef({
    sourcePage: variant === "landing" ? "/#join" : "/signup",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    tracking.current.utmSource = params.get("utm_source") ?? "";
    tracking.current.utmMedium = params.get("utm_medium") ?? "";
    tracking.current.utmCampaign = params.get("utm_campaign") ?? "";
  }, []);

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  function focusFirstError(nextErrors: FormErrors) {
    const key = FIELD_ORDER.find((field) => nextErrors[field]);
    if (!key) return;
    const id = key === "consent" ? "consentUpdates" : key;
    document.getElementById(id)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("fullName") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").replace(/\D/g, "");
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const area = String(data.get("area") ?? "").trim();
    const consentUpdates = data.get("consentUpdates") === "on";
    const consentContact = data.get("consentContact") === "on";

    const clientErrors: FormErrors = {};
    if (fullName.length < 2) clientErrors.fullName = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      clientErrors.mobile = "Please enter a valid 10-digit Indian mobile number.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      clientErrors.email = "Please enter a valid email address, or leave it blank.";
    }
    if (password.length < 8) {
      clientErrors.password = "Use at least 8 characters for your password.";
    }
    if (area.length < 2) clientErrors.area = "Please tell us your area or city.";
    if (!consentUpdates && !consentContact) {
      clientErrors.consent =
        "Please tick at least one option so we know how you'd like to hear from us.";
    }

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      focusFirstError(clientErrors);
      return;
    }

    setPending(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          mobile,
          email,
          password,
          area,
          role: String(data.get("role") ?? ""),
          interests,
          consentUpdates,
          consentContact,
          website: String(data.get("website") ?? ""),
          ...tracking.current,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        errors?: FormErrors;
      };

      if (!response.ok || !result.ok) {
        const nextErrors = result.errors ?? {
          form: "Something went wrong. Please try again.",
        };
        setErrors(nextErrors);
        if (!nextErrors.form) focusFirstError(nextErrors);
        return;
      }

      setSuccess(true);
      form.reset();
      requestAnimationFrame(() => {
        document.getElementById("join-success")?.focus();
      });
    } catch {
      setErrors({
        form:
          "Something went wrong. Please try again, or email us at theayovira@gmail.com.",
      });
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className="form-card success-card" id="join-success" tabIndex={-1}>
        <span className="success-icon">
          <Check size={30} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <h3>You&apos;re in. Thank you for joining Ayovira.</h3>
        <p>
          We&apos;ll reach out as you&apos;ve chosen. Keep an eye out for our first
          free camp in Faridabad.
        </p>
        <Link className="btn btn-primary" href="/dashboard">
          Open your dashboard
        </Link>
        <p className="form-alt" style={{ marginTop: 16 }}>
          <Link className="link" href="/">
            Back to home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="form-card"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Create your Ayovira account"
    >
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
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            required
          />
          {errors.fullName ? (
            <p className="field-error" id="fullName-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="mobile">Mobile number</label>
          <div className="mobile-input">
            <span className="mobile-prefix">+91</span>
            <input
              className="input"
              id="mobile"
              name="mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10-digit number"
              maxLength={14}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "mobile-error" : undefined}
              required
            />
          </div>
          {errors.mobile ? (
            <p className="field-error" id="mobile-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.mobile}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="muted">(optional)</span>
          </label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p className="field-error" id="email-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.email}
            </p>
          ) : null}
        </div>

        <div className="field field-full">
          <label htmlFor="password">Create a password</label>
          <div className="password-wrap">
            <input
              className="input"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "password-error password-hint" : "password-hint"
              }
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="field-hint" id="password-hint">
            This keeps your details safe and lets you update them anytime.
          </p>
          {errors.password ? (
            <p className="field-error" id="password-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.password}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="area">Area in Faridabad (or city)</label>
          <input
            className="input"
            id="area"
            name="area"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Sector 21, Faridabad"
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "area-error" : undefined}
            required
          />
          {errors.area ? (
            <p className="field-error" id="area-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.area}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="role">
            I am a <span className="muted">(optional)</span>
          </label>
          <div className="select-wrap">
            <select className="select" id="role" name="role" defaultValue="">
              <option value="">Select one</option>
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
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
                <label
                  className="chip"
                  key={interest.value}
                  data-checked={checked}
                >
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest.value}
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
              name="consentUpdates"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              Send me wellness tips and updates from Ayovira on WhatsApp or email.
            </span>
          </label>
          <label className="consent-row" htmlFor="consentContact">
            <input type="checkbox" id="consentContact" name="consentContact" />
            <span>Contact me about Ayovira camps and services.</span>
          </label>
          {errors.consent ? (
            <p className="field-error" id="consent-error">
              <AlertCircle size={14} aria-hidden="true" /> {errors.consent}
            </p>
          ) : null}
        </div>

        <p className="privacy-note">
          We use your details only for what you&apos;ve chosen. We never share your
          health details publicly. You can leave any time by messaging us. Read our{" "}
          <Link className="text-link" href="/privacy">
            privacy notice
          </Link>
          .
        </p>

        <div className="visually-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary btn-full" type="submit" disabled={pending}>
            {pending ? (
              <>
                <Loader2 size={18} className="spin" aria-hidden="true" />
                Joining...
              </>
            ) : (
              "Join the community"
            )}
          </button>
          <p className="form-alt">
            Already have an account?{" "}
            <Link className="link" href="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
