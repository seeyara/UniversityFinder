import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Users, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-blue-600 mr-2" />
                Your Data is Yours
              </h2>
              <p className="text-gray-700 mb-4">
                At EduSailor Global, we believe that your personal information belongs to you. We are committed to protecting your privacy and ensuring that you have full control over your data. This privacy policy explains how we collect, use, and protect your information when you use our services.
              </p>
              <p className="text-gray-700">
                We are transparent about our data practices and will never sell, rent, or share your personal information with third parties without your explicit consent, except as required by law.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-blue-600 mr-2" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Information You Provide</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Contact information (name, email, phone number)</li>
                    <li>Educational background and preferences</li>
                    <li>University and program interests</li>
                    <li>Test scores and academic records</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Website usage data and analytics</li>
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                How We Use Your Information
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use your information to provide and improve our services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Provide personalized university recommendations and guidance</li>
                  <li>Assist with university applications and visa processes</li>
                  <li>Send relevant educational content and updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our services and develop new features</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Secure data storage and transmission protocols</li>
                  <li>Regular backup and disaster recovery procedures</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Restriction:</strong> Request limitation of data processing</li>
                  <li><strong>Objection:</strong> Object to certain types of processing</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information only for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services for analytics, customer support, and other business functions. These services have their own privacy policies, and we encourage you to review them.
              </p>
              <p className="text-gray-700">
                We do not sell, rent, or trade your personal information with third parties for marketing purposes.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new privacy policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated privacy policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>EduSailor Global</strong><br />
                  4th Floor, Potluri Castle<br />
                  Dwaraka Nagar, Visakhapatnam, AP 530016<br />
                  Email: privacy@edusailorglobal.com<br />
                  Phone: +91 (891) 234-5678
                </p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                This privacy policy is effective as of the date listed above and applies to all users of our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 