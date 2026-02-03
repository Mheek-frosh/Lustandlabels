import React from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();

    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors text-gray-800 dark:text-white"
                    >
                        <X size={20} />
                    </button>

                    {/* Image */}
                    <div className="h-64 md:h-full bg-gray-100 dark:bg-gray-800">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="p-8 flex flex-col justify-center">
                        <span className="text-lust-red font-bold text-xs uppercase tracking-widest mb-2">{product.category}</span>
                        <h2 className="text-3xl font-heading font-bold mb-2 text-lust-dark dark:text-white">{product.title}</h2>
                        <p className="text-2xl font-semibold text-lust-gold mb-4">₦{product.price.toLocaleString()}</p>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                            {product.description || "No description available. A unique thrifted find waiting for you."}
                        </p>

                        {product.sizes && (
                            <div className="mb-6">
                                <h3 className="font-bold mb-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Available Sizes</h3>
                                <div className="flex gap-2">
                                    {product.sizes.map((size) => (
                                        <span key={size} className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                className="flex-1 bg-lust-dark dark:bg-white dark:text-lust-dark text-white py-3 px-6 rounded-full font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={18} /> Add to Cart
                            </button>
                            <Link
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-full font-semibold hover:border-lust-red hover:text-lust-red transition-colors text-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
