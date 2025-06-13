import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
  description?: string;
  thumbnailUrl: string;
}

export default function VideoModal({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title, 
  description,
  thumbnailUrl
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (typeof window === 'undefined' || !videoRef.current) return;
    
    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (!video) return;
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    const handleLoadedMetadata = () => {
      if (!video) return;
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current || !videoRef.current) return;
    
    const progressBar = progressRef.current;
    const pos = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="modal fixed top-0 left-0 w-full h-full bg-dark/95 flex items-center justify-center z-50 active"
    >
      <div className="modal-content w-[90%] max-w-4xl max-h-[90vh] overflow-auto bg-dark rounded-xl p-8 relative transform translate-y-0 shadow-2xl">
        <button 
          className="modal-close absolute top-5 right-5 bg-transparent border-none text-white hover:text-accent transition-colors duration-300 hover-element" 
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <div className="modal-video w-full rounded-lg overflow-hidden relative">
          {!videoUrl ? (
            <div className="relative w-full pb-[56.25%]">
              <div className="absolute inset-0 bg-dark flex items-center justify-center">
                <img 
                  src={thumbnailUrl} 
                  alt={title || "Video"} 
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-primary text-5xl">
                    <Play size={64} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <video 
                ref={videoRef} 
                className="w-full" 
                src={videoUrl}
                poster={thumbnailUrl}
                onClick={togglePlay}
                playsInline
              />
              
              <div className="video-controls absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark/90 to-transparent flex items-center">
                <button 
                  className="video-control-button bg-transparent border-none text-white p-1 cursor-pointer transition-all duration-200 hover:text-accent hover:scale-110"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div 
                  ref={progressRef}
                  className="video-progress flex-grow h-2 mx-4 bg-white/20 rounded overflow-hidden cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="video-progress-filled bg-accent h-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <button 
                  className="video-control-button bg-transparent border-none text-white p-1 cursor-pointer transition-all duration-200 hover:text-accent hover:scale-110"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                
                <span className="video-time text-white text-sm ml-2 font-inter">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <h3 className="modal-title text-2xl font-bold text-light mt-6 mb-2 font-montserrat">
          {title || "Video Project"}
        </h3>
        
        <p className="text-gray-400 font-inter">
          {description || "Professional video editing with creative transitions and effects."}
        </p>
      </div>
    </div>
  );
}
