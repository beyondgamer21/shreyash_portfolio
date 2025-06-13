import { motion } from "framer-motion";
import ThreeScene from "@/components/ThreeScene";
import VideoPlayer from "@/components/VideoPlayer";

interface HeroSectionProps {
  onVideoClick: () => void;
}

export default function HeroSection({ onVideoClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="section flex items-center min-h-screen relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title font-montserrat font-extrabold text-light">
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Creative
              </span>
              Video Editing
            </h1>
            <p className="hero-subtitle text-gray-300 mb-8">
              Transforming ordinary footage into extraordinary visual stories. I
              bring your vision to life with professional editing, effects, and
              color grading.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portfolio"
                className="btn-primary hover-element"
                onClick={(e) => {
                  e.preventDefault();
                  const portfolioSection = document.querySelector("#portfolio");
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="border border-primary text-primary hover:text-accent hover:border-accent py-4 px-8 rounded-full transition-all duration-300 font-semibold uppercase tracking-wide hover-element"
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.querySelector("#contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <VideoPlayer
              thumbnailUrl="/thumbnails/final-night-thumb.jpg"
              videoUrl="/videos/final night.mp4"
              title="preview"
              className="reveal active"
              onPlayClick={onVideoClick}
            />
          </motion.div>
        </div>
      </div>

      {/* 3D Background Elements */}
      <ThreeScene className="absolute top-0 left-0 w-full h-full z-0" />
    </section>
  );
}
