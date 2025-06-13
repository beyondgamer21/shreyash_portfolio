import { motion } from 'framer-motion';
import { Film, Wand2, Palette, Music, Video, Scissors } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServicesSection() {
  const services: Service[] = [
    {
      id: 1,
      icon: <Film className="w-8 h-8 mb-4" />,
      title: "Video Editing",
      description: "Professional editing for any type of video content with clean cuts, transitions, and perfect timing."
    },
    {
      id: 2,
      icon: <Wand2 className="w-8 h-8 mb-4" />,
      title: "Visual Effects",
      description: "Enhance your footage with stunning visual effects, motion graphics, and creative overlays."
    },
    {
      id: 3,
      icon: <Palette className="w-8 h-8 mb-4" />,
      title: "Color Grading",
      description: "Transform the look and feel of your videos with professional color correction and stylized grading."
    },
    {
      id: 4,
      icon: <Music className="w-8 h-8 mb-4" />,
      title: "Audio Editing",
      description: "Audio cleanup, music selection, sound effects, and mixing to create the perfect soundscape."
    },
    {
      id: 5,
      icon: <Video className="w-8 h-8 mb-4" />,
      title: "Motion Graphics",
      description: "Custom animated elements, titles, and graphics that bring your videos to life."
    },
    {
      id: 6,
      icon: <Scissors className="w-8 h-8 mb-4" />,
      title: "Montage Creation",
      description: "Compelling highlight reels and montages that capture the best moments with perfect pacing."
    }
  ];

  const titleRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section id="services" className="section pt-20">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="text-center mb-16 reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional video editing services tailored to your specific needs. From basic cuts to advanced visual effects, I deliver high-quality results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const serviceRef = useScrollReveal<HTMLDivElement>({
              threshold: 0.1,
            });
            
            return (
              <motion.div
                key={service.id}
                ref={serviceRef}
                className="service-card bg-dark/50 rounded-xl p-8 transition-all duration-300 border border-primary/10 h-full reveal hover-element"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(108, 47, 246, 0.3)"
                }}
              >
                <div className="service-icon bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-montserrat">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
