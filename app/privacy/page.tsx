import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 font-sans text-stone-800">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-stone-200">
        <Link href="/" className="text-amber-600 hover:underline mb-8 inline-block font-medium">
          ← Back to BhoomiGo
        </Link>
        <h1 className="text-3xl font-bold text-stone-900 mb-8 border-b pb-4">Privacy Policy</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We only collect information that you voluntarily provide to us when you contact us via WhatsApp or Phone. This may include your name, contact number, and delivery address in Odisha.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              The information you provide is used solely to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Process and fulfill your orders for construction materials.</li>
              <li>Provide quotes and delivery schedules.</li>
              <li>Communicate with you regarding your service requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">3. Data Security & Storage</h2>
            <p className="leading-relaxed">
              We do not store your data in a public database. Your communications with us are protected by standard encryption provided by WhatsApp and mobile service providers. We never sell or share your personal information with third-party marketing agencies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">4. Third-Party Services</h2>
            <p className="leading-relaxed">
              Our website uses Google analytics tools to understand visitor behavior and improve our advertising campaigns. These tools may collect anonymous data about your visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-3">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about our privacy practices, please contact us at +91 89845 16025.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t text-stone-500 text-sm">
          Last updated: March 2026
        </div>
      </div>
    </main>
  );
}
