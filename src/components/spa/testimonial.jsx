"use client";
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    rating: 5,
    comment:
      "Makanan di sini selalu segar dan enak. Pelayanan juga ramah dan cepat. Sudah langganan sejak 2010!",
    avatar: "/cs4.jfif",
    date: "12 Januari 2025",
  },
  {
    id: 2,
    name: "Anita Wijaya",
    rating: 4,
    comment:
      "Sate ayamnya juara! Bumbu kacangnya pas tidak terlalu manis. Tempatnya nyaman dan bersih.",
    avatar: "/cs2.jfif",
    date: "28 Februari 2025",
  },
  {
    id: 3,
    name: "Rudi Hermawan",
    rating: 5,
    comment:
      "Ayam gepreknya pedasnya pas dan crispy. Porsinya besar dan harganya terjangkau untuk kualitas premium.",
    avatar: "/cs3.jfif",
    date: "15 Maret 2025",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    rating: 5,
    comment:
      "Gado-gado di sini paling autentik yang pernah saya coba. Bumbu kacangnya bikin ketagihan!",
    avatar: "/cs1.jfif",
    date: "3 April 2025",
  },
];

export const SpaTestimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonial" className="py-20 scroll-mt-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
          Kata <span className="text-red-600">Pelanggan</span> Kami
        </h3>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Dengarkan apa yang dikatakan pelanggan setia kami tentang pengalaman
          mereka
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="rounded-full object-cover border-4 border-red-100"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentTestimonial].rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "{testimonials[currentTestimonial].comment}"
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonials[currentTestimonial].date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6 text-red-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6 text-red-600" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial
                    ? "bg-red-600 w-6"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
