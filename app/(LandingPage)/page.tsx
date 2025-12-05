import Header from "./_Components/Header";
import HeroSection from "./_Components/HeroSection";
import BuilderSection from "./_Components/BuilderSection";
import InvestorSection from "./_Components/InvestorSection";
import WhyChooseUsSection from "./_Components/WhyChooseUsSection";
import Footer from "./_Components/Footer";

export default function LandingPage(): React.ReactElement {
    return (
        <>
            <a href="#hero" className="skip-to-content">
                Skip to main content
            </a>
            <Header />
            <main>
                <HeroSection />
                <BuilderSection />
                <WhyChooseUsSection />
                <InvestorSection />
            </main>
            <Footer />
        </>
    );
}
