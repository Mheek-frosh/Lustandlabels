import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FlashDeals from '../components/FlashDeals';
import CategoryGrid from '../components/CategoryGrid';
import ProductSection from '../components/ProductSection';
import SpecialOfferBanner from '../components/SpecialOfferBanner';
import { products } from '../data/products';
import {
    getFeaturedProducts,
    getProductsByBadge,
    getTopRatedProducts
} from '../utils/productUtils';

const Home = () => {
    // Get different product sets
    const featuredProducts = getFeaturedProducts(products, 8);
    const trendingProducts = getProductsByBadge(products, 'Hot').slice(0, 8);
    const newArrivals = getProductsByBadge(products, 'New').slice(0, 8);
    const topRated = getTopRatedProducts(products, 8);

    return (
        <>
            {/* Hero Banner */}
            <div id="home">
                <HeroBanner />
            </div>

            {/* Flash Deals Section */}
            <div id="flash-deals">
                <FlashDeals />
            </div>

            {/* Category Navigation */}
            <CategoryGrid />

            {/* Featured Products */}
            <ProductSection
                title="Featured Products"
                description="Handpicked favorites with the best ratings and reviews"
                products={featuredProducts}
                viewAllLink="/shop"
                bgColor="bg-gray-50 dark:bg-gray-950"
            />

            {/* First Special Offer Banner */}
            <SpecialOfferBanner
                title="Student Discount"
                subtitle="Get 15% off with your student ID"
                ctaText="Claim Offer"
                ctaLink="/shop"
                variant="gradient"
            />

            {/* Trending Now */}
            <div id="trending">
                <ProductSection
                    title="Trending Now"
                    description="What's hot right now - most popular items flying off the shelves"
                    products={trendingProducts}
                    viewAllLink="/shop"
                    bgColor="bg-white dark:bg-gray-900"
                />
            </div>

            {/* New Arrivals */}
            <div id="new-arrivals">
                <ProductSection
                    title="New Arrivals"
                    description="Fresh finds just added to our collection"
                    products={newArrivals}
                    viewAllLink="/shop"
                    bgColor="bg-gray-50 dark:bg-gray-950"
                />
            </div>

            {/* Second Special Offer Banner */}
            <SpecialOfferBanner
                title="Free Shipping"
                subtitle="On orders over ₦50,000"
                ctaText="Start Shopping"
                ctaLink="/shop"
                variant="solid"
            />

            {/* Top Rated */}
            <ProductSection
                title="Top Rated"
                description="Highly rated by our community - products you can trust"
                products={topRated}
                viewAllLink="/shop"
                bgColor="bg-white dark:bg-gray-900"
            />

            {/* Vision Section */}
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

            {/* Newsletter Section */}
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

