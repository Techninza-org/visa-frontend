import Footer from "@/components/footer";
import Header from "@/components/header";

export default function TermsAndConditions() {
  return (
    <>
      <Header />
      <div className="min-h-screen  py-12 mt-10">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
              Terms & Conditions
            </h1>

            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-lg font-medium mb-2">Company Name: <strong>Axe Visa Technology</strong></p>
              <p className="mb-6">
                Registered Address: K-2/12 13 Peepal Chowk, Mohan Garden Uttam Nagar, Near Reliance Fresh, New Delhi, Delhi – 110059
              </p>

              <p className="text-lg mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  By using the services of Axe Visa Technology (“Company”, “we”, “our”, or “us”), you (“Client”, “User”, or “Applicant”) agree to be bound by the following Terms & Conditions. These govern the use of our website, services, tools, and communications related to visa application support.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Scope of Services</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tourist, Business, Student, and other Visa categories</li>
                  <li>Visa document checklists and formatting</li>
                  <li>Embassy appointment scheduling</li>
                  <li>Hotel, flight, and insurance bookings for visa purposes</li>
                  <li>Covering letters, sponsorship letters, and case support</li>
                </ul>
                <p className="mt-4 text-red-600 font-semibold">Note: We are not affiliated with any embassy, consulate, or government agency, and do not guarantee visa approval.</p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Obligations</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete personal and travel information</li>
                  <li>Submit all required documents in a timely manner</li>
                  <li>Make full payment before service execution (unless otherwise agreed)</li>
                  <li>Read and understand the visa requirements of the destination country</li>
                </ul>
                <p className="mt-4 text-red-700 font-medium">
                  Any misinformation, delay, or document falsification is the Client’s responsibility and may lead to denial without liability on our part.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Fees & Payment</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service fees must be paid in advance or as per the agreed milestone.</li>
                  <li>Visa fees, VFS/BLS fees, and third-party service charges are separate from our consultancy fee.</li>
                  <li>Accepted payment modes: UPI, bank transfer, credit/debit card, or approved gateway.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Policy</h2>
                <p>Refunds, if applicable, are subject to our Refund Policy which defines eligibility based on service stage, visa outcome, and processing status.</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>No refund for work already performed or for government-related charges.</li>
                  <li>50% refund applicable only for eligible Premium plans under specific conditions (e.g., documented visa refusal).</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation & Withdrawal</h2>
                <p>Clients may withdraw their application, but fees will be refunded (if eligible) only based on the stage of service execution, as detailed in our Refund Policy.</p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Privacy & Confidentiality</h2>
                <p>We are committed to maintaining confidentiality of all documents and personal information. Data is used solely for visa processing and is not shared without consent, except where required by law or consular procedure. Refer to our Privacy Policy for more information.</p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Visa rejection by embassy or consulate</li>
                  <li>Delays caused by the client, government bodies, or third parties</li>
                  <li>Consequential losses, missed travel opportunities, or rescheduling fees</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Service</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Modify our services or pricing at any time</li>
                  <li>Decline any case based on risk or non-cooperation</li>
                  <li>Change or update these Terms and Conditions without prior notice</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Jurisdiction</h2>
                <p>These Terms shall be governed by the laws of India, and any disputes shall be settled under the jurisdiction of courts located in New Delhi.</p>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email: info@axevia.com</li>
                  <li>Phone: +91-9999390696</li>
                  <li>Website: www.axevia.com</li>
                </ul>
              </section>

              <p className="text-center text-sm text-gray-500 mt-10">
                &copy; {new Date().getFullYear()} Axe Visa Technology. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}