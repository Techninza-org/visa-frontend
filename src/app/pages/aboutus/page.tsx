"use client";
import Headers from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Headers />
      <section className="max-w-7xl mx-auto px-6 py-20 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering your international journeys with reliable visa and
            passport services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/business-people-team-free-photo.jpg"
              alt="Visa and Passport Services"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-amber-600 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At AXE Visa Technology, we specialize in streamlining the visa and
              passport application process for Indian citizens. Whether it is
              tourism, business, study, or work – we’ve got you covered with
              expert guidance, personalized support, and end-to-end
              documentation assistance.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We’re committed to transparency, trust, and timely delivery. Our
              team of experienced professionals ensures every application is
              handled with utmost precision and compliance.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Guidance",
                desc: "We ensure your application meets all embassy criteria.",
              },
              {
                title: "Fast Processing",
                desc: "Quick turnaround with real-time status tracking.",
              },
              {
                title: "Affordable Pricing",
                desc: "Transparent rates. No hidden fees.",
              },
              {
                title: "Pan India Service",
                desc: "Serving clients from all major cities in India.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 border border-amber-300 p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-amber-600">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
