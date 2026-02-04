import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Clock, MessageCircle, ArrowRight, ShieldCheck, AlertCircle, Home, RefreshCw } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    // Consuming correct values from CartContext
    const { cartItems, totalPrice, clearCart } = useCart();

    // Fallback if cartItems is undefined (shouldn't happen if Context is correct, but safe)
    const items = cartItems || [];

    const [step, setStep] = useState('review'); // 'review' or 'payment'
    const [countdown, setCountdown] = useState(60);
    const [copied, setCopied] = useState(false);

    // Bank account details 
    const bankDetails = {
        bankName: "OPAY",
        accountName: "DANIEL DUNG",
        accountNumber: "9032239458",
        whatsappNumber: "2347054885172"
    };

    const shippingFee = 2000;
    // totalPrice is a number, so we use it directly
    const grandTotal = (totalPrice || 0) + shippingFee;

    // Countdown timer logic
    useEffect(() => {
        let timer;
        if (step === 'payment' && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown, step]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleProceedToPayment = () => {
        setStep('payment');
        setCountdown(60); // Reset countdown
    };

    const handleRetry = () => {
        setCountdown(60);
    };

    const handlePaymentConfirmation = () => {
        // Construct detailed message
        let itemsList = items.map(item =>
            `*${item.title}*
Qty: ${item.quantity} | Size: ${item.size || 'N/A'}
Price: ₦${(item.price * item.quantity).toLocaleString()}
${item.originalImage || item.image}`
        ).join('\n\n');

        const message = `*ORDER INQUIRY* 🛒
       
I am interested in these items:

${itemsList}

*Total Amount:* ₦${grandTotal.toLocaleString()} (w/ shipping)

------------------

*Question:* 
Is this order available? Should I proceed to pay *₦${grandTotal.toLocaleString()}* to *${bankDetails.bankName} - ${bankDetails.accountNumber}*?

*Reference:* #${Math.floor(Math.random() * 100000)}
*Status:* Awaiting your confirmation ⏳`;

        // 1. Open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${bankDetails.whatsappNumber}?text=${encodedMessage}`, '_blank');

        // 2. Redirect Home (No success screen)
        // We'll reset the cart and navigate home to avoid "hanging" state
        if (clearCart) clearCart();
        navigate('/');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold mb-2 dark:text-white">Your bag is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className="px-8 py-3 bg-lust-red text-white font-bold rounded-full hover:bg-red-700 transition-colors w-full"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-24 px-4 transition-colors">
            <div className="max-w-6xl mx-auto">
                {/* Progress Indicators */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 ${step === 'review' ? 'text-lust-red font-bold' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'review' ? 'border-lust-red bg-lust-red text-white' : 'border-gray-300'}`}>1</div>
                            <span>Review</span>
                        </div>
                        <div className={`w-12 h-1 bg-gray-200 dark:bg-gray-800 rounded-full`}>
                            <div className={`h-full bg-lust-red rounded-full transition-all duration-300 ${step === 'payment' ? 'w-full' : 'w-0'}`}></div>
                        </div>
                        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-lust-red font-bold' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'payment' ? 'border-lust-red bg-lust-red text-white' : 'border-gray-300'}`}>2</div>
                            <span>Payment</span>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'review' ? (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
                        >
                            <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800">
                                <h1 className="text-2xl font-bold font-heading mb-2">Review Your Order</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Please check your items before proceeding to payment.</p>
                            </div>

                            <div className="p-6 sm:p-8">
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 sm:gap-6 items-center">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                                        {item.size && <p className="text-sm text-gray-500 dark:text-gray-400">Size: {item.size}</p>}
                                                    </div>
                                                    <p className="font-bold text-lust-gold">₦{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8">
                                <div className="flex flex-col gap-3 max-w-sm ml-auto">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span>₦{(totalPrice || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Shipping</span>
                                        <span>₦{shippingFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-lust-dark dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3 mt-1">
                                        <span>Total</span>
                                        <span className="text-lust-red">₦{grandTotal.toLocaleString()}</span>
                                    </div>

                                    <button
                                        onClick={handleProceedToPayment}
                                        className="mt-6 w-full bg-lust-dark dark:bg-white text-white dark:text-lust-dark py-4 rounded-full font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
                                    >
                                        Proceed to Payment
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden max-w-3xl mx-auto"
                        >
                            <div className={`p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 ${countdown === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-lust-red/5'}`}>
                                <div className="flex flex-col items-center text-center">
                                    {countdown === 0 ? (
                                        <div className="mb-4">
                                            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto">
                                                <AlertCircle size={32} className="text-gray-500" />
                                            </div>
                                            <h2 className="text-2xl font-bold font-heading mb-2 mt-4 text-gray-500">Timer Expired</h2>
                                            <p className="text-gray-500 mb-4">The payment window has closed.</p>
                                            <button
                                                onClick={handleRetry}
                                                className="flex items-center gap-2 mx-auto text-lust-red font-bold hover:underline"
                                            >
                                                <RefreshCw size={16} /> Restart Timer
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="mb-4 relative">
                                                <div className="w-20 h-20 rounded-full border-4 border-lust-red flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-lust-red font-heading">{countdown}s</span>
                                                </div>
                                                <div className="absolute top-0 right-0 animate-ping w-3 h-3 bg-red-500 rounded-full"></div>
                                            </div>
                                            <h2 className="text-2xl font-bold font-heading mb-2">Complete Payment</h2>
                                            <p className="text-gray-600 dark:text-gray-400 max-w-md"> Please make a transfer of <span className="font-bold text-lust-dark dark:text-white">₦{grandTotal.toLocaleString()}</span> to the account below before the timer runs out.</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={`p-6 sm:p-8 transition-opacity duration-300 ${countdown === 0 ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-lust-gold text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        VERIFIED ACCOUNT
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Bank Name</label>
                                            <div className="text-lg font-bold text-gray-800 dark:text-white">{bankDetails.bankName}</div>
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Account Number</label>
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl font-mono font-bold text-lust-dark dark:text-white tracking-widest">{bankDetails.accountNumber}</div>
                                                <button
                                                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                                                    className="p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 shadow-sm"
                                                    title="Copy account number"
                                                >
                                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-500 dark:text-gray-300" />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Account Name</label>
                                            <div className="text-lg font-medium text-gray-800 dark:text-white">{bankDetails.accountName}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handlePaymentConfirmation}
                                        disabled={countdown === 0}
                                        className="w-full bg-green-600 text-white py-4 rounded-full font-bold uppercase tracking-wider hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 disabled:bg-gray-400 disabled:shadow-none"
                                    >
                                        <MessageCircle size={20} />
                                        Continue to pay on WhatsApp
                                    </button>

                                    <button
                                        onClick={() => setStep('review')}
                                        className="w-full bg-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white py-2 font-medium text-sm transition-colors"
                                    >
                                        Cancel and go back
                                    </button>
                                </div>
                            </div>

                            <div className="px-6 pb-6 text-center">
                                <div className="inline-flex items-center gap-2 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
                                    <ShieldCheck size={14} />
                                    <span>Secure Payment • Instant Confirmation</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Checkout;
