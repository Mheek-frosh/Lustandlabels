// Utility functions for product filtering and sorting

/**
 * Get products by category
 * @param {Array} products - Array of all products
 * @param {string} category - Category name to filter by
 * @returns {Array} Filtered products
 */
export const getProductsByCategory = (products, category) => {
    return products.filter(product => product.category === category);
};

/**
 * Get products by badge type
 * @param {Array} products - Array of all products
 * @param {string} badge - Badge type (e.g., "Hot", "New", "Sale")
 * @returns {Array} Filtered products
 */
export const getProductsByBadge = (products, badge) => {
    return products.filter(product => product.badge === badge);
};

/**
 * Get top rated products
 * @param {Array} products - Array of all products
 * @param {number} count - Number of products to return
 * @returns {Array} Top rated products
 */
export const getTopRatedProducts = (products, count = 8) => {
    return [...products]
        .sort((a, b) => {
            // Sort by rating first, then by review count
            if (b.rating !== a.rating) {
                return b.rating - a.rating;
            }
            return b.reviews - a.reviews;
        })
        .slice(0, count);
};

/**
 * Get flash deal products (highest discounts)
 * @param {Array} products - Array of all products
 * @param {number} count - Number of products to return
 * @returns {Array} Products with highest discounts
 */
export const getFlashDeals = (products, count = 8) => {
    return products
        .filter(product => product.originalPrice)
        .map(product => ({
            ...product,
            discountPercentage: calculateDiscount(product.originalPrice, product.price)
        }))
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, count);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Get product count by category
 * @param {Array} products - Array of all products
 * @param {string} category - Category name
 * @returns {number} Product count
 */
export const getCategoryProductCount = (products, category) => {
    return products.filter(product => product.category === category).length;
};

/**
 * Get all unique categories with product counts
 * @param {Array} products - Array of all products
 * @returns {Array} Array of category objects with name and count
 */
export const getCategories = (products) => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.map(category => ({
        name: category,
        count: getCategoryProductCount(products, category)
    }));
};

/**
 * Get featured products (high ratings and popular)
 * @param {Array} products - Array of all products
 * @param {number} count - Number of products to return
 * @returns {Array} Featured products
 */
export const getFeaturedProducts = (products, count = 8) => {
    return [...products]
        .filter(product => product.rating >= 4.5 && product.reviews >= 100)
        .sort((a, b) => {
            // Calculate popularity score
            const scoreA = a.rating * Math.log(a.reviews);
            const scoreB = b.rating * Math.log(b.reviews);
            return scoreB - scoreA;
        })
        .slice(0, count);
};
