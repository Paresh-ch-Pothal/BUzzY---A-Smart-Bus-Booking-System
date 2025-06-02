// import React, { useEffect, useState } from 'react';
// import { CheckCircle, XCircle, Loader2, CreditCard } from 'lucide-react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';

// // This is your exact component structure with enhanced UI
// const PaymentCallback = () => {
//     // Simulate your existing logic structure
//     const [status, setStatus] = useState('Verifying payment...');

//     // Your existing variables would go here
//     const [searchParams] = useSearchParams();
//     const orderId = searchParams.get('order_id');
//     const host = import.meta.env.VITE_API_BASE_URL;
//     const [authCookie, setAuthCookie, removeAuthCookie] = useCookies(["authtoken"])
//     const token = authCookie.authtoken

//     // Simulate order ID for demo

//     // Your exact useEffect logic would remain here
//     useEffect(() => {
//         const verifyPayment = async () => {
//             // Don't verify if already verified
//             const alreadyVerified = sessionStorage.getItem(`verified_${orderId}`);
//             if (alreadyVerified) return;
//             console.log(orderId)

//             try {
//                 const { data } = await axios.post(`${host}/api/payment/verify`, { orderId }, {
//                     headers: {
//                         "authtoken": token
//                     }
//                 });

//                 if (data.success) {
//                     setStatus('Payment successful! Thank you.');

//                     // Store this orderId as verified
//                     sessionStorage.setItem(`verified_${orderId}`, "true");
//                 } else {
//                     setStatus('Payment failed or not verified.');
//                 }
//             } catch (error) {
//                 setStatus('Error verifying payment.');
//                 console.error(error);
//             }
//         };

//         if (orderId && token) {
//             verifyPayment();
//         }
//     }, [orderId, token]);


//     const getStatusIcon = () => {
//         if (status === 'Verifying payment...') {
//             return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
//         } else if (status === 'Payment successful! Thank you.') {
//             return <CheckCircle className="w-16 h-16 text-green-500" />;
//         } else {
//             return <XCircle className="w-16 h-16 text-red-500" />;
//         }
//     };

//     const getStatusColor = () => {
//         if (status === 'Verifying payment...') {
//             return 'text-blue-600';
//         } else if (status === 'Payment successful! Thank you.') {
//             return 'text-green-600';
//         } else {
//             return 'text-red-600';
//         }
//     };

//     const getBackgroundGradient = () => {
//         if (status === 'Verifying payment...') {
//             return 'from-blue-50 to-indigo-100';
//         } else if (status === 'Payment successful! Thank you.') {
//             return 'from-green-50 to-emerald-100';
//         } else {
//             return 'from-red-50 to-pink-100';
//         }
//     };

//     return (
//         <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} flex items-center justify-center p-4`}>
//             <div className="max-w-md w-full">
//                 {/* Main Card */}
//                 <div className="bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
//                     {/* Decorative Background Pattern */}
//                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>

//                     {/* Header Icon */}
//                     <div className="mb-6">
//                         <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
//                             <CreditCard className="w-10 h-10 text-gray-600" />
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Verification</h2>
//                         {orderId && (
//                             <p className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full inline-block">
//                                 Order: {orderId}
//                             </p>
//                         )}
//                     </div>

//                     {/* Status Icon */}
//                     <div className="flex justify-center mb-6">
//                         {getStatusIcon()}
//                     </div>

//                     {/* Status Message */}
//                     <div className="mb-8">
//                         <h3 className={`text-xl font-semibold ${getStatusColor()} mb-2`}>
//                             {status}
//                         </h3>

//                         {status === 'Verifying payment...' && (
//                             <p className="text-gray-600 text-sm">
//                                 Please wait while we confirm your payment details...
//                             </p>
//                         )}

//                         {status === 'Payment successful! Thank you.' && (
//                             <div className="space-y-2">
//                                 <p className="text-gray-600 text-sm">
//                                     Your payment has been processed successfully.
//                                 </p>
//                                 <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
//                                     <p className="text-green-800 text-sm font-medium">
//                                         🎉 Transaction completed successfully!
//                                     </p>
//                                 </div>
//                             </div>
//                         )}

//                         {status !== 'Verifying payment...' && status !== 'Payment successful! Thank you.' && (
//                             <div className="space-y-2">
//                                 <p className="text-gray-600 text-sm">
//                                     We encountered an issue processing your payment.
//                                 </p>
//                                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
//                                     <p className="text-red-800 text-sm font-medium">
//                                         ⚠️ Please contact support if you need assistance.
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Progress Bar for Loading State */}
//                     {status === 'Verifying payment...' && (
//                         <div className="mb-6">
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                                 <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="space-y-3">
//                         {status === 'Payment successful! Thank you.' && (
//                             <button className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
//                                 Go To User DashBoard
//                             </button>
//                         )}

//                         {status !== 'Verifying payment...' && status !== 'Payment successful! Thank you.' && (
//                             <div className="space-y-2">
//                                 <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
//                                     Try Again
//                                 </button>
//                                 <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
//                                     Contact Support
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="text-center mt-6">
//                     <p className="text-gray-500 text-sm">
//                         Secure payment processing • SSL encrypted
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentCallback;



import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, XCircle, Loader2, CreditCard } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const PaymentCallback = () => {
    const [status, setStatus] = useState('Verifying payment...');
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const host = import.meta.env.VITE_API_BASE_URL;
    const [authCookie] = useCookies(["authtoken"]);
    const token = authCookie.authtoken;

    const hasVerified = useRef(false); // 🚫 Avoid multiple verifications

    useEffect(() => {
        const verifyPayment = async () => {
            if (!orderId || !token || hasVerified.current) return;
            hasVerified.current = true;

            try {
                console.log("Verifying order:", orderId);
                const { data } = await axios.post(`${host}/api/payment/verify`, { orderId }, {
                    headers: { authtoken: token }
                });

                if (data.success) {
                    setStatus('Payment successful! Thank you.');
                } else {
                    setStatus('Payment failed or not verified.');
                }
            } catch (error) {
                setStatus('Error verifying payment.');
                console.error(error);
            }
        };

        verifyPayment();
    }, [orderId, token]);

    const getStatusIcon = () => {
        if (status === 'Verifying payment...') {
            return <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />;
        } else if (status === 'Payment successful! Thank you.') {
            return <CheckCircle className="w-16 h-16 text-green-500" />;
        } else {
            return <XCircle className="w-16 h-16 text-red-500" />;
        }
    };

    const getStatusColor = () => {
        if (status === 'Verifying payment...') return 'text-blue-600';
        if (status === 'Payment successful! Thank you.') return 'text-green-600';
        return 'text-red-600';
    };

    const getBackgroundGradient = () => {
        if (status === 'Verifying payment...') return 'from-blue-50 to-indigo-100';
        if (status === 'Payment successful! Thank you.') return 'from-green-50 to-emerald-100';
        return 'from-red-50 to-pink-100';
    };

    const navigate = useNavigate()
    const handleMyBookings = () =>{
        navigate("/mybookings")
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} flex items-center justify-center p-4`}>
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>

                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                            <CreditCard className="w-10 h-10 text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Verification</h2>
                        {orderId && (
                            <p className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full inline-block">
                                Order: {orderId}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-center mb-6">
                        {getStatusIcon()}
                    </div>

                    <div className="mb-8">
                        <h3 className={`text-xl font-semibold ${getStatusColor()} mb-2`}>
                            {status}
                        </h3>

                        {status === 'Verifying payment...' && (
                            <p className="text-gray-600 text-sm">
                                Please wait while we confirm your payment details...
                            </p>
                        )}

                        {status === 'Payment successful! Thank you.' && (
                            <div className="space-y-2">
                                <p className="text-gray-600 text-sm">
                                    Your payment has been processed successfully.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                                    <p className="text-green-800 text-sm font-medium">
                                        🎉 Transaction completed successfully!
                                    </p>
                                </div>
                            </div>
                        )}

                        {status !== 'Verifying payment...' && status !== 'Payment successful! Thank you.' && (
                            <div className="space-y-2">
                                <p className="text-gray-600 text-sm">
                                    We encountered an issue processing your payment.
                                </p>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                                    <p className="text-red-800 text-sm font-medium">
                                        ⚠️ Please contact support if you need assistance.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {status === 'Verifying payment...' && (
                        <div className="mb-6">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {status === 'Payment successful! Thank you.' && (
                            <button onClick={handleMyBookings} className="cursor-pointer w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                                Go To User DashBoard
                            </button>
                        )}

                        {status !== 'Verifying payment...' && status !== 'Payment successful! Thank you.' && (
                            <div className="space-y-2">
                                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                                    Try Again
                                </button>
                                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                                    Contact Support
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        Secure payment processing • SSL encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCallback;
