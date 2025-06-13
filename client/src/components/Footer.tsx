import { Link } from "wouter";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-dark py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold font-montserrat hover-element">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Shrayash</span>
              <span className="text-accent">_editz</span>
            </Link>
            <p className="text-gray-400 mt-2">Creating visual stories that captivate.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="text-light hover:text-accent transition-colors duration-300 hover-element"
                onClick={(e) => scrollToSection(link.href, e)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Shrayash_editz. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">Designed with passion and creativity</p>
        </div>
      </div>
    </footer>
  );
}
