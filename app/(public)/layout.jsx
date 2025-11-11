'use client'
import Script from 'next/script' // << GA IMPORT MUST BE AT TOP
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot"; 
import SocialSidebar from "@/components/SocialSidebar"; // Your personalized component

export default function PublicLayout({ children }) {
    // Replace [YOUR_GA_MEASUREMENT_ID] with the ID you get from Google Analytics

    return (
        <>
            {/* GOOGLE ANALYTICS SCRIPT (Place high in the component tree) */}
            <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=[YOUR_GA_MEASUREMENT_ID]`} />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '[YOUR_GA_MEASUREMENT_ID]');
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