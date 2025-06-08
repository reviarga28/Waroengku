"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export const SpaHeader = () => {
  return (
    <section id="home">
      <header className="relative h-screen bg-gradient-to-b from-red-50 to-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat opacity-5"></div>
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-yellow-200 rounded-full filter blur-3xl opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                  WAROENGKU
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Menyajikan Makanan{" "}
                <span className="font-semibold text-red-600">
                  Tradisional Indonesia
                </span>{" "}
                dengan Kualitas Premium
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button className="relative bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  Pesan Sekarang
                </Button>
                <a href="#menu">
                  <Button
                    variant="outline"
                    className="relative border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700 px-8 py-6 text-lg font-semibold rounded-full shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    Lihat Menu
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src="/foods.jpg"
                  alt="Traditional Indonesian Food"
                  fill
                  className="object-cover rounded-full shadow-2xl border-8 border-white"
                  priority
                />
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-red-200 to-yellow-200 rounded-full blur-md scale-95"></div>
              </div>
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-sm font-medium text-gray-800">
                  ⭐ 4.9 Rating
                </div>
                <div className="text-xs text-gray-500">500+ Reviews</div>
              </motion.div>
              <motion.div
                className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="text-sm font-medium text-gray-800">
                  🍛 50+ Menu
                </div>
                <div className="text-xs text-gray-500">Variasi Makanan</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>
    </section>
  );
};
