"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  reasonOfContact: string;
  message: string;
}

export default function FranchiseForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    reasonOfContact: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setFormData({
        fullName: "",
        phoneNumber: "",
        emailAddress: "",
        reasonOfContact: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className="text-sm font-bold text-gray-900">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm text-gray-500 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phoneNumber"
            className="text-sm font-bold text-gray-900"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm text-gray-500 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Email address */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="emailAddress"
            className="text-sm font-bold text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Your email address"
            value={formData.emailAddress}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm text-gray-500 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* Reason of contact */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reasonOfContact"
            className="text-sm font-bold text-gray-900"
          >
            Reason of contact
          </label>
          <input
            type="text"
            id="reasonOfContact"
            name="reasonOfContact"
            placeholder="Reason of your contact"
            value={formData.reasonOfContact}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm text-gray-500 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5 mt-6">
        <label htmlFor="message" className="text-sm font-bold text-gray-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm text-gray-500 placeholder:text-gray-400 outline-none focus:border-gray-400 transition-colors resize-y"
        />
      </div>

      {/* Status messages */}
      {status === "success" && (
        <p className="mt-4 text-sm text-green-600 font-medium">
          Your message has been sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600 font-medium">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 px-16 py-3 bg-[#B71C1C] hover:bg-[#9B1717] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
      >
        {status === "loading" ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
