import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Disclaimer() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 mt-10">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Disclaimer </h1>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Nature of Service</h2>
              <p className="text-gray-600">
                Axe Visa Technology is a private, independent visa consultancy that offers administrative and documentation
                support services to individuals and businesses seeking visas for international travel. We are not affiliated with
                any embassy, consulate, or government authority, nor do we have the power to influence visa approvals. Final
                decisions regarding visa issuance are solely at the discretion of the respective embassies, consulates, or
                immigration authorities.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">2. No Guarantee of Visa Approval</h2>
              <p className="text-gray-600">
                While we aim to enhance your chances of approval through accurate documentation, expert consultation, and
                submission support, Axe Visa Technology does not guarantee the issuance of any visa. Approval is subject to the
                policies and discretion of the government of the destination country.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Client Responsibility</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Providing truthful, accurate, and complete information</li>
                <li>Submitting documents in a timely manner</li>
                <li>Complying with all visa requirements and embassy guidelines</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Axe Visa Technology shall not be held liable for delays, rejections, or penalties resulting from false,
                incomplete, or delayed submissions from the client.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Third-Party Services</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Hotel & flight reservations</li>
                <li>Travel insurance</li>
                <li>Courier or notary services</li>
              </ul>
              <p className="text-gray-600 mt-2">
                These are offered as add-ons for visa purpose only. Axe Visa Technology shall not be held liable for errors or
                delays caused by third-party service providers.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Website Content</h2>
              <p className="text-gray-600">
                All content on our website (text, checklists, templates, guides) is for informational purposes only and is not
                intended to be a substitute for legal advice or official immigration policy. Axe Visa Technology makes every
                effort to ensure accuracy, but does not warrant that the information is always current or free of error.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Limitation of Liability</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Loss of travel opportunity</li>
                <li>Financial losses due to visa refusal or delays</li>
                <li>Embassy rejections beyond our control</li>
                <li>Damages resulting from incorrect or misleading information provided by the client</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">7. Jurisdiction</h2>
              <p className="text-gray-600">
                This disclaimer is governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction
                of the courts of New Delhi.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
