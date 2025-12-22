import Hero from "../components/Hero";
import AboutSAGY from "../components/AboutSAGY";
import InfoCards from "../components/InfoCards";
import RecentUpdates from "../components/RecentUpdates";
import FeaturedProjects from "../components/FeaturedProjects";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <Hero />

      {/* RECENT UPDATES */}
      <RecentUpdates />

      {/* WHAT IS SAGY */}
      <AboutSAGY />

      {/* FEATURED ONGOING PROJECTS */}
      <FeaturedProjects />

      {/* FEATURES / CARDS */}
      <InfoCards />

    </div>
  );
}
