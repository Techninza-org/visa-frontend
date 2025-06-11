import Footer from "@/components/footer";
import Header from "@/components/header";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 mt-10">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Privacy Policy
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Company Name:</strong> Axe Visa Technology
              </p>
              <p>
                <strong>Registered Address:</strong> K-2/12 13 Peepal Chowk,
                Mohan Garden Uttam Nagar, Near Reliance Fresh, New Delhi, Delhi
                – 110059
              </p>
              <p>
                <strong>Website:</strong> www.axevia.com
              </p>
              <p>
                <strong>Contact Email:</strong> info@axevia.com
              </p>

              <h2>1. Introduction</h2>
              <p>
                At Axe Visa Technology, we value your privacy and are committed
                to protecting the personal information you share with us. This
                Privacy Policy outlines how we collect, use, store, and
                safeguard your data in connection with our visa and
                travel-related services. By using our website or services, you
                consent to the practices described in this policy.
              </p>

              <h2>2. Information We Collect</h2>
              <ul>
                <li>
                  <strong>Identity Information:</strong> Full name, date of
                  birth, passport number
                </li>
                <li>
                  <strong>Contact Details:</strong> Phone number, email,
                  residential address
                </li>
                <li>
                  <strong>Visa-related Documents:</strong> Scanned passport,
                  photos, financial records, employment/invitation letters
                </li>
                <li>
                  <strong>Travel Details:</strong> Purpose of travel, travel
                  dates, accommodation details
                </li>
                <li>
                  <strong>Payment Information:</strong> Billing details and
                  transaction history (we do not store card details)
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <ul>
                <li>
                  To assist with visa application preparation and submission
                </li>
                <li>To communicate updates, reminders, and confirmations</li>
                <li>
                  To book embassy appointments and third-party reservations
                </li>
                <li>For customer support and dispute resolution</li>
                <li>To improve service quality and user experience</li>
              </ul>
              <p>
                We do not sell, rent, or trade your information to any third
                parties.
              </p>

              <h2>4. Sharing of Information</h2>
              <p>We may share your data only with:</p>
              <ul>
                <li>
                  Embassies, consulates, and visa processing centers as required
                </li>
                <li>
                  Trusted third-party providers for flight/hotel/insurance
                  reservations
                </li>
                <li>Legal authorities as required by applicable laws</li>
              </ul>
              <p>
                All partners and vendors operate under strict data protection
                policies.
              </p>

              <h2>5. Data Security</h2>
              <p>
                We implement technical, administrative, and physical safeguards
                to protect your information from unauthorized access or misuse.
                Data is stored in secure systems with restricted access,
                encryption, and regular monitoring.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to
                fulfill the purpose of your visa application or as required by
                law. After this period, all sensitive documents are securely
                deleted or anonymized.
              </p>

              <h2>7. Your Rights</h2>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>
                  Request deletion of your data (where legally permissible)
                </li>
                <li>Withdraw consent for non-essential data usage</li>
              </ul>
              <p>
                To exercise these rights, email us at{" "}
                <strong>info@axevia.com</strong>.
              </p>

              <h2>8. Cookies & Website Analytics</h2>
              <p>
                Our website may use cookies to enhance user experience,
                understand behavior, and improve services. You may disable
                cookies via your browser settings.
              </p>

              <h2>9. Children’s Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal data from children.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We reserve the right to update this Privacy Policy at any time.
                All changes will be posted on this page with an updated
                effective date.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions or concerns regarding this policy or your
                data privacy, please contact:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> info@axevisa.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 99993 90696
                </p>
                <p>
                  <strong>Address:</strong> Axe Visa Technology Private Limited,
                  <br />
                  K-2/12 13 Peepal Chowk, Mohan Garden Uttam Nagar, Near
                  Reliance Fresh, New Delhi, Delhi – 110059
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
