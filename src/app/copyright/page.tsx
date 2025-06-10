import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Copyright() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 mt-10">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              © Copyright Notice 
            </h1>

            <p className="text-gray-600 mb-4">
              <strong>Company Name:</strong> Axe Visa Technology <br />
              <strong>Registered Address:</strong> K-2/12 13 Peepal Chowk, Mohan Garden Uttam Nagar, Near Reliance Fresh,
              New Delhi, Delhi – 110059 <br />
              <strong>Website:</strong> www.axevia.com
            </p>

            {/* Section 1 */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Ownership of Content</h2>
              <p className="text-gray-600 mb-2">
                All content, materials, logos, designs, documents, templates, and software tools available on or distributed by
                Axe Visa Technology (collectively referred to as "Content") are the intellectual property of the company and are
                protected under copyright, trademark, and other applicable laws.
              </p>
              <p className="text-gray-600">This includes, but is not limited to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                <li>Visa checklists and document templates</li>
                <li>Website design, UI/UX, and source code</li>
                <li>Text content, blogs, graphics, icons, illustrations</li>
                <li>Logos, slogans, brand name “Axe Visa Technology”</li>
                <li>Client materials created for visa applications (cover letters, sponsorship letters, itineraries, etc.)</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Usage Restrictions</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Copied or reproduced in any form</li>
                <li>Sold, sublicensed, or redistributed</li>
                <li>Modified or adapted without prior written consent</li>
                <li>Used to develop competing products or services</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Unauthorized use of our content constitutes a violation of intellectual property laws and may lead to legal
                action.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Permitted Use</h2>
              <p className="text-gray-600">
                Clients and partners are granted a limited, non-transferable license to use materials provided by Axe Visa
                Technology only for personal or authorized business use, specifically for visa processing purposes.
              </p>
              <p className="text-gray-600 mt-2">
                No materials may be resold, published online, or shared with third parties beyond their intended use without
                explicit permission.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Trademarks</h2>
              <p className="text-gray-600">
                “Axe Visa Technology,” the “Dream. Apply. Go.” slogan, and the associated logo are registered or unregistered
                trademarks of Axe Visa Technology. Use of these marks without permission is strictly prohibited.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Third-Party Content</h2>
              <p className="text-gray-600">
                Where third-party content (e.g., embassy logos, document requirements, or country-specific resources) is
                referenced, it is used solely for informational purposes and remains the property of their respective owners.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Reporting Infringements</h2>
              <p className="text-gray-600">
                If you believe any of our content has been used without authorization or your own content has been improperly
                published by us, please report it to:
              </p>
              <p className="text-gray-600 mt-2">
                📧 <a href="mailto:Info@axevisa.com" className="text-blue-600 underline">Info@axevisa.com</a> <br />
                📞 <a href="tel:+919999390696" className="text-blue-600 underline">+91 99993 90696</a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
