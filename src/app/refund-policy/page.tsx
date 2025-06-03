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
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview</h2>
              <p className="mb-4">
                At Axe Visa Technology, we strive to provide exceptional visa consultation services. This Refund Policy outlines the terms and conditions under which refunds may be requested and processed for our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Categories</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Consultation Services</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Initial visa consultation and assessment</li>
                <li>Document review and guidance</li>
                <li>Application preparation assistance</li>
                <li>Interview preparation and coaching</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Processing Services</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Visa application submission</li>
                <li>Document verification and processing</li>
                <li>Government fee payments</li>
                <li>Application tracking and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Refund Eligibility</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Full Refund (100%)</h3>
              <p className="mb-4">You are eligible for a full refund in the following circumstances:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Cancellation within 24 hours of payment (before any work has commenced)</li>
                <li>If we are unable to provide the promised service due to our inability</li>
                <li>Duplicate payments made in error</li>
                <li>Technical errors resulting in incorrect charges</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Partial Refund (50%)</h3>
              <p className="mb-4">You may be eligible for a partial refund in these situations:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Cancellation after initial consultation but before application submission</li>
                <li>Change in personal circumstances preventing travel (with valid documentation)</li>
                <li>Service cancellation due to incomplete documentation from client (after 30 days)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 No Refund</h3>
              <p className="mb-4">Refunds will not be provided in the following cases:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Visa rejection by embassy/consulate (not due to our error)</li>
                <li>Incomplete or false information provided by the client</li>
                <li>After visa application has been submitted to authorities</li>
                <li>Government fees and third-party charges</li>
                <li>Services already rendered or completed</li>
                <li>Cancellation due to client's change of mind after work has commenced</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Government Fees and Third-Party Charges</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-medium text-yellow-800">Important Note:</p>
                <p className="text-yellow-700">
                  Government visa fees, embassy charges, courier fees, and other third-party costs are non-refundable under any circumstances, as these are paid directly to respective authorities and service providers.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Process</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 How to Request a Refund</h3>
              <ol className="list-decimal list-inside mb-4 space-y-2">
                <li>Contact our customer service team via email or phone</li>
                <li>Provide your booking reference number and payment details</li>
                <li>Clearly state the reason for your refund request</li>
                <li>Submit any supporting documentation if required</li>
                <li>Allow our team to review your request (3-5 business days)</li>
              </ol>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Processing Timeline</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Review Period:</strong> 3-5 business days</li>
                <li><strong>Approval Notification:</strong> 1-2 business days</li>
                <li><strong>Refund Processing:</strong> 5-10 business days</li>
                <li><strong>Bank Processing:</strong> 3-7 business days (varies by bank)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Refund Methods</h2>
              <p className="mb-4">Refunds will be processed using the following methods:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li><strong>Credit/Debit Card:</strong> Refunded to the original payment method</li>
                <li><strong>Bank Transfer:</strong> Direct transfer to your bank account</li>
                <li><strong>Digital Wallets:</strong> Refunded to the original wallet used</li>
              </ul>
              <p className="mb-4 text-sm text-gray-600">
                Note: Refunds cannot be processed to a different account or payment method than originally used for security reasons.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Special Circumstances</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Medical Emergencies</h3>
              <p className="mb-4">
                In case of serious medical emergencies preventing travel, we may consider partial refunds on a case-by-case basis with proper medical documentation.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.2 Force Majeure</h3>
              <p className="mb-4">
                During extraordinary circumstances such as natural disasters, political unrest, or pandemic-related travel restrictions, refund policies may be adjusted as per government guidelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Dispute Resolution</h2>
              <p className="mb-4">
                If you disagree with our refund decision, you may escalate the matter by:
              </p>
              <ol className="list-decimal list-inside mb-4 space-y-2">
                <li>Requesting a review from our senior management team</li>
                <li>Providing additional documentation or evidence</li>
                <li>Seeking mediation through relevant consumer protection agencies</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Policy Updates</h2>
              <p className="mb-4">
                This Refund Policy may be updated periodically to reflect changes in our services or legal requirements. Clients will be notified of significant changes via email or website notifications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="mb-4">
                For refund requests or questions about this policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Axe Visa Technology</strong></p>
                <p>Refund Department</p>
                <p>123 Business Ave, Suite 500</p>
                <p>New Delhi, India</p>
                <p>Email: refunds@axevisa.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Business Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
              </div>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
              <p className="font-medium text-blue-800">Customer Commitment:</p>
              <p className="text-blue-700">
                We are committed to fair and transparent refund practices. Our goal is to resolve all refund requests promptly and professionally while maintaining the highest standards of customer service.
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