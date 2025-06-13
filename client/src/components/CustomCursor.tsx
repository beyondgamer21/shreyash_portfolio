import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on the client-side
    if (typeof window === 'undefined') return;
    
    // Check if mobile
    setIsMobile(window.innerWidth <= 768);
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    const handleMouseEnter = () => {
      document.body.classList.add("has-custom-cursor");
    };

    const handleMouseLeave = () => {
      document.body.classList.remove("has-custom-cursor");
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".hover-element")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseover", handleHover);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseover", handleHover);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Don't render on mobile
  if (isMobile) {
    return <div className="grain-overlay" />;
  }

  return (
    <>
      <div 
        className={`cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div 
        className={`cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`
        }}
      />
      <div className="grain-overlay" />
    </>
  );
}
