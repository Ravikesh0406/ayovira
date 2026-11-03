"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextErrors: Record<string, string> = {};
    if (!identifier.trim()) {
      nextErrors.identifier = "Enter your mobile number or email.";
    }
    if (!password) {
      nextErrors.password = "Enter your password.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      document.getElementById(nextErrors.identifier ? "identifier" : "password")?.focus();
      return;
    }

    setPending(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: "Something went wrong. Please try again." });
        return;
      }

      router.push(nextPath);
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
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {errors.form ? (
        <div className="form-banner" role="alert">
          {errors.form}
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="identifier">Mobile number or email</label>
        <input
          className="input"
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="e.g. 98765 43210"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          aria-invalid={Boolean(errors.identifier)}
          aria-describedby={errors.identifier ? "identifier-error" : undefined}
          required
        />
        {errors.identifier ? (
          <p className="field-error" id="identifier-error">
            <AlertCircle size={14} aria-hidden="true" /> {errors.identifier}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <div className="password-wrap">
          <input
            className="input"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
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
        {errors.password ? (
          <p className="field-error" id="password-error">
            <AlertCircle size={14} aria-hidden="true" /> {errors.password}
          </p>
        ) : null}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary btn-full" type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 size={18} className="spin" aria-hidden="true" />
              Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </div>

      <p className="form-alt">
        New to Ayovira?{" "}
        <Link className="link" href="/signup">
          Join the community
        </Link>
      </p>
      <p className="form-alt">
        Forgot your password?{" "}
        <a className="link" href="mailto:theayovira@gmail.com?subject=Password%20help">
          Email us
        </a>{" "}
        and we&apos;ll help you back in.
      </p>
    </form>
  );
}
