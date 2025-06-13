import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface PortfolioItem {
  id: number;
  thumbnailUrl: string;
  title: string;
  category: string;
  videoUrl?: string;
  embedUrl?: string;
  description: string;
}

interface PortfolioSectionProps {
  onVideoClick: (video: {
    thumbnailUrl: string;
    videoUrl?: string;
    title: string;
    description: string;
  }) => void;
}

export default function PortfolioSection({
  onVideoClick,
}: PortfolioSectionProps) {
  const featuredVideoRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      thumbnailUrl: "/thumbnails/final-night-thumb.jpg",
      videoUrl: "/videos/final night.mp4",
      title: "creative motions",
      category: "Music lyrical Edit",
      description:
        "A captivating music video edit with dynamic effects and transitions sync with lyrics.",
    },
    {
      id: 2,
      thumbnailUrl: "/thumbnails/thousand-more-thumb.jpg",
      videoUrl:
        "https://www.dropbox.com/scl/fi/8opn2uk1b7di9lkb7v37i/thousand_more.mp4?raw=1",
      title: "Motion Graphics",
      category: "Music Video",
      description:
        "An vedio edit styled with the motion graphics era with various syncable elements with a creative workflow.",
    },
    {
      id: 3,
      thumbnailUrl: "/thumbnails/reels.jpg",
      title: "social media Edits",
      category: "Social Media Edit",
      description:
        "Dynamic social media edit showcasing creative transitions and engaging content.",
      embedUrl: "https://www.instagram.com/reel/DBy1Vr5Cb7H/embed",
    },
  ];

  return (
    <section id="portfolio" className="section bg-dark pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my best video editing work. Each project tells a
            unique story through creative editing techniques, visual effects,
            and color grading.
          </p>
        </motion.div>

        <div ref={featuredVideoRef} className="reveal">
          <VideoPlayer
            thumbnailUrl="/thumbnails/final-night-thumb.jpg"
            videoUrl="/videos/final night.mp4"
            title="Featured Project"
            onPlayClick={() =>
              onVideoClick({
                thumbnailUrl: "/d7d5352515af4009eb98cf2cbb4c2fc0.jpg",
                videoUrl: "/videos/final night.mp4",
                title: "Final Night",
                description:
                  "A captivating music video edit with dynamic effects and transitions.",
              })
            }
          />
        </div>

        <div className="portfolio-grid mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => {
            const itemRef = useScrollReveal<HTMLDivElement>({
              threshold: 0.1,
            });

            return (
              <div
                key={item.id}
                ref={itemRef}
                className="portfolio-item relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl reveal hover-element"
                onClick={() => {
                  if (item.embedUrl) {
                    window.open(
                      item.embedUrl,
                      "_blank",
                      "width=500,height=800",
                    );
                  } else {
                    onVideoClick({
                      thumbnailUrl: item.thumbnailUrl,
                      videoUrl: item.videoUrl,
                      title: item.title,
                      description: item.description,
                    });
                  }
                }}
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="portfolio-image w-full h-64 object-cover"
                />
                <div className="portfolio-overlay absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-dark/90 to-dark/0 transform translate-y-4 opacity-0 transition-all duration-300">
                  <h3 className="portfolio-title text-xl font-semibold mb-1 text-white font-montserrat">
                    {item.title}
                  </h3>
                  <p className="portfolio-category text-accent text-sm">
                    {item.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="btn-primary hover-element"
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
            Request Custom Project
          </a>
        </div>
      </div>
    </section>
  );
}
