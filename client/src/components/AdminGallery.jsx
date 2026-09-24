import React, { useState, useEffect } from 'react';
import { Loader2, Save, Upload, Trash2, Image as ImageIcon, Video, Film } from 'lucide-react';
import { fetchGallery, updateGallery, uploadGalleryPhotos } from '../services/api';

export default function AdminGallery({ token }) {
  const [activeTab, setActiveTab] = useState('photos');
  const [reelsText, setReelsText] = useState('');
  const [videosText, setVideosText] = useState('');
  const [photosList, setPhotosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const loadGallery = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchGallery();
      if (data) {
        setReelsText(data.reels ? data.reels.join(',\n') : '');
        setVideosText(data.videos ? data.videos.join(',\n') : '');
        setPhotosList(data.photos || []);
      }
    } catch (error) {
      console.error("Failed to load gallery:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleSaveReels = async () => {
    setIsUpdating(true);
    try {
      const reelsArray = reelsText
        .split(',')
        .map(url => url.trim())
        .filter(url => url !== '');
      await updateGallery({ reels: reelsArray }, token);
      alert('Reels updated successfully');
    } catch (error) {
      alert('Failed to update reels');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveVideos = async () => {
    setIsUpdating(true);
    try {
      const videosArray = videosText
        .split(',')
        .map(url => url.trim())
        .filter(url => url !== '');
      await updateGallery({ videos: videosArray }, token);
      alert('Videos updated successfully');
    } catch (error) {
      alert('Failed to update videos');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      
      const res = await uploadGalleryPhotos(formData, token);
      if (res) {
        setPhotosList(res.photos || []);
        alert('Photo(s) uploaded successfully');
      }
    } catch (error) {
      alert('Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoUrl) => {
    if (!window.confirm('Are you sure you want to delete this photo from S3 and the database?')) return;
    setIsUpdating(true);
    try {
      const newPhotosList = photosList.filter(url => url !== photoUrl);
      const res = await updateGallery({ photos: newPhotosList }, token);
      if (res) {
          setPhotosList(res.photos || newPhotosList);
      }
      alert('Photo removed successfully');
    } catch (error) {
      alert('Failed to remove photo');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#d4af37]" />
    </div>
  );

  if (isError) return (
    <div className="flex h-64 flex-col items-center justify-center text-red-500">
      <p>Error loading gallery data.</p>
      <button onClick={loadGallery} className="mt-4 rounded-md bg-[#d4af37] px-4 py-2 text-black font-bold hover:bg-[#b8860b]">Retry</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 text-white p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-widest text-white">Media Gallery Management</h1>
      </div>

      <div className="flex space-x-1 rounded-xl bg-white/5 p-1 shadow-sm border border-white/10">
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold uppercase tracking-widest leading-5 transition-all
            ${activeTab === 'photos' 
              ? 'bg-[#d4af37] text-black shadow'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
        >
          <ImageIcon className="h-5 w-5" /> Photos
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold uppercase tracking-widest leading-5 transition-all
            ${activeTab === 'reels' 
              ? 'bg-[#d4af37] text-black shadow'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
        >
          <Film className="h-5 w-5" /> Reels
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold uppercase tracking-widest leading-5 transition-all
            ${activeTab === 'videos' 
              ? 'bg-[#d4af37] text-black shadow'
              : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
        >
          <Video className="h-5 w-5" /> Videos
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm">
        {activeTab === 'photos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest text-[#d4af37]">Gallery Photos</h2>
                <p className="text-sm text-gray-400">Upload new photos directly to your media gallery.</p>
              </div>
              <div>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#d4af37] px-4 py-2 text-sm font-black uppercase tracking-widest text-black shadow-sm hover:bg-[#b8860b] transition-colors">
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            {photosList.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-white/20 p-12 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-white">No photos</h3>
                <p className="mt-1 text-sm text-gray-400">Upload some photos to see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {photosList.map((photoUrl, index) => (
                  <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/40">
                    <img 
                      src={photoUrl.startsWith('/') && !photoUrl.startsWith('http') ? `http://localhost:5001${photoUrl}` : photoUrl} 
                      alt={`Gallery ${index}`} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => handleDeletePhoto(photoUrl)}
                        className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest text-[#d4af37]">YouTube Reels / Shorts</h2>
              <p className="text-sm text-gray-400">Paste your YouTube Short URLs here, separated by commas.</p>
            </div>
            
            <textarea
              rows={8}
              className="w-full rounded-md border-white/20 bg-black/40 text-white focus:border-[#d4af37] focus:ring-[#d4af37] sm:text-sm font-mono p-3 border"
              placeholder="https://www.youtube.com/shorts/U6HlrIGLbUE,&#10;https://www.youtube.com/shorts/Q8wuGQbKsc4"
              value={reelsText}
              onChange={(e) => setReelsText(e.target.value)}
            />
            
            <div className="flex justify-end">
              <button
                onClick={handleSaveReels}
                disabled={isUpdating}
                className="flex items-center gap-2 rounded-md bg-[#d4af37] px-4 py-2 text-sm font-black uppercase tracking-widest text-black shadow-sm hover:bg-[#b8860b] disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Reels
              </button>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest text-[#d4af37]">YouTube Videos</h2>
              <p className="text-sm text-gray-400">Paste your full YouTube Video URLs here, separated by commas.</p>
            </div>
            
            <textarea
              rows={8}
              className="w-full rounded-md border-white/20 bg-black/40 text-white focus:border-[#d4af37] focus:ring-[#d4af37] sm:text-sm font-mono p-3 border"
              placeholder="https://www.youtube.com/watch?v=FjIu3q-j9xQ,&#10;https://www.youtube.com/watch?v=33aGtyG0V9s"
              value={videosText}
              onChange={(e) => setVideosText(e.target.value)}
            />
            
            <div className="flex justify-end">
              <button
                onClick={handleSaveVideos}
                disabled={isUpdating}
                className="flex items-center gap-2 rounded-md bg-[#d4af37] px-4 py-2 text-sm font-black uppercase tracking-widest text-black shadow-sm hover:bg-[#b8860b] disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Videos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
