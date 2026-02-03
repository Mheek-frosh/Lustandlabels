import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [showQuickView, setShowQuickView] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
                <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />

                    {product.isNew && (
                        <span className="absolute top-4 left-4 bg-lust-dark text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm z-10">
                            New Arrival
                        </span>
                    )}
                </Link>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 z-20">
                    <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:text-lust-red dark:hover:text-lust-red transition-colors">
                        <Heart size={20} />
                    </button>
                    <button
                        onClick={() => setShowQuickView(true)}
                        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:text-lust-red dark:hover:text-lust-red transition-colors"
                    >
                        <Eye size={20} />
                    </button>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-700 dark:text-gray-200 hover:text-lust-red dark:hover:text-lust-red transition-colors"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
                            <h3 className="text-lg font-bold text-lust-dark dark:text-white group-hover:text-lust-red transition-colors">
                                <Link to={`/product/${product.id}`}>
                                    {product.title}
                                </Link>
                            </h3>
                        </div>
                        <p className="text-lg font-semibold text-lust-gold">₦{product.price.toLocaleString()}</p>
                    </div>
                </div>
            </motion.div>

            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
};

export default ProductCard;
