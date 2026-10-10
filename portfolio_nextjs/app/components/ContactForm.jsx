"use client";

import { useState } from "react";
import { MessageService } from "../service/messageService";

const initialForm = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

function validateForm(values) {
  const errors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (!values.name.trim()) errors.name = "Ad alanı zorunludur.";
  if (!values.lastName.trim()) errors.lastName = "Soyad alanı zorunludur.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "10–15 haneli geçerli bir telefon numarası girin.";
  }

  return errors;
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextForm = { ...formData, [name]: value };
    setFormData(nextForm);
    setFormStatus("");

    if (errors[name]) {
      const nextErrors = validateForm(nextForm);
      setErrors((previous) => ({ ...previous, [name]: nextErrors[name] }));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const nextErrors = validateForm(formData);
    setErrors((previous) => ({ ...previous, [name]: nextErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    if (isSubmitting) return;
    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await MessageService.postMessage(formData);
      if (response?.status >= 200 && response.status < 300) {
        setFormStatus("Mesajınız gönderildi. Teşekkür ederiz.");
        setFormData(initialForm);
        setErrors({});
      } else {
        setFormStatus("Mesajınız gönderilemedi. Lütfen yeniden deneyin.");
      }
    } catch {
      setFormStatus("Mesajınız gönderilemedi. Lütfen yeniden deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: "name", label: "Ad", type: "text", autoComplete: "given-name" },
    { name: "lastName", label: "Soyad", type: "text", autoComplete: "family-name" },
    { name: "email", label: "E-posta", type: "email", autoComplete: "email" },
    { name: "phone", label: "Telefon", type: "tel", autoComplete: "tel" },
  ];

  return (
        <section className="surface-card p-6 sm:p-10">
          <h2 className="mb-6 text-2xl font-bold text-ink">Mesaj gönderin</h2>
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            {fields.map(({ name, label, type, autoComplete }) => (
              <div className="grid gap-2" key={name}>
                <label className="font-semibold text-ink" htmlFor={name}>{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  autoComplete={autoComplete}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors[name])}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                  className="form-field"
                />
                {errors[name] && (
                  <p className="form-error" id={`${name}-error`}>
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <div className="grid gap-2 sm:col-span-2">
              <label className="font-semibold text-ink" htmlFor="message">Mesaj <span className="text-quiet">(isteğe bağlı)</span></label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="form-field resize-y"
              />
            </div>

            <div className="sm:col-span-2">
              <button type="submit" className="button-primary w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Gönderiliyor…" : "Mesajı gönder"}
              </button>
              {formStatus && (
                <p className="mt-4 text-sm font-medium text-ink" role="status" aria-live="polite">
                  {formStatus}
                </p>
              )}
            </div>
          </form>
        </section>
  );
}
