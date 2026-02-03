import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

const Home = () => {
    const featuredProducts = products.slice(0, 4);

    return (
        <>
            <div id="home">
                <Hero />
            </div>

            <section id="shop" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-heading font-bold mb-4 text-lust-dark dark:text-white transition-colors">Latest Drops</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto transition-colors">
                            Freshly curated thrifted finds. Unique, sustainable, and ready to make a statement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/shop" className="inline-block border-b-2 border-lust-dark dark:border-white pb-1 text-lust-dark dark:text-white font-semibold hover:text-lust-red hover:border-lust-red dark:hover:text-lust-red dark:hover:border-lust-red transition-all">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            <section id="vision" className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-lust-dark dark:text-white transition-colors">Our Vision</h2>
                    <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors">
                        &quot;To be the go-to thrift brand for students and style lovers who want to <span className="text-lust-red font-semibold">slay sustainably</span> and confidently on a budget.&quot;
                    </p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <h3 className="font-heading text-xl font-bold mb-3 dark:text-white transition-colors">Sustainable</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Giving pre-loved clothes a second chance to shine.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="font-heading text-xl font-bold mb-3 dark:text-white transition-colors">Affordable</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Looking expensive doesn&apos;t have to cost a fortune.</p>
                        </div>
                        <div className="p-6">
                            <h3 className="font-heading text-xl font-bold mb-3 dark:text-white transition-colors">Unique</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">One-of-a-kind pieces that you won&apos;t find anywhere else.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-20 bg-lust-dark text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-6">Stay in the Loop</h2>
                    <p className="mb-8 text-gray-300">Subscribe for exclusive drops, style tips, and sustainable fashion news.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-lust-red flex-grow"
                        />
                        <button className="px-8 py-3 bg-lust-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Home;
