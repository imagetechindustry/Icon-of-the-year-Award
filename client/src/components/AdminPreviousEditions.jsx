import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    fetchPreviousEditions,
    createPreviousEdition,
    updatePreviousEdition,
    deletePreviousEdition,
} from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { PageHero, AuroraBackground } from "./Motion.jsx";
import { Edit2, Trash2, Plus, Image as ImageIcon } from "lucide-react";

const inputClass =
    "w-full bg-[#020817] border border-white/10 rounded-[1.2rem] px-6 py-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500/50 transition-all";

export default function AdminPreviousEditions({ customToken }) {
    const authContext = useAuth();
    const token = customToken || authContext.token;
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        year: "",
        title: "",
        editionLabel: "",
        locations: "",
        date: "",
        hero: "",
        videoLinks: "",
    });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        loadEditions();
    }, [token]);

    const loadEditions = async () => {
        try {
            setLoading(true);
            const res = await fetchPreviousEditions();
            setEditions(res.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            year: "",
            title: "",
            editionLabel: "",
            locations: "",
            date: "",
            hero: "",
            videoLinks: "",
        });
        setImages([]);
        setExistingImages([]);
        setIsEditing(false);
        setCurrentId(null);
        setShowModal(false);
    };

    const handleEdit = (edition) => {
        setFormData({
            year: edition.year,
            title: edition.title,
            editionLabel: edition.editionLabel,
            locations: edition.locations.join(", "),
            date: edition.date || "",
            hero: edition.hero || "",
            videoLinks: edition.videoLinks ? edition.videoLinks.join(", ") : "",
        });
        setExistingImages(edition.images || []);
        setImages([]);
        setIsEditing(true);
        setCurrentId(edition._id);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = new FormData();
            payload.append("year", formData.year);
            payload.append("title", formData.title);
            payload.append("editionLabel", formData.editionLabel);
            payload.append("locations", formData.locations);
            payload.append("date", formData.date);
            payload.append("hero", formData.hero);
            payload.append("videoLinks", formData.videoLinks);

            if (isEditing) {
                existingImages.forEach(img => payload.append("existingImages", img));
                images.forEach(img => payload.append("newImages", img));
                await updatePreviousEdition(currentId, payload, token);
            } else {
                images.forEach(img => payload.append("images", img));
                await createPreviousEdition(payload, token);
            }

            resetForm();
            loadEditions();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePreviousEdition(deletingId, token);
            setDeletingId(null);
            loadEditions();
        } catch (err) {
            alert(err.message);
        }
    };

    const removeExistingImage = (imgUrl) => {
        setExistingImages(prev => prev.filter(i => i !== imgUrl));
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400/40">Synchronizing Archive Data...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center bg-slate-900/40 p-10 rounded-[3rem] border border-white/15  shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                <div>
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Historical <span className="text-gradient-prestige">Archives</span></h3>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-2">International Edition Records Management</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="group relative flex items-center gap-4 bg-indigo-500 text-[#020817] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95"
                >
                    <Plus size={20} /> Add New Edition
                </button>
            </div>

            {error && (
                <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">⚠️</div>
                    <p className="text-xs font-bold text-red-400/60 uppercase tracking-widest">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {editions.map((edition) => (
                    <div key={edition._id} className="group relative bg-[#020817] border border-white/10 rounded-[3.5rem] overflow-hidden hover:border-indigo-500/40 transition-all duration-700 shadow-2xl flex flex-col h-full">
                        {/* Media Preview Header */}
                        <div className="h-56 relative overflow-hidden bg-white/5">
                            {edition.images && edition.images.length > 0 ? (
                                <img
                                    src={edition.images[0]}
                                    alt={edition.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-80"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/5 text-8xl">📽️</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
                            <div className="absolute top-8 left-8">
                                <span className="bg-indigo-500 text-[#020817] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-xl shadow-xl shadow-[0_0_20px_rgba(251,113,133,0.4)]">{edition.year}</span>
                            </div>
                            <div className="absolute top-8 right-8 flex gap-2">
                                <div className="bg-black/40  border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                    <ImageIcon size={12} className="text-indigo-400" />
                                    <span className="text-[10px] font-black text-white">{edition.images?.length || 0}</span>
                                </div>
                                <div className="bg-black/40  border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                    <span className="text-cyan-400 text-[10px]">▶</span>
                                    <span className="text-[10px] font-black text-white">{edition.videoLinks?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-10 flex-1 flex flex-col">
                            <div className="mb-8">
                                <p className="text-[10px] text-indigo-400/60 font-black uppercase tracking-[0.4em] mb-3">{edition.editionLabel}</p>
                                <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-gradient-prestige transition-all duration-500">{edition.title}</h3>
                                <div className="flex items-center gap-2 mt-4 text-white/30">
                                    <span className="text-sm">📍</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{edition.locations.join(", ")}</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-6">
                                <div className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/40 border border-white/5 group-hover:bg-slate-800/40 transition-colors">
                                    <div className="flex-1">
                                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Archive Integrity</p>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 w-[85%]" />
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Status</p>
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Verified</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleEdit(edition)}
                                        className="flex-1 py-5 bg-indigo-500 text-[#020817] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/10 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <Edit2 size={16} /> Update Record
                                    </button>
                                    <button
                                        onClick={() => setDeletingId(edition._id)}
                                        className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-95"
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit/Create Modal */}
            {showModal && createPortal(
                <div className="fixed inset-0 bg-[#020817]/90  flex items-start justify-center z-[9999] p-4 overflow-y-auto pt-10 lg:pt-24">
                    <div className="bg-[#020817] border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)] p-8 lg:p-12 rounded-[3rem] lg:rounded-[4rem] max-w-4xl w-full relative mb-20">
                        <div className="absolute top-0 right-0 p-10">
                            <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-red-500 hover:text-white transition-all">✕</button>
                        </div>

                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-1 w-12 bg-indigo-500 rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Archive Protocol</span>
                            </div>
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">{isEditing ? "Modify" : "Initialize"} <span className="text-gradient-prestige">Edition</span></h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-2 block">Edition Year</label>
                                        <input required type="number" className={inputClass} value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} placeholder="e.g. 2024" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-2 block">Display Label</label>
                                        <input required className={inputClass} value={formData.editionLabel} onChange={e => setFormData({ ...formData, editionLabel: e.target.value })} placeholder="e.g. 13th Edition" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-2 block">Primary Title</label>
                                        <input required className={inputClass} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="GHE Awards 2024" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-2 block">Locations (CSV)</label>
                                        <input required className={inputClass} value={formData.locations} onChange={e => setFormData({ ...formData, locations: e.target.value })} placeholder="City, Country" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-2 block">Execution Date</label>
                                        <input className={inputClass} value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="Month Year" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-2 block">Dossier Description</label>
                                        <textarea className={`${inputClass} min-h-[100px] resize-none`} value={formData.hero} onChange={e => setFormData({ ...formData, hero: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400/40 ml-1 mb-2 block">Video Intelligence Links (Comma-separated)</label>
                                    <textarea className={`${inputClass} min-h-[80px] border-cyan-500/20`} placeholder="YouTube URLs..." value={formData.videoLinks} onChange={e => setFormData({ ...formData, videoLinks: e.target.value })} />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400/40 ml-1 mb-4 block">Visual Archive Assets</label>

                                    {isEditing && existingImages.length > 0 && (
                                        <div className="mb-8 p-6 bg-black/20 rounded-2xl border border-white/5">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-4">Existing Records ({existingImages.length})</p>
                                            <div className="flex flex-wrap gap-4">
                                                {existingImages.map((imgUrl, i) => (
                                                    <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 group">
                                                        <img src={imgUrl} alt="Archive Edition Thumbnail" className="w-full h-full object-cover" />
                                                        <button type="button" onClick={() => removeExistingImage(imgUrl)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-xs">REMOVE</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="image-upload"
                                            multiple
                                            accept="image/*"
                                            onChange={e => setImages(prev => [...prev, ...Array.from(e.target.files)])}
                                            className="hidden"
                                        />
                                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer group">
                                            <Plus size={32} className="text-white/20 group-hover:text-indigo-400 transition-colors mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Inject New Media Nodes</span>
                                        </label>

                                        {images.length > 0 && (
                                            <div className="mt-6 p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-4">Staged for Upload ({images.length})</p>
                                                <div className="flex flex-wrap gap-4">
                                                    {images.map((file, i) => (
                                                        <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-indigo-500/20 group">
                                                            <img src={URL.createObjectURL(file)} alt="Staged Upload Image" className="w-full h-full object-cover" />
                                                            <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all font-black text-xs">CANCEL</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-6 pt-10 border-t border-white/5">
                                <button type="button" onClick={() => setShowModal(false)} className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Discard</button>
                                <button type="submit" className="px-12 py-5 bg-indigo-500 text-[#020817] text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[0_0_20px_rgba(251,113,133,0.4)] hover:bg-indigo-400 transition-all active:scale-95">Commit Archive</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* Delete Confirm Modal */}
            {deletingId && createPortal(
                <div className="fixed inset-0 bg-[#020817]/95  flex items-center justify-center z-[9999] p-4">
                    <div className="bg-[#020817] border border-red-500/20 p-12 rounded-[4rem] max-w-md w-full text-center relative overflow-hidden shadow-[0_0_100px_rgba(239,68,68,0.1)]">
                        <div className="absolute top-0 inset-x-0 h-1 bg-red-500" />
                        <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 border border-red-500/20">
                            <Trash2 size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">Purge <span className="text-red-500">Record</span></h2>
                        <p className="text-sm font-bold text-white/40 leading-relaxed italic mb-10">"Are you certain you wish to wipe this edition from the historical archives? This protocol cannot be reversed."</p>
                        <div className="flex flex-col gap-4">
                            <button onClick={handleDelete} className="w-full py-5 bg-red-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-red-500/20 active:scale-95 transition-all">Execute Purge</button>
                            <button onClick={() => setDeletingId(null)} className="w-full py-5 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Abort Mission</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
