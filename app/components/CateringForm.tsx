"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

interface CateringFormData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  company: string;
  desiredSpaceVenue: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  numberOfPeople: string;
  budgetRange: string;
  dietaryRestrictions: string[];
  cateringStyle: string;
  barService: string;
  additionalNotes: string;
}

const EVENT_TYPES = [
  "Corporate Meeting",
  "Wedding Reception",
  "Birthday Party",
  "Anniversary",
  "Holiday Party",
  "Fundraiser / Gala",
  "Conference / Seminar",
  "Team Building Event",
  "Product Launch",
  "Private Dinner",
  "Other",
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

const CATERING_STYLES = [
  "Buffet",
  "Plated / Sit-down",
  "Family Style",
  "Cocktail / Passed Hors d'oeuvres",
  "Food Stations",
  "Box Lunches",
  "Other",
];

const BAR_OPTIONS = [
  "No bar service",
  "Non-alcoholic beverages only",
  "Beer & Wine",
  "Full open bar",
  "Cash bar",
  "Not sure yet",
];

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Nut-Free",
  "Dairy-Free",
  "None",
];

export default function CateringForm() {
  const [formData, setFormData] = useState<CateringFormData>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    company: "",
    desiredSpaceVenue: "",
    eventType: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    numberOfPeople: "",
    budgetRange: "",
    dietaryRestrictions: [],
    cateringStyle: "",
    barService: "",
    additionalNotes: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      if (value === "None") {
        return { ...prev, dietaryRestrictions: checked ? ["None"] : [] };
      }

      let updated = checked
        ? [...prev.dietaryRestrictions.filter((d) => d !== "None"), value]
        : prev.dietaryRestrictions.filter((d) => d !== value);

      return { ...prev, dietaryRestrictions: updated };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/catering", {
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
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        company: "",
        desiredSpaceVenue: "",
        eventType: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        numberOfPeople: "",
        budgetRange: "",
        dietaryRestrictions: [],
        cateringStyle: "",
        barService: "",
        additionalNotes: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  // Today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split("T")[0];

  const inputClass =
    "w-full px-4 py-3 rounded-full border border-gray-300 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-500 transition-colors";
  const labelClass = "text-sm font-bold text-gray-900";
  const selectClass =
    "w-full px-4 py-3 rounded-full border border-gray-300 text-sm text-gray-700 outline-none focus:border-gray-500 transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 md:p-10"
    >
      {/* Email — full width */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      {/* First Name / Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className={labelClass}>
            First Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Phone / Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phoneNumber" className={labelClass}>
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Desired Space/Venue — full width */}
      <div className="flex flex-col gap-1.5 mt-6">
        <label htmlFor="desiredSpaceVenue" className={labelClass}>
          Desired Space/Venue <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="desiredSpaceVenue"
          name="desiredSpaceVenue"
          placeholder="Desired Space/Venue"
          value={formData.desiredSpaceVenue}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      {/* Event Type (select) — full width */}
      <div className="flex flex-col gap-1.5 mt-6">
        <label htmlFor="eventType" className={labelClass}>
          Event Type <span className="text-red-600">*</span>
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className={selectClass}
        >
          <option value="" disabled>
            Select event type
          </option>
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Event Date — full width */}
      <div className="flex flex-col gap-1.5 mt-6">
        <label htmlFor="eventDate" className={labelClass}>
          Event Date <span className="text-red-600">*</span>
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          min={today}
          value={formData.eventDate}
          onChange={handleChange}
          required
          className={inputClass}
        />
      </div>

      {/* Start Time / End Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="startTime" className={labelClass}>
            Start Time <span className="text-red-600">*</span>
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="endTime" className={labelClass}>
            End Time <span className="text-red-600">*</span>
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Number of People / Budget Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="numberOfPeople" className={labelClass}>
            Number of People <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            placeholder="Number of People"
            min="1"
            value={formData.numberOfPeople}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="budgetRange" className={labelClass}>
            Budget Range <span className="text-red-600">*</span>
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            required
            className={selectClass}
          >
            <option value="" disabled>
              Select budget range
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Catering Style / Bar Service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cateringStyle" className={labelClass}>
            Catering Style <span className="text-red-600">*</span>
          </label>
          <select
            id="cateringStyle"
            name="cateringStyle"
            value={formData.cateringStyle}
            onChange={handleChange}
            required
            className={selectClass}
          >
            <option value="" disabled>
              Select catering style
            </option>
            {CATERING_STYLES.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="barService" className={labelClass}>
            Bar Service <span className="text-red-600">*</span>
          </label>
          <select
            id="barService"
            name="barService"
            value={formData.barService}
            onChange={handleChange}
            required
            className={selectClass}
          >
            <option value="" disabled>
              Select bar service
            </option>
            {BAR_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dietary Restrictions — checkboxes */}
      <div className="flex flex-col gap-2.5 mt-6">
        <span className={labelClass}>Dietary Restrictions</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {DIETARY_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                value={option}
                checked={formData.dietaryRestrictions.includes(option)}
                onChange={handleCheckbox}
                className="w-4 h-4 rounded border-gray-300 text-[#B71C1C] focus:ring-[#B71C1C] accent-[#B71C1C]"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="flex flex-col gap-1.5 mt-6">
        <label htmlFor="additionalNotes" className={labelClass}>
          Additional Notes
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          placeholder="Tell us about your menu preferences, theme, special requests, or anything else we should know..."
          rows={5}
          value={formData.additionalNotes}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl border border-gray-300 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-gray-500 transition-colors resize-y"
        />
      </div>

      {/* Status messages */}
      {status === "success" && (
        <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="text-sm text-green-700 font-medium">
            Your catering booking request has been submitted successfully!
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 px-16 py-3 bg-[#B71C1C] hover:bg-[#9B1717] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-full transition-colors cursor-pointer"
      >
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
