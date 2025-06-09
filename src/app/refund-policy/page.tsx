import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 mt-10">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Refund Policy
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

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. General Refund Terms
                </h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>
                    Refunds apply only to service fees charged by Axe Visa
                    Technology.
                  </li>
                  <li>
                    Visa fees, embassy charges, and third-party bookings
                    (flights, hotels, insurance) are non-refundable once
                    processed.
                  </li>
                  <li>
                    Approved refunds are processed to the original payment
                    method within 7–14 business days.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Basic Service (INR 4999)
                </h2>
                <p>Non-refundable once checklist, documentation guidance, or reservations are initiated.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Standard Service (INR 7999)
                </h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>50% refund if cancellation is requested before document drafting or appointment booking.</li>
                  <li>No refund once appointment is booked or documentation work has begun.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Premium Concierge Service (INR 9999)
                </h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>
                    Eligible for 50% refund only if the visa is officially refused and all required documents were submitted accurately as advised.
                  </li>
                  <li>
                    Visa refusal letter must be submitted within 5 business days of issuance.
                  </li>
                  <li>
                    Refund applies only to Axe Visa Technology’s service fees.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Non-Refundable Scenarios
                </h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Failure to provide complete, timely, or truthful documentation.</li>
                  <li>Missed deadlines or embassy appointments due to client delay.</li>
                  <li>Visa rejection due to ineligibility, false declarations, or undisclosed history.</li>
                  <li>Service cancellation after the process has begun.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Withdrawal of Case by Client
                </h2>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Before any processing begins: 80% refund of Axe Visa service fee.</li>
                  <li>After document collection/checklist issuance: 50% refund.</li>
                  <li>After appointment booking or document drafting: No refund.</li>
                </ul>
                <p className="text-sm text-gray-600">
                  All withdrawals must be submitted in writing to <strong>info@axevia.com</strong>, clearly stating the reason.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. How to Request a Refund
                </h2>
                <p>Email <strong>info@axevia.com</strong> with the following details:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Full Name</li>
                  <li>Payment Reference</li>
                  <li>Visa Category and Service Tier</li>
                  <li>Reason for Refund</li>
                  <li>Visa Refusal Letter (if applicable)</li>
                  <li>Case ID Number (mention in the subject)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Discretion Clause
                </h2>
                <p>
                  Axe Visa Technology reserves the right to approve or decline
                  any refund based on the merit of the case, service progress,
                  and internal assessment.
                </p>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8 rounded-lg">
                <p className="font-medium text-blue-800">Customer Commitment:</p>
                <p className="text-blue-700">
                  We are committed to delivering expert visa services with integrity and professionalism. This policy outlines the terms under which refunds may be considered, and under what conditions services are deemed non-refundable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
