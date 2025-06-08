"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const menuItems = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan campuran daging ayam, udang, telur, dan sayuran segar",
    price: "25.000",
    image: "/nasgor.jpg",
    spicy: 2,
    category: "Main Course"
  },
  {
    id: 2,
    name: "Sate Ayam Madura",
    description: "Sate ayam dengan bumbu kacang khas Madura, disajikan dengan lontong",
    price: "30.000",
    image: "/resepayamsatemadura.jpeg",
    spicy: 1,
    category: "Appetizer"
  },
  {
    id: 3,
    name: "Ayam Geprek Sambal Matah",
    description: "Ayam krispi dengan sambal matah Bali yang segar dan pedas",
    price: "35.000",
    image: "/ayamgeprek.jpg",
    spicy: 3,
    category: "Main Course"
  },
  {
    id: 4,
    name: "Gado-Gado",
    description: "Salad sayuran dengan bumbu kacang khas Indonesia",
    price: "22.000",
    image: "/gadogado.jpg",
    spicy: 0,
    category: "Appetizer"
  },
  {
    id: 5,
    name: "Sop Buntut",
    description: "Sup ekor sapi dengan rempah-rempah pilihan",
    price: "45.000",
    image: "/sop-buntut.jpg",
    spicy: 1,
    category: "Soup"
  },
  {
    id: 6,
    name: "Ayam Bakar",
    description: "Ayam bakar dengan bumbu kacang khas Indonesia",
    price: "25.000",
    image: "/ayambakar.jpg",
    spicy: 0,
    category: "Dessert"
  }
];

export const SpaMenu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= menuItems.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? menuItems.length - itemsPerPage : prevIndex - 1
    );
  };

  const visibleItems = menuItems.slice(currentIndex, currentIndex + itemsPerPage);

  // If we're at the end and there aren't enough items left, wrap around
  if (currentIndex + itemsPerPage > menuItems.length) {
    visibleItems.push(...menuItems.slice(0, itemsPerPage - (menuItems.length - currentIndex)));
  }

  return (
    <section id="menu" className="py-20 scroll-mt-14 bg-gradient-to-b from-white to-gray-50">
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
              Menu Spesial
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nikmati hidangan autentik Indonesia dengan cita rasa yang memikat
          </p>
        </motion.div>

        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
            aria-label="Previous menu items"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
            {visibleItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <span className="text-lg font-bold text-red-600">Rp{item.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center">
                    {[...Array(3)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < item.spicy ? 'text-red-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">
                      {item.spicy === 0 ? 'Tidak pedas' : 
                       item.spicy === 1 ? 'Sedikit pedas' : 
                       item.spicy === 2 ? 'Pedas' : 'Sangat pedas'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
            aria-label="Next menu items"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(menuItems.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-3 h-3 rounded-full ${currentIndex >= index * itemsPerPage && currentIndex < (index + 1) * itemsPerPage ? 'bg-red-600' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};