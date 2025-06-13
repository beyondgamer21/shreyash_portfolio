import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Testimonial {
  id: number;
  text: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Shrayash transformed our raw footage into an incredible brand video. The editing was seamless, the pacing perfect, and the visual effects subtle yet impactful. Highly recommended!",
      author: {
        name: "Alex Johnson",
        role: "Marketing Director",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    },
    {
      id: 2,
      text: "Working with Shrayash was a fantastic experience. He understood our vision immediately and delivered a final edit that exceeded our expectations. The color grading gave our product video a premium feel.",
      author: {
        name: "Sarah Williams",
        role: "Product Manager",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      },
    },
    {
      id: 3,
      text: "I needed a quick turnaround on a social media campaign, and Shrayash delivered on time without sacrificing quality. The edits were creative, engaging, and perfectly suited for our target audience.",
      author: {
        name: "Michael Chen",
        role: "Social Media Manager",
        avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    },
  ];

  const titleRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section className="section pt-20">
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
            What Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what some of my
            clients have to say about working with me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const testimonialRef = useScrollReveal<HTMLDivElement>({
              threshold: 0.1,
            });

            return (
              <motion.div
                key={testimonial.id}
                ref={testimonialRef}
                className="testimonial-card bg-dark/50 rounded-xl p-8 relative border border-primary/10 reveal hover-element"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(108, 47, 246, 0.2)",
                }}
              >
                <p className="testimonial-text text-gray-300 mb-6 relative z-10 italic pl-6">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="testimonial-author flex items-center">
                  <img
                    src={testimonial.author.avatarUrl}
                    alt={testimonial.author.name}
                    className="testimonial-avatar w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-light">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-sm text-accent">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
