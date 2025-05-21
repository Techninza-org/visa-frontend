"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import Headers from "@/components/header";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We’ll get back to you soon.");
    // Optionally handle sending to API / backend
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="bg-white text-black min-h-screen">
      <Headers />
      <section className="max-w-7xl mx-auto px-6 py-20 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Need help with your visa or passport? Reach out to us—we respond
            within 24 hours!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-amber-500 h-6 w-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Office Address</h4>
                <p className="text-gray-600">
                  B-122, Sector 63, Noida, Uttar Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-amber-500 h-6 w-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Phone Number</h4>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-amber-500 h-6 w-6 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Email</h4>
                <p className="text-gray-600">support@axevista.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-50 p-8 rounded-xl border border-amber-200"
          >
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
