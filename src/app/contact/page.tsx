"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Here you could add logic to send the form data to an API endpoint
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-green-600 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-8">
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Our Contact Information</h2>
            <ul className="text-gray-700 space-y-2">
              <li><span className="font-medium">Address:</span> 4th Floor, Potluri Castle, Dwaraka Nagar, Visakhapatnam, AP 530016</li>
              <li><span className="font-medium">Email:</span> <a href="mailto:contact@EduSailorglobal.com" className="text-blue-600 hover:underline">contact@EduSailorglobal.com</a></li>
              <li><span className="font-medium">Phone:</span> <a href="tel:+918912345678" className="text-blue-600 hover:underline">+91 (891) 234-5678</a></li>
            </ul>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg">Thank you for contacting us! We'll get back to you soon.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
