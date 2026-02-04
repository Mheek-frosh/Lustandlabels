import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems } = useCart();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Vision', href: '/#vision' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <Link to="/" className="font-heading text-2xl font-bold text-lust-dark dark:text-white tracking-tighter">
                            Lustandlabels
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => {
                                // Handle hash links for scrolling
                                if (link.href.startsWith('/#')) {
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-gray-600 dark:text-gray-300 hover:text-lust-red dark:hover:text-lust-red px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    );
                                }
                                // Handle internal routes
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-lust-red dark:hover:text-lust-red px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center">
                        <Link to="/cart" className="p-2 text-gray-600 dark:text-gray-300 hover:text-lust-red transition-colors relative">
                            <ShoppingBag size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-lust-red rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-lust-red transition-colors relative">
                            <ShoppingBag size={24} />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-lust-red rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-lust-dark dark:hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => {
                                if (link.href.startsWith('/#')) {
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="text-gray-600 dark:text-gray-300 hover:text-lust-red block px-3 py-2 rounded-md text-base font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    );
                                }
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-gray-600 dark:text-gray-300 hover:text-lust-red block px-3 py-2 rounded-md text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
