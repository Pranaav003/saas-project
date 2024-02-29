import LandingHero from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import LandingTestimonials from "@/components/landing-testimonials";
import LandingTools from "@/components/landing_tools";

{/* Login and Register page on the landing page */}
//Try to learn how to make an actual login and register page, look at more antonio vids

const LandingPage = () => {
  return (
    <div className = "h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingTestimonials />
      <LandingTools />
    </div>
  );
}

export default LandingPage;