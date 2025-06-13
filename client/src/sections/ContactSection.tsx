import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Globe,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const titleRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
  });

  const formRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
  });

  const infoRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "success",
      });
      form.reset();
      setSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setSubmitting(false);
    },
  });

  function onSubmit(values: ContactFormValues) {
    setSubmitting(true);
    mutate(values);
  }

  const contactInfo = [
    {
      icon: <Mail className="text-primary" />,
      title: "Email",
      value: "kaleshreyash940@gmail.com",
      color: "primary",
    },
    {
      icon: <Phone className="text-secondary" />,
      title: "Phone",
      value: "+91 9823251416",
      color: "secondary",
    },
    {
      icon: <MapPin className="text-accent" />,
      title: "Location",
      value: "Nashik, Maharashtra",
      color: "accent",
    },
  ];

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/shrayash_editz_/",
      label: "Instagram",
    },
    {
      icon: <Youtube size={20} />,
      href: "https://www.youtube.com/@Shrayash_editz/",
      label: "YouTube",
    },
    {
      icon: <Globe size={20} />,
      href: "https://your-portfolio.com",
      label: "Portfolio",
    },
  ];

  return (
    <section id="contact" className="section pt-20">
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
            Get In Touch
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to bring your vision to life? Contact me to discuss your
            project and how we can work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            ref={formRef}
            className="contact-form-wrapper bg-dark/50 rounded-xl p-8 border border-primary/10 reveal"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-light">Your Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="form-control bg-dark/30 border-primary/20 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-light">Your Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          className="form-control bg-dark/30 border-primary/20 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-light">Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project Inquiry"
                          className="form-control bg-dark/30 border-primary/20 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-light">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project..."
                          rows={5}
                          className="form-control bg-dark/30 border-primary/20 text-white placeholder:text-white/50 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="btn-primary w-full hover-element"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            ref={infoRef}
            className="flex flex-col justify-center reveal"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 font-montserrat">
                Contact Information
              </h3>
              <p className="text-gray-400 mb-6">
                Feel free to reach out through any of these channels. I
                typically respond within 24 hours.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center hover-element"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-${item.color} bg-opacity-20 flex items-center justify-center mr-4`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-light">{item.title}</h4>
                      <p className="text-accent">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 font-montserrat">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="w-12 h-12 rounded-full bg-dark flex items-center justify-center hover:bg-primary transition-colors duration-300 hover-element"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
