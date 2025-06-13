import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/sections/HeroSection';
import PortfolioSection from '@/sections/PortfolioSection';
import ServicesSection from '@/sections/ServicesSection';
import AboutSection from '@/sections/AboutSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/components/Footer';
import VideoModal from '@/components/VideoModal';
import { motion } from 'framer-motion';

interface VideoInfo {
  thumbnailUrl: string;
  videoUrl?: string;
  title: string;
  description: string;
}

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const openVideoModal = (video: VideoInfo) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  // When loading, show a loading animation
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-dark">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold font-montserrat"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Shrayash
          </span>
          <span className="text-accent">_editz</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-light">
      <Navbar />
      
      <HeroSection onVideoClick={() => openVideoModal({
        thumbnailUrl: "https://images.unsplash.com/photo-1601506521937-0b5a0f4e9791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        title: "Showreel 2023",
        description: "A collection of my best work from various projects completed in 2023. This reel showcases my skills in editing, visual effects, and color grading."
      })} />
      
      <PortfolioSection onVideoClick={openVideoModal} />
      
      <ServicesSection />
      
      <AboutSection />
      
      <TestimonialsSection />
      
      <ContactSection />
      
      <Footer />
      
      {selectedVideo && (
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          thumbnailUrl={selectedVideo.thumbnailUrl}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
          description={selectedVideo.description}
        />
      )}
    </div>
  );
}
