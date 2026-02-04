import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductSection = ({
    title,
    description,
    products,
    viewAllLink,
    bgColor = "bg-white dark:bg-gray-900"
}) => {
    return (
        <section className={`py-20 ${bgColor} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-heading font-bold mb-3 text-lust-dark dark:text-white transition-colors">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-gray-500 dark:text-gray-400 max-w-xl transition-colors">
                                {description}
                            </p>
                        )}
                    </div>

                    {viewAllLink && (
                        <Link
                            to={viewAllLink}
                            className="hidden md:inline-block border-b-2 border-lust-dark dark:border-white pb-1 text-lust-dark dark:text-white font-semibold hover:text-lust-red hover:border-lust-red dark:hover:text-lust-red dark:hover:border-lust-red transition-all"
                        >
                            View All
                        </Link>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Link */}
                {viewAllLink && (
                    <div className="mt-12 text-center md:hidden">
                        <Link
                            to={viewAllLink}
                            className="inline-block border-b-2 border-lust-dark dark:border-white pb-1 text-lust-dark dark:text-white font-semibold hover:text-lust-red hover:border-lust-red dark:hover:text-lust-red dark:hover:border-lust-red transition-all"
                        >
                            View All
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSection;
