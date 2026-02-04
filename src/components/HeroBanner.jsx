import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
            bgImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
            bgColor: "from-lust-red/95 to-red-800/95"
        },
        {
            id: 2,
            title: "New Arrivals",
            subtitle: "Fresh Styles Just In",
            description: "Discover the latest thrifted treasures",
            cta: "Explore",
            link: "#new-arrivals",
            bgImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop",
            bgColor: "from-lust-dark/95 to-gray-900/95"
        },
        {
            id: 3,
            title: "Tech Deals",
            subtitle: "Electronics",
            description: "Premium gadgets at unbeatable prices",
            cta: "View Collection",
            link: "/shop?category=Electronics",
            bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop",
            bgColor: "from-gray-900/95 to-lust-dark/95"
        },
        {
            id: 4,
            title: "Get Active",
            subtitle: "Sports & Fitness",
            description: "Workout gear for your fitness journey",
            cta: "Shop Sports",
            link: "/shop?category=Sports & Outdoors",
            bgImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1920&auto=format&fit=crop",
            bgColor: "from-lust-gold/95 to-yellow-700/95"
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
                    {/* Background with Gradient Overlay */}
                    <div className="absolute inset-0">
                        {/* Base gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor}`} />

                        {/* Image positioned on the right side with diagonal clip */}
                        <div className="absolute inset-y-0 right-0 w-1/2 md:w-2/5">
                            <div
                                className="h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slides[currentSlide].bgImage})`,
                                    clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Content - Left Side */}
                    <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="max-w-xl"
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
                                className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 leading-tight"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-xl text-gray-100 mb-8 max-w-md"
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
