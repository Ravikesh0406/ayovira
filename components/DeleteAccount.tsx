"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";

export function DeleteAccount() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleDelete() {
    if (confirmation !== "DELETE" || pending) return;
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/customer", { method: "DELETE" });
      const result = (await response.json()) as { ok: boolean };
      if (!response.ok || !result.ok) {
        setError("Something went wrong. Please try again, or email us.");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again, or email us.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-danger-outline btn-sm"
        onClick={() => setOpen(true)}
      >
        <Trash2 size={16} aria-hidden="true" />
        Delete my account
      </button>

      {open ? (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <h2 id="delete-title">Delete your account?</h2>
            <p>
              This removes your name, contact details, interests and consent record
              from Ayovira. It cannot be undone. If you only want fewer messages,
              update your choices on your profile instead.
            </p>
            <div className="field" style={{ marginTop: 16 }}>
              <label htmlFor="delete-confirmation">
                Type DELETE to confirm
              </label>
              <input
                className="input"
                id="delete-confirmation"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                autoComplete="off"
                autoFocus
              />
            </div>
            {error ? (
              <p className="field-error" role="alert" style={{ marginTop: 10 }}>
                <AlertCircle size={14} aria-hidden="true" /> {error}
              </p>
            ) : null}
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Keep my account
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
                disabled={confirmation !== "DELETE" || pending}
              >
                {pending ? (
                  <>
                    <Loader2 size={16} className="spin" aria-hidden="true" />
                    Deleting...
                  </>
                ) : (
                  "Delete permanently"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
