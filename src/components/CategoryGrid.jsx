import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/productUtils';
import { products } from '../data/products';

const CategoryGrid = () => {
    const categories = getCategories(products);

    // Category images mapping - Modern, sleek high-quality images
    const categoryImages = {
        "Women's Fashion": "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop",
        "Men's Fashion": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=400&auto=format&fit=crop",
        "Electronics": "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400&auto=format&fit=crop",
        "Accessories": "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=400&auto=format&fit=crop",
        "Home & Living": "https://images.unsplash.com/photo-1615800001234-e46c480a7bf6?q=80&w=400&auto=format&fit=crop",
        "Beauty": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop",
        "Sports & Outdoors": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop"
    };

    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-heading font-bold mb-4 text-lust-dark dark:text-white transition-colors">
                        Shop by Category
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                        Explore our curated collections across all categories
                    </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                to={`/shop?category=${encodeURIComponent(category.name)}`}
                                className="group block relative overflow-hidden rounded-lg aspect-square bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                {/* Category Image */}
                                <img
                                    src={categoryImages[category.name]}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-lust-dark/90 via-lust-dark/50 to-transparent group-hover:from-lust-red/90 group-hover:via-lust-red/50 transition-all duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4">
                                    <h3 className="text-white font-heading font-bold text-lg mb-1 group-hover:text-lust-gold transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-200 text-sm">
                                        {category.count} {category.count === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
