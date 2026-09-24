import { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { PageHero, FadeUp } from "./Motion";
import { fetchGallery } from "../services/api";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Helper function to extract YouTube video ID (memoized outside component)
const getYouTubeVideoId = (url) => {
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    videoId = match[2];
  }
  return videoId;
};

// Optimized ReelCard Component with Memoization
const ReelCard = memo(({ reel, isPlaying, onPlay }) => {
  const videoId = useMemo(() => getYouTubeVideoId(reel.url), [reel.url]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div
      className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[9/16] bg-slate-900/40  cursor-pointer"
      onClick={() => !isPlaying && onPlay()}
    >
      {isPlaying && videoId ? (
        <div className="w-full h-full bg-black relative">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-10">
              <div className="w-10 h-10 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1`}
            title={reel.title || "Video Reel"}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIframeLoaded(true)}
          ></iframe>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
            </div>
          )}

          {videoId && (
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={reel.title || "Video Reel"}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'} brightness-[1.05] contrast-[1.05]`}
              loading="lazy"
            />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/5 group-hover:bg-black/0 transition-colors">
            <div className="w-16 h-16 bg-pink-600/90 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(236,72,153,0.6)] transform group-hover:scale-125 transition-all duration-500 border-2 border-white/20">
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-100 z-20"></div>

        </div>
      )}
    </div>
  );
});

export default function MediaGallery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('photos');
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    const domains = ['https://www.youtube.com', 'https://img.youtube.com', 'https://www.google.com'];
    const links = domains.map(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
      return link;
    });
    return () => links.forEach(link => document.head.removeChild(link));
  }, []);

  const [reels, setReels] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchGallery().then(data => {
      if (data) {
        if (data.reels) setReels(data.reels.map(url => ({ url })));
        if (data.videos) setVideos(data.videos.map(url => ({ url })));
        if (data.photos) setPhotos(data.photos);
      }
    }).catch(err => console.error("Failed to fetch dynamic gallery:", err));
  }, []);

  const displayPhotos = useMemo(() =>
    photos.length > 0 && photos.length < 10 ? [...photos, ...photos] : photos
    , [photos]);

  const displayReels = useMemo(() =>
    reels.length > 0 && reels.length < 12 ? [...reels, ...reels, ...reels] : reels
    , [reels]);

  const displayVideos = useMemo(() => {
    const activeVideos = videos.filter(v => v.url);
    return activeVideos.length > 0 && activeVideos.length < 10
      ? [...activeVideos, ...activeVideos]
      : activeVideos;
  }, [videos]);

  const handleReelPlay = useCallback((idx) => {
    setPlayingVideoId(`reel-${idx}`);
  }, []);

  return (
    <>
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeUp className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
            Media Gallery
          </h2>
          <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
          <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Relive the greatest moments from our previous editions through our exclusive photo and video coverage.
          </p>
        </FadeUp>
        <div className="flex justify-center items-center gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => setActiveTab('photos')}
            className={`relative px-6 sm:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 overflow-hidden group ${activeTab === 'photos' ? 'text-white bg-indigo-600/20 border border-indigo-400 shadow-[0_0_20px_rgba(5,150,105,0.3)]' : 'text-slate-400 border border-slate-700 hover:text-white hover:border-indigo-500 bg-indigo-950/50'}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Photos
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('reels'); setPlayingVideoId(null); }}
            className={`relative px-6 sm:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 overflow-hidden group ${activeTab === 'reels' ? 'text-white bg-pink-600/20 border border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'text-slate-400 border border-slate-700 hover:text-white hover:border-indigo-500 bg-indigo-950/50'}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              Reels
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('videos'); setPlayingVideoId(null); }}
            className={`relative px-6 sm:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 overflow-hidden group ${activeTab === 'videos' ? 'text-white bg-red-600/20 border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'text-slate-400 border border-slate-700 hover:text-white hover:border-indigo-500 bg-indigo-950/50'}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Videos
            </span>
          </button>
        </div>

        <div className="w-full relative min-h-[400px]">
          <div className={`transition-all duration-700 absolute top-0 left-0 w-full ${activeTab === 'photos' ? 'opacity-100 z-10 translate-y-0 relative' : 'opacity-0 -z-10 translate-y-10'}`}>
            <Swiper
              effect={'coverflow'} grabCursor centeredSlides slidesPerView={'auto'} loop={displayPhotos.length > 1}
              coverflowEffect={{ rotate: 10, stretch: 0, depth: 400, modifier: 1, slideShadows: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }} navigation
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="gallery-swiper w-full pt-10 pb-16"
            >
              {displayPhotos.map((photo, index) => (
                <SwiperSlide key={index} style={{ width: '450px', height: 'auto', maxWidth: '90vw' }} className="sm:w-[500px] md:w-[700px] lg:w-[850px]">
                  <div className="relative group rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl aspect-[4/3]">
                    <img src={photo.startsWith('/') && !photo.startsWith('http') ? `http://localhost:5001${photo}` : photo} alt={`Gallery Photo ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={`transition-all duration-700 absolute top-0 left-0 w-full ${activeTab === 'reels' ? 'opacity-100 z-10 translate-y-0 relative' : 'opacity-0 -z-10 translate-y-10'}`}>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={displayReels.length > 5}
              coverflowEffect={{
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              breakpoints={{
                320: { slidesPerView: 1.5, spaceBetween: 20 },
                640: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3.5, spaceBetween: 40 },
                1280: { slidesPerView: 4.5, spaceBetween: 50 }
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="reels-swiper w-full pt-5 pb-16"
            >
              {displayReels.map((reel, idx) => (
                <SwiperSlide key={`${reel.url}-${idx}`} className="pb-4">
                  <div className="max-w-[320px] mx-auto">
                    <ReelCard
                      reel={reel}
                      isPlaying={playingVideoId === `reel-${idx}`}
                      onPlay={() => handleReelPlay(idx)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={`transition-all duration-700 absolute top-0 left-0 w-full ${activeTab === 'videos' ? 'opacity-100 z-10 translate-y-0 relative' : 'opacity-0 -z-10 translate-y-10'}`}>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={displayVideos.length > 2}
              coverflowEffect={{
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 20 },
                640: { slidesPerView: 1.8, spaceBetween: 30 },
                1024: { slidesPerView: 2.4, spaceBetween: 40 },
                1280: { slidesPerView: 2.8, spaceBetween: 50 }
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="videos-swiper w-full pt-5 pb-16"
            >
              {displayVideos.map((video, idx) => {
                const videoId = getYouTubeVideoId(video.url);
                const isPlaying = playingVideoId === `video-${idx}`;
                return (
                  <SwiperSlide key={`video-slide-${idx}`} className="pb-4">
                    <div className="max-w-[640px] mx-auto">
                      <div
                        className="group relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-red-500/50 transition-all duration-300 bg-slate-900/40 aspect-video cursor-pointer flex justify-center items-center"
                        onClick={() => videoId && !isPlaying && setPlayingVideoId(`video-${idx}`)}
                      >
                        {isPlaying && videoId ? (
                          <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title={video.title || "Video"} className="absolute top-0 left-0 w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        ) : (
                          <>
                            {videoId && <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={video.title || "Video"} className="absolute top-0 left-0 w-full h-full object-cover" />}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                            <div className="relative z-10 w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] group-hover:bg-red-500 transform group-hover:scale-110 transition-all duration-300">
                              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="text-center pb-4">
          <p className="text-slate-400 mb-4 text-sm sm:text-base font-medium">To explore more memories and past events</p>
          <button onClick={() => navigate('/previous-editions')} className="inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-indigo-950 border border-indigo-500/30 text-white font-bold text-sm sm:text-lg hover:bg-slate-800 hover:border-indigo-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(5,150,105,0.2)] transition-all duration-300 group">
            <span>Check out Previous Editions</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 group-hover:translate-x-1 group-hover:text-indigo-300 transition-transform duration-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </button>
        </div>
      </div>
    </>



  );
}
