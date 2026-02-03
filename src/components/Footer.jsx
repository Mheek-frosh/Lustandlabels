import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-lust-dark text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-heading text-xl font-bold mb-4">Lustandlabels</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Curating bold, thrifted outfits for confident style on a budget.
                            Look good, feel confident, and stand out sustainably.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-lust-red text-sm transition-colors">Home</a></li>
                            <li><a href="#shop" className="text-gray-300 hover:text-lust-red text-sm transition-colors">Shop</a></li>
                            <li><a href="#vision" className="text-gray-300 hover:text-lust-red text-sm transition-colors">Vision</a></li>
                            <li><a href="#contact" className="text-gray-300 hover:text-lust-red text-sm transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-lust-red transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-300 hover:text-lust-red transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-300 hover:text-lust-red transition-colors"><Twitter size={20} /></a>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Lustandlabels. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
