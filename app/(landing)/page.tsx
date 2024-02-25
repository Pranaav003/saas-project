import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

{/* Login and Register page on the landing page */}
//Try to learn how to make an actual login and register page, look at more antonio vids

const LandingPage = () => {
  return (
    <div className = "h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
}

export default LandingPage;