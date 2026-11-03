"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

export function PasswordForm() {
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const nextErrors: Record<string, string> = {};
    if (!currentPassword) nextErrors.currentPassword = "Enter your current password.";
    if (newPassword.length < 8) {
      nextErrors.newPassword = "Use at least 8 characters for your new password.";
    }
    if (newPassword !== confirmPassword) {
      nextErrors.confirmPassword = "The two new passwords don't match.";
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
      const response = await fetch("/api/customer/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
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
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
      {saved ? (
        <div className="form-banner success" role="status">
          Your password is updated.
        </div>
      ) : null}
      {errors.form ? (
        <div className="form-banner" role="alert">
          {errors.form}
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="currentPassword">Current password</label>
        <input
          className="input"
          id="currentPassword"
          type={show ? "text" : "password"}
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          autoComplete="current-password"
          aria-invalid={Boolean(errors.currentPassword)}
          required
        />
        {errors.currentPassword ? (
          <p className="field-error">
            <AlertCircle size={14} aria-hidden="true" /> {errors.currentPassword}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="newPassword">New password</label>
        <div className="password-wrap">
          <input
            className="input"
            id="newPassword"
            type={show ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.newPassword)}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShow((value) => !value)}
            aria-label={show ? "Hide passwords" : "Show passwords"}
            aria-pressed={show}
          >
            {show ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.newPassword ? (
          <p className="field-error">
            <AlertCircle size={14} aria-hidden="true" /> {errors.newPassword}
          </p>
        ) : (
          <p className="field-hint">At least 8 characters.</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          className="input"
          id="confirmPassword"
          type={show ? "text" : "password"}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          required
        />
        {errors.confirmPassword ? (
          <p className="field-error">
            <AlertCircle size={14} aria-hidden="true" /> {errors.confirmPassword}
          </p>
        ) : null}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? (
            <>
              <Loader2 size={18} className="spin" aria-hidden="true" />
              Updating...
            </>
          ) : (
            "Update password"
          )}
        </button>
      </div>
    </form>
  );
}
