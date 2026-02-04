import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Flash Deals",
            subtitle: "Up to 50% Off",
            description: "Limited time offers on your favorite items",
            cta: "Shop Now",
            link: "#flash-deals",
            bgImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
            bgColor: "from-lust-red/90 to-red-800/90"
        },
        {
            id: 2,
            title: "New Arrivals",
            subtitle: "Fresh Styles Just In",
            description: "Discover the latest thrifted treasures",
            cta: "Explore",
            link: "#new-arrivals",
            bgImage: "https://images.unsplash.com/photo-1558769132-cb1aea3267e2?q=80&w=2074&auto=format&fit=crop",
            bgColor: "from-lust-dark/90 to-gray-900/90"
        },
        {
            id: 3,
            title: "Electronics",
            subtitle: "Tech Deals",
            description: "Premium gadgets at unbeatable prices",
            cta: "View Collection",
            link: "/shop?category=Electronics",
            bgImage: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021&auto=format&fit=crop",
            bgColor: "from-gray-900/90 to-lust-dark/90"
        },
        {
            id: 4,
            title: "Sports & Fitness",
            subtitle: "Get Active",
            description: "Workout gear for your fitness journey",
            cta: "Shop Sports",
            link: "/shop?category=Sports & Outdoors",
            bgImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
            bgColor: "from-lust-gold/90 to-yellow-700/90"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative h-[500px] overflow-hidden bg-gray-900">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
                    />

                    {/* Overlay Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor}`} />

                    {/* Content */}
                    <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="text-lust-gold font-semibold text-lg mb-2 uppercase tracking-wider"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.p>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-xl text-gray-200 mb-8"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <a
                                    href={slides[currentSlide].link}
                                    className="inline-block px-8 py-4 bg-lust-red text-white font-semibold rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    {slides[currentSlide].cta}
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroBanner;
