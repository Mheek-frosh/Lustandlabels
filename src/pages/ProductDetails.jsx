import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));
    const [selectedSize, setSelectedSize] = useState(null);
    const { addToCart } = useCart();

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-lust-dark dark:text-white">
                <h2 className="text-2xl font-heading mb-4">Product Not Found</h2>
                <Link to="/shop" className="text-lust-red hover:underline">Return to Shop</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-gray-950 text-lust-dark dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-lust-red mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-lg"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Details Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-lust-red font-bold text-sm uppercase tracking-widest mb-2">{product.category}</span>
                        <h1 className="text-4xl font-heading font-bold mb-4">{product.title}</h1>
                        <p className="text-2xl font-semibold text-lust-gold mb-6">₦{product.price.toLocaleString()}</p>

                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {product.description || "No description available for this unique piece. Grab it before it's gone!"}
                        </p>

                        {/* Sizes */}
                        {product.sizes && (
                            <div className="mb-8">
                                <h3 className="font-bold mb-3 text-sm uppercase tracking-wide">Select Size</h3>
                                <div className="flex gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${selectedSize === size
                                                ? 'border-lust-red bg-lust-red text-white'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-lust-red dark:hover:border-lust-red'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={() => addToCart({ ...product, size: selectedSize })}
                                className="flex-1 bg-lust-dark dark:bg-white dark:text-lust-dark text-white py-4 px-8 rounded-full font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-lust-red transition-colors">
                                <Heart size={24} />
                            </button>
                            <button className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-lust-red transition-colors">
                                <Share2 size={24} />
                            </button>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li className="flex items-center gap-2">✓ Free shipping on orders over $100</li>
                                <li className="flex items-center gap-2">✓ Sustainable & Eco-friendly packaging</li>
                                <li className="flex items-center gap-2">✓ 30-day return policy</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
