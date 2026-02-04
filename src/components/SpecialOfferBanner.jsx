import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SpecialOfferBanner = ({
    title,
    subtitle,
    ctaText,
    ctaLink,
    variant = "gradient" // gradient, solid, minimal
}) => {
    const variants = {
        gradient: "bg-gradient-to-r from-lust-red via-red-600 to-lust-dark",
        solid: "bg-lust-dark",
        minimal: "bg-gray-50 dark:bg-gray-950 border-2 border-lust-red"
    };

    const textColor = variant === "minimal"
        ? "text-lust-dark dark:text-white"
        : "text-white";

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`${variants[variant]} rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative`}
                >
                    {/* Background Pattern */}
                    {variant !== "minimal" && (
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                        </div>
                    )}

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-center md:text-left">
                            <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-2 ${textColor}`}>
                                {title}
                            </h2>
                            <p className={`text-lg md:text-xl ${variant === "minimal" ? "text-gray-600 dark:text-gray-400" : "text-gray-100"}`}>
                                {subtitle}
                            </p>
                        </div>

                        <a
                            href={ctaLink}
                            className={`group inline-flex items-center gap-2 px-8 py-4 ${variant === "minimal"
                                    ? "bg-lust-red text-white hover:bg-red-700"
                                    : "bg-white text-lust-dark hover:bg-gray-100"
                                } font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg whitespace-nowrap`}
                        >
                            {ctaText}
                            <ArrowRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialOfferBanner;
