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
                // SPOT 1: New ID G-0X8XP0RXJL inserted here
                src={`https://www.googletagmanager.com/gtag/js?id=G-0X8XP0RXJL`} /> 
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    // SPOT 2: New ID G-0X8XP0RXJL inserted here
                    gtag('config', 'G-0X8XP0RXJL'); 
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
