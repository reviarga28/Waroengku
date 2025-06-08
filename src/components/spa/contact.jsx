"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock8Icon, LocateIcon, MailIcon, MessageCircleMore, MessageCircleMoreIcon, PhoneIcon } from "lucide-react";

export const SpaContact = () => {
  return (
    <section id="contact" className="py-20 scroll-mt-14 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Hubungi Kami
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami siap melayani kebutuhan perawatan tubuh dan relaksasi Anda
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Card 1 - Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneIcon className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Telepon</h3>
            <p className="text-gray-600 mb-4">Hubungi kami langsung</p>
            <a 
              href="tel:+6281234567890" 
              className="text-xl font-semibold text-red-600 hover:text-red-800 transition-colors"
            >
              0812-3456-7890
            </a>
          </motion.div>

          {/* Contact Card 2 - WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircleMoreIcon className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Chat langsung dengan kami</p>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Kirim Pesan
            </a>
          </motion.div>

          {/* Contact Card 3 - Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MailIcon className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Kirimkan pertanyaan Anda</p>
            <a 
              href="mailto:info@spaexample.com" 
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              waroengku228@gmail.com
            </a>
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <LocateIcon className="text-red-600 mr-3" />
              Lokasi Kami
            </h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613506864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e839560ef85!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1623394257721!5m2!1sen!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
                title="Lokasi Spa Kami"
              ></iframe>
            </div>
            <p className="mt-4 text-gray-600">
              Jl. A Yani No. 28, Jakarta Selatan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Clock8Icon className="text-red-600 mr-3" />
              Jam Operasional
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Senin - Jumat</span>
                <span className="font-medium">09:00 - 21:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Sabtu</span>
                <span className="font-medium">08:00 - 22:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-3">
                <span className="text-gray-600">Minggu</span>
                <span className="font-medium">08:00 - 20:00</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-gray-600">Hari Libur</span>
                <span className="font-medium">10:00 - 18:00</span>
              </div>
            </div>

            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
              <h4 className="font-bold text-red-800 mb-2">Perhatian!</h4>
              <p className="text-red-600 text-sm">
                Reservasi minimal 2 jam sebelum kedatangan. Untuk hari libur nasional, harap konfirmasi terlebih dahulu.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-red-600 to-red-800 p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Pesan Sekarang</h3>
              <p className="mb-6">
                Isi formulir berikut dan kami akan segera menghubungi Anda untuk konfirmasi reservasi.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <PhoneIcon className="mr-3" />
                  <span>0812-3456-7890</span>
                </div>
                <div className="flex items-center">
                  <MailIcon className="mr-3" />
                  <span>waroengkures28@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="Masukkan email Anda"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Pesan</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="Tulis pesan Anda..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};