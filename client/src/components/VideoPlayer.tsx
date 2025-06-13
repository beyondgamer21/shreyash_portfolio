import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl?: string;
  title?: string;
  className?: string;
  onPlayClick?: () => void;
}

export default function VideoPlayer({ 
  thumbnailUrl, 
  videoUrl, 
  title, 
  className = "", 
  onPlayClick 
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!videoUrl) {
      // If no video URL, use as a placeholder and trigger modal
      if (onPlayClick) onPlayClick();
      return;
    }
    
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      className={`video-wrapper relative rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
    >
      <div 
        className="video-placeholder relative hover-element" 
        onClick={togglePlay}
      >
        {!isPlaying && (
          <>
            <img 
              src={thumbnailUrl} 
              alt={title || "Video thumbnail"} 
              className="video-thumbnail w-full h-full object-cover rounded-xl"
            />
            <div className="play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 shadow-lg">
              <Play className="text-white ml-1" size={24} />
            </div>
          </>
        )}
        
        {videoUrl && (
          <video 
            ref={videoRef} 
            className={`w-full h-full object-cover rounded-xl ${!isPlaying ? 'hidden' : ''}`}
            src={videoUrl}
            playsInline
          />
        )}
        
        <div className={`custom-video-controls absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark/90 to-transparent flex items-center transition-opacity duration-300 z-20 ${controlsVisible || isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            className="video-control-button bg-transparent border-none text-white p-1 cursor-pointer transition-all duration-200 hover:text-accent hover:scale-110"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <div 
            ref={progressRef}
            className="video-progress flex-grow h-1.5 mx-4 bg-white/20 rounded overflow-hidden cursor-pointer"
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
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <span className="video-time text-white text-xs ml-2 font-inter">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
