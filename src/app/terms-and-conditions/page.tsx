import Footer from "@/components/footer";
import Header from "@/components/header";

export default function TermsAndConditions() {
  return (
    <>
      <Header />
    <div className="min-h-screen bg-gray-50 py-12 mt-10">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg mb-6">
              <strong>Last Updated:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using the services of Axe Visa Technology ("Company," "we," "our," or "us"), you ("Client," "you," or "your") agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Services Description</h2>
              <p className="mb-4">Axe Visa Technology provides the following services:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Visa consultation and advisory services</li>
                <li>Visa application assistance and preparation</li>
                <li>Document verification and review</li>
                <li>Interview preparation and guidance</li>
                <li>Application submission and tracking</li>
                <li>Immigration-related consultation services</li>
              </ul>
              <p className="mb-4">
                <strong>Important:</strong> We are a visa consultation service and not a government agency. We do not guarantee visa approval as the final decision rests with the respective embassy or consulate.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Client Responsibilities</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Information Accuracy</h3>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Provide accurate, complete, and truthful information</li>
                <li>Submit all required documents in a timely manner</li>
                <li>Inform us immediately of any changes in circumstances</li>
                <li>Respond promptly to our communications and requests</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Document Submission</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>All documents must be genuine and legally obtained</li>
                <li>Documents should be clear, legible, and properly formatted</li>
                <li>Translated documents must be certified where required</li>
                <li>Clients are responsible for document authenticity</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Service Fees</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Service fees are quoted in Indian Rupees (INR) unless otherwise specified</li>
                <li>Payment is required before commencement of services</li>
                <li>Fees are subject to change with prior notice</li>
                <li>Additional charges may apply for expedited services</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Government Fees</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Government visa fees are separate from our service charges</li>
                <li>Embassy fees are paid directly to respective authorities</li>
                <li>Government fees are non-refundable regardless of visa outcome</li>
                <li>Fee changes by authorities are beyond our control</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Service Limitations</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 No Guarantee of Approval</h3>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="font-medium text-red-800">Important Disclaimer:</p>
                <p className="text-red-700">
                  We do not guarantee visa approval. The final decision rests solely with the embassy, consulate, or immigration authorities. Our role is limited to providing consultation and application assistance.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Service Scope</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>We provide guidance based on current immigration laws and policies</li>
                <li>Laws and requirements may change without notice</li>
                <li>We are not responsible for policy changes affecting your application</li>
                <li>Emergency or last-minute applications may have limited success rates</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Liability and Disclaimers</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Limitation of Liability</h3>
              <p className="mb-4">Our liability is limited to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>The amount of service fees paid by the client</li>
                <li>Direct damages resulting from our proven negligence</li>
                <li>Errors in our service delivery that can be reasonably attributed to us</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Exclusions</h3>
              <p className="mb-4">We are not liable for:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Visa rejections or delays by authorities</li>
                <li>Changes in immigration laws or policies</li>
                <li>Indirect, consequential, or punitive damages</li>
                <li>Travel expenses, accommodation costs, or other related expenses</li>
                <li>Lost opportunities or business losses</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Confidentiality and Data Protection</h2>
              <p className="mb-4">We commit to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Maintaining strict confidentiality of your personal information</li>
                <li>Using information solely for visa processing purposes</li>
                <li>Implementing appropriate security measures</li>
                <li>Complying with applicable data protection laws</li>
                <li>Not sharing information with unauthorized third parties</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="mb-4">
                All content, materials, and resources provided by Axe Visa Technology, including but not limited to guides, templates, and consultation materials, are our intellectual property and may not be reproduced, distributed, or used commercially without written permission.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination of Services</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 By Client</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>You may terminate services with written notice</li>
                <li>Refunds are subject to our Refund Policy</li>
                <li>Work completed up to termination date will be charged</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 By Company</h3>
              <p className="mb-4">We may terminate services in cases of:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Provision of false or misleading information</li>
                <li>Non-payment of fees</li>
                <li>Uncooperative or abusive behavior</li>
                <li>Breach of these terms and conditions</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Force Majeure</h2>
              <p className="mb-4">
                We shall not be liable for any delay or failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, war, terrorism, pandemics, or technical failures.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Dispute Resolution</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">11.1 Governing Law</h3>
              <p className="mb-4">
                These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi, India.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">11.2 Resolution Process</h3>
              <ol className="list-decimal list-inside mb-4 space-y-2">
                <li>Initial attempt to resolve through direct communication</li>
                <li>Mediation through mutually agreed mediator</li>
                <li>Arbitration if mediation fails</li>
                <li>Legal proceedings as a last resort</li>
              </ol>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Communication</h2>
              <p className="mb-4">
                All official communications will be conducted through email, phone, or our official website. It is your responsibility to ensure that the contact details you provide are correct and up-to-date. We are not responsible for any missed communications due to incorrect or outdated contact information.
              </p>
              <p className="mb-4">
                For any inquiries, concerns, or notices regarding these Terms and Conditions or our services, you may contact us at:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Email: support@axevisatechnology.com</li>
                <li>Phone: +91-XXXXXXXXXX</li>
                <li>Website: www.axevisatechnology.com</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to update or modify these Terms and Conditions at any time without prior notice. The revised terms will be posted on our website, and your continued use of our services constitutes acceptance of the updated terms. We encourage you to review this page periodically.
              </p>
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
