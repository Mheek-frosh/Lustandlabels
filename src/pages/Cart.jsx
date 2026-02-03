import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

    // Calculate shipping (free over ₦100,000)
    const shipping = totalPrice > 100000 ? 0 : 5000;
    const finalTotal = totalPrice + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center bg-white dark:bg-gray-950 text-lust-dark dark:text-white transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full mb-6"
                >
                    <ShoppingBag size={48} className="text-gray-400" />
                </motion.div>
                <h1 className="text-3xl font-heading font-bold mb-4">Your bag is empty</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center">
                    Looks like you haven't found your perfect fit yet. Explore our latest drops to find something you love.
                </p>
                <Link
                    to="/shop"
                    className="px-8 py-3 bg-lust-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-950 text-lust-dark dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-heading font-bold mb-8">Shopping Bag ({cartItems.length} items)</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                            >
                                <div className="w-full sm:w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="font-semibold text-lust-gold">₦{(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{item.category}</p>
                                        {item.size && <p className="text-gray-500 dark:text-gray-400 text-sm">Size: <span className="font-medium text-lust-dark dark:text-white">{item.size}</span></p>}
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-lust-red transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-lust-red transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-lust-red transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 font-heading">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₦{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Shipping Estimate</span>
                                    <span>{shipping === 0 ? 'Free' : `₦${shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-800 my-4 pt-4 flex justify-between font-bold text-xl">
                                    <span>Total</span>
                                    <span className="text-lust-red">₦{finalTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="w-full bg-lust-dark dark:bg-white text-white dark:text-lust-dark py-4 rounded-full font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                                Proceed to Checkout
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="mt-6 text-xs text-center text-gray-400">
                                Secure checkout powered by Paystack.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
