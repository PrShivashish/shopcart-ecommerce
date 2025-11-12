'use client'
import Script from 'next/script' // << GA IMPORT MUST BE AT TOP
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot"; 
import SocialSidebar from "@/components/SocialSidebar"; // Your personalized component

export default function PublicLayout({ children }) {

    return (
        <>
            {/* GOOGLE ANALYTICS SCRIPT (Place high in the component tree) */}
            <Script strategy="afterInteractive" 
                // FIX 1: REMOVED SQUARE BRACKETS from URL
                src={`https://www.googletagmanager.com/gtag/js?id=G-3XGW5CT9W9`} /> 
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    // FIX 2: REMOVED SQUARE BRACKETS from gtag config
                    gtag('config', 'G-3XGW5CT9W9'); 
                `}
            </Script>
            {/* END GOOGLE ANALYTICS */}

            <Banner />
            <Navbar />
            {children}
            <Footer />
            <AIChatbot /> 
            <SocialSidebar /> 
        </>
    );
}
