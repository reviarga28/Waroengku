"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const SpaAbout = () => {

  return (
    <section
      id="about"
      className="py-20 scroll-mt-14 bg-gradient-to-b from-gray-50 to-white"
    >
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
              Tentang Kami
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Menyajikan Kuliner Autentik dengan Cita Rasa Tinggi Sejak 2005
            </h3>

            <p className="text-gray-600 leading-relaxed text-lg">
              Berdiri sejak tahun 2005, kami telah menjadi destinasi utama bagi
              pecinta kuliner Indonesia. Dengan pengalaman lebih dari 18 tahun,
              kami berkomitmen untuk menyajikan hidangan terbaik dengan
              bahan-bahan pilihan dan resep turun temurun.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    50.000+ Pelanggan
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Telah merasakan kelezatan masakan kami
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Koki Profesional
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Bersertifikat dan berpengalaman
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Bahan Pilihan</h4>
                  <p className="text-gray-600 text-sm">
                    Segar dan berkualitas tinggi
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Hygiene Terjamin
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Proses masak bersih dan steril
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="#contact">
                <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                  Hubungi Kami
                </button>
              </a>
              <a href="#menu">
                <button className="border-2 border-red-600 text-red-600 hover:bg-red-100 font-medium py-3 px-8 rounded-lg transition-all duration-300 cursor-pointer">
                  Lihat Menu
                </button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/interior.webp" // Replace with your actual image
                alt="Interior Restoran Kami"
                fill
                className="object-cover"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-xl font-bold mb-1">Restoran Nyaman</h4>
                <p className="text-sm">Suasana yang membuat betah</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/koki.webp" // Replace with your actual image
                  alt="Koki Kami"
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Koki Profesional</p>
                </div>
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/bahansegar.jfif" // Replace with your actual image
                  alt="Bahan Segar"
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Bahan Berkualitas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
