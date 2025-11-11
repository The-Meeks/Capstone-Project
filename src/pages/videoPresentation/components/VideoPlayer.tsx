import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { VideoPlayerProps } from '../types';

const VideoPlayer = ({
  video,
  playerState,
  onPlay,
  onPause,
  onSeek,
  onVolumeChange,
  onMute,
  onFullscreen,
  className = ''
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (playerState.isPlaying) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [playerState.isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * playerState.duration;
    
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    onVolumeChange(volume);
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden group ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        src={video.videoUrl}
        poster={video.thumbnail}
        onTimeUpdate={(e) => {
          const target = e.target as HTMLVideoElement;
          onSeek(target.currentTime);
        }}
        onLoadedMetadata={(e) => {
          const target = e.target as HTMLVideoElement;
          onSeek(target.duration);
        }}
      />

      {/* Loading Overlay */}
      {playerState.isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-white">
            <div className="animate-spin">
              <Icon name="Loader2" size={24} />
            </div>
            <span className="text-sm font-medium">Loading video...</span>
          </div>
        </div>
      )}

      {/* Play/Pause Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={playerState.isPlaying ? onPause : onPlay}
          className="w-16 h-16 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
        >
          <Icon name={playerState.isPlaying ? 'Pause' : 'Play'} size={32} />
        </Button>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="w-full h-1 bg-white/20 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-100"
              style={{ width: `${(playerState.currentTime / playerState.duration) * 100}%` }}
            />
            {/* Buffer Bar */}
            <div
              className="absolute h-full bg-white/30 rounded-full"
              style={{ width: `${playerState.buffered}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={playerState.isPlaying ? onPause : onPlay}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name={playerState.isPlaying ? 'Pause' : 'Play'} size={16} />
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMute}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Icon 
                  name={playerState.isMuted ? 'VolumeX' : playerState.volume > 0.5 ? 'Volume2' : 'Volume1'} 
                  size={16} 
                />
              </Button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={playerState.isMuted ? 0 : playerState.volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="text-white text-sm font-mono">
              {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-white text-xs bg-black/50 px-2 py-1 rounded">
              {video.category.toUpperCase()}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onFullscreen}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Icon name="Maximize" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Info Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 max-w-md">
          <h3 className="text-white font-medium text-sm mb-1">{video.title}</h3>
          <p className="text-white/80 text-xs">{video.topic}</p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={12} className="text-white/60" />
              <span className="text-white/60 text-xs">{video.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} className="text-white/60" />
              <span className="text-white/60 text-xs">{formatTime(video.duration)}</span>
            </div>
          </div>
        </div>

        {video.isNew && (
          <div className="bg-accent text-white px-2 py-1 rounded text-xs font-medium">
            NEW
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;