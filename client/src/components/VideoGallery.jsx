import { useState } from "react";
import { Play } from "lucide-react";

function VideoCard({ video }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={video.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-[2rem] overflow-hidden aspect-video bg-[#1a130d] border border-white/5 shadow-2xl block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? (
                <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${video.videoId}`}
                    title="YouTube preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full object-cover pointer-events-none scale-105"
                ></iframe>
            ) : (
                <>
                    {/* Thumbnail Image */}
                    <img
                        src={video.thumbnailUrl}
                        onError={(e) => {
                            // Fallback if maxresdefault isn't available for this video
                            if (e.target.src !== video.fallbackThumbnailUrl) {
                                e.target.src = video.fallbackThumbnailUrl;
                            }
                        }}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out"
                        loading="lazy"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4af37]/90  flex items-center justify-center transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-2" fill="currentColor" />
                        </div>
                    </div>
                </>
            )}

            {/* Border highlight on hover */}
            <div className="absolute inset-0 border-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/50 rounded-[2rem] transition-colors duration-500 pointer-events-none" />
        </a>
    );
}

export default function VideoGallery({ videoLinks }) {
    if (!videoLinks || videoLinks.length === 0) return null;

    // Helper to extract YouTube video ID from various YT URL formats
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videos = videoLinks.map(link => {
        const videoId = getYouTubeId(link);
        return {
            originalUrl: link,
            videoId,
            thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null,
            fallbackThumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
        };
    }).filter(v => v.videoId); // Keep only valid YouTube links

    if (videos.length === 0) return null;

    return (
        <section className="mt-16 sm:mt-24 space-y-8 sm:space-y-12">
            <div className="flex items-center gap-4 sm:gap-6">
                <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight">
                    Video <span className="text-[#d4af37]">Gallery</span>
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {videos.map((video, index) => (
                    <VideoCard key={index} video={video} />
                ))}
            </div>
        </section>
    );
}
