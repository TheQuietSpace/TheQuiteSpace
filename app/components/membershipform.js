"use client"

import { useState } from "react"

export default function MembershipForm() {
  const [hasMedicalConditions, setHasMedicalConditions] = useState("")
  const [onMedication, setOnMedication] = useState("")
  const [gender, setGender] = useState("")
  const [classTime, setClassTime] = useState("")

  return (
    <div className="mx-auto max-w-4xl border rounded md:mt-16 mt-8 border-gray-200 p-6">
      <form className="space-y-8">
        {/* Personal Details */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Personal details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dob" className="block text-sm font-medium">
                Date of birth
              </label>
              <div className="relative">
                <input
                  id="dob"
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
                />
                <svg
                  className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                E mail address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              />
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Emergency contact</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="emergencyContact" className="block text-sm font-medium">
                Contact number
              </label>
              <input
                id="emergencyContact"
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="relationship" className="block text-sm font-medium">
                Relationship
              </label>
              <input
                id="relationship"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              />
            </div>
          </div>
        </section>

        {/* Health Information */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Health information</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Any existing medical conditions?</label>
              <div className="mb-3 flex gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="medical-conditions"
                    value="yes"
                    checked={hasMedicalConditions === "yes"}
                    onChange={(e) => setHasMedicalConditions(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="medical-conditions"
                    value="no"
                    checked={hasMedicalConditions === "no"}
                    onChange={(e) => setHasMedicalConditions(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
              {hasMedicalConditions === "yes" && (
                <textarea
                  placeholder="If yes, please specify"
                  rows={3}
                  className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
                />
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">Are you currently on medication?</label>
              <div className="mb-3 flex gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="medication"
                    value="yes"
                    checked={onMedication === "yes"}
                    onChange={(e) => setOnMedication(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="medication"
                    value="no"
                    checked={onMedication === "no"}
                    onChange={(e) => setOnMedication(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
              {onMedication === "yes" && (
                <textarea
                  placeholder="Any injuries/limitations we should know?"
                  rows={3}
                  className="mt-3 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
                />
              )}
            </div>
          </div>
        </section>

        {/* Membership Plan */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Membership Plan</h2>
          <div className="space-y-6">
            <div>
              <label className="mb-3 block text-sm font-medium">Select membership type?</label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="monthly"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Monthly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="quarterly"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Quarterly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="half-yearly"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Half-Yearly</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="yearly"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Yearly</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="classTime" className="block text-sm font-medium">
                Preferred Class Timing
              </label>
              <select
                id="classTime"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
                className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 focus:border-[#c1a050] focus:outline-none focus:ring-1 focus:ring-[#c1a050]"
              >
                <option value=""></option>
                <option value="morning">Morning (6:00 AM - 9:00 AM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium">Mode of Participation</label>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="in-studio"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">In-Studio</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="online"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Online</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hybrid"
                    className="h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
                  />
                  <span className="text-sm">Hybrid</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Integration */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Payment Integration</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-16 w-32 items-center justify-center rounded border border-gray-300 bg-white p-3">
                <span className="text-sm font-semibold text-blue-600">Razorpay</span>
              </div>
              <div className="flex h-16 w-32 items-center justify-center rounded border border-gray-300 bg-white p-3">
                <span className="text-2xl font-bold text-[#635BFF]">stripe</span>
              </div>
              <div className="flex h-16 w-32 items-center justify-center rounded border border-gray-300 bg-white p-3">
                <span className="text-sm font-semibold text-[#003087]">PayPal</span>
              </div>
              <div className="flex h-16 w-32 items-center justify-center rounded border border-gray-300 bg-white p-3">
                <span className="text-xs font-semibold text-blue-600">BANK TRANSFER</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Total Amount :</label>
            </div>

            <button
              type="button"
              className="rounded-md bg-[#c1a050] px-16 py-2 text-white transition-colors hover:bg-[#a88d42] md:w-auto"
            >
              Proceed to payment
            </button>
          </div>
        </section>

        {/* Consent and Agreement */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Consent and agreement</h2>
          <div className="space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent1"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
              />
              <span className="text-sm leading-relaxed">
                I confirm that I am participating voluntarily and take responsibility for my health and safety.
              </span>
            </label>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent2"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
              />
              <span className="text-sm leading-relaxed">
                I agree to follow yoga class etiquette and respect teachers and fellow members.
              </span>
            </label>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent3"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
              />
              <span className="text-sm leading-relaxed">
                I consent to receive updates and class notifications via email/WhatsApp.
              </span>
            </label>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent4"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#c1a050] focus:ring-[#c1a050]"
              />
              <span className="text-sm leading-relaxed">I allow use of photos/videos for promotional purposes</span>
            </label>
          </div>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-[#c1a050] py-2 text-lg text-white transition-colors hover:bg-[#a88d42]"
        >
          Complete membership
        </button>
      </form>
    </div>
  )
}
