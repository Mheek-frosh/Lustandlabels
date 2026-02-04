import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuickViewModal from './QuickViewModal';
import { calculateDiscount } from '../utils/productUtils';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [showQuickView, setShowQuickView] = useState(false);

    const discount = product.originalPrice
        ? calculateDiscount(product.originalPrice, product.price)
        : 0;

    // Badge colors
    const badgeColors = {
        Sale: 'bg-lust-red text-white',
        Hot: 'bg-orange-500 text-white',
        New: 'bg-lust-dark text-white',
        Limited: 'bg-lust-gold text-white'
    };

    // Render star rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} size={14} className="fill-lust-gold text-lust-gold" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative">
                        <Star size={14} className="text-gray-300 dark:text-gray-600" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star size={14} className="fill-lust-gold text-lust-gold" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} size={14} className="text-gray-300 dark:text-gray-600" />
                );
            }
        }
        return stars;
    };

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

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <span className="absolute top-4 left-4 bg-lust-red text-white text-sm font-bold px-3 py-1.5 rounded-full z-10">
                            -{discount}%
                        </span>
                    )}

                    {/* Badge */}
                    {product.badge && (
                        <span className={`absolute ${discount > 0 ? 'top-16' : 'top-4'} left-4 ${badgeColors[product.badge] || 'bg-lust-dark text-white'} text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm z-10`}>
                            {product.badge}
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
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">{product.category}</p>
                            <h3 className="text-base font-bold text-lust-dark dark:text-white group-hover:text-lust-red transition-colors line-clamp-2">
                                <Link to={`/product/${product.id}`}>
                                    {product.title}
                                </Link>
                            </h3>
                        </div>
                    </div>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex gap-0.5">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({product.reviews})
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-xl font-semibold text-lust-gold">
                            ₦{product.price.toLocaleString()}
                        </p>
                        {product.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                ₦{product.originalPrice.toLocaleString()}
                            </p>
                        )}
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

