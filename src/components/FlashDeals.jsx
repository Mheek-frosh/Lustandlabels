import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import ProductCard from './ProductCard';
import { getFlashDeals } from '../utils/productUtils';
import { products } from '../data/products';

const FlashDeals = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    const flashDeals = getFlashDeals(products, 8);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Reset countdown
                    return { hours: 23, minutes: 59, seconds: 59 };
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (value) => String(value).padStart(2, '0');

    return (
        <section className="py-16 bg-gradient-to-r from-lust-red to-red-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="text-lust-gold" size={28} />
                            <h2 className="text-4xl font-heading font-bold text-white">
                                Flash Deals
                            </h2>
                        </div>
                        <p className="text-gray-100">
                            Limited time offers - grab them before they&apos;re gone!
                        </p>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex gap-4 mt-6 md:mt-0">
                        <div className="text-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold text-white">
                                    {formatTime(timeLeft.hours)}
                                </div>
                                <div className="text-xs text-gray-200 uppercase mt-1">Hours</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold text-white">
                                    {formatTime(timeLeft.minutes)}
                                </div>
                                <div className="text-xs text-gray-200 uppercase mt-1">Minutes</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                                <div className="text-3xl font-bold text-white">
                                    {formatTime(timeLeft.seconds)}
                                </div>
                                <div className="text-xs text-gray-200 uppercase mt-1">Seconds</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid - Horizontal Scroll on Mobile */}
                <div className="overflow-x-auto pb-4 -mx-4 px-4 md:overflow-visible">
                    <div className="flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 min-w-max md:min-w-0">
                        {flashDeals.map((product) => (
                            <div key={product.id} className="w-[280px] md:w-auto flex-shrink-0">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlashDeals;
