import { Mail, Phone, Globe, MapPin, Facebook, Instagram, Youtube, Linkedin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, SlideIn } from "../components/Motion.jsx";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/TimeCyberMedia", label: "Facebook", color: "from-blue-600 to-blue-500" },
  { icon: Instagram, href: "https://www.instagram.com/TimeCyberMedia/", label: "Instagram", color: "from-pink-600 to-purple-600" },
  { icon: Youtube, href: "https://www.youtube.com/@timecybermedia", label: "YouTube", color: "from-red-600 to-red-500" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/timecybermedia?originalSubdomain=in", label: "LinkedIn", color: "from-blue-700 to-blue-600" },
  { icon: MessageCircle, href: "https://wa.me/919821020995", label: "WhatsApp", color: "from-indigo-600 to-indigo-500" },
];

const phones = [
  { tel: "+919821020995", display: "+91-98210 20995", icon: "📞" },
  { tel: "+919873004416", display: "+91-98730 04416", icon: "📞" },
];

function ContactItem({ href, icon: Icon, label, value, target, className = "" }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-4 p-4 glass-card border border-indigo-500/15 hover:border-indigo-400/40 transition-all duration-300 group ${className}`}
      whileHover={{ x: 4 }}
    >
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D4ED8] via-[#4338CA] to-[#9F1239] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <Icon size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] text-indigo-300/60 font-semibold uppercase tracking-widest mb-0.5">{label}</div>
        <div className="text-sm md:text-base font-bold text-white group-hover:text-indigo-100 transition-colors break-words">{value}</div>
      </div>
      <ArrowRight size={14} className="ml-auto text-indigo-400/40 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
    </motion.a>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        badge="Get in Touch"
        icon="✉️"
        title="Contact Us"
        subtitle="We'd love to connect. Reach out for inquiries about nominations, partnerships, media coverage, or sponsorships."
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left – Contact Details */}
            <SlideIn from="left">
              <div className="space-y-5">
                <h2 className="text-xl font-black text-gradient-prestige font-serif mb-6">Contact Information</h2>

                {/* Email */}
                <ContactItem
                  href="mailto:info@timecybermedia.com"
                  icon={Mail}
                  label="Email"
                  value="info@timecybermedia.com"
                />

                {/* Websites */}
                <div className="flex items-start gap-4 p-4 glass-card border border-indigo-500/15 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1D4ED8] via-[#4338CA] to-[#9F1239] flex items-center justify-center flex-shrink-0 shadow-md mt-1">
                    <Globe size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs text-indigo-300/60 uppercase font-bold tracking-wider mb-2">Websites</p>
                    <div className="space-y-2 flex flex-col">

                      <a
                        href="https://www.timecybermedia.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors duration-300 break-all"
                      >
                        timecybermedia.com
                      </a>
                      <a
                        href="https://indiabrandicon.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors duration-300 break-all"
                      >
                        IndiaBrandIconAwards
                      </a>

                      <a
                        href="https://www.internationalhealthcareaward.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors duration-300 break-all"
                      >
                        international healthcare award
                      </a>
                      <a
                        href="https://www.internationaleducationaward.com/ "
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors duration-300 break-all"
                      >
                        international education award
                      </a>
                      <a
                        href="https://www.indianiconoftheyearawards.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors duration-300 break-all"
                      >
                        Indian Icon of The Year
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-6">
                  {/* Delhi Office */}
                  <div className="space-y-3">
                    <ContactItem
                      href="https://www.google.com/maps/place/TIME+Cyber+Media+Pvt+Ltd/@28.6193327,77.0268018,17z/data=!4m14!1m7!3m6!1s0x390ce3de9c8c4cb1:0x3e1d9a9d183cf7a4!2sTIME+Cyber+Media+Pvt+Ltd!8m2!3d28.6193327!4d77.0293767!16s%2Fg%2F11bz014xp_!3m5!1s0x390ce3de9c8c4cb1:0x3e1d9a9d183cf7a4!8m2!3d28.6193327!4d77.0293767!16s%2Fg%2F11bz014xp_"
                      icon={MapPin}
                      label="Delhi Office"
                      value="Delhi Office :- C-31, 3rd Floor, Nawada Housing Complex, Opp. Metro Pillar No 792, Shivaji Marg, New Delhi 110059"
                      target="_blank"
                      className="text-left"
                    />
                    <div className="w-full h-[220px] rounded-3xl overflow-hidden border border-indigo-500/15 shadow-xl relative group">
                      <iframe
                        title="Google Maps Delhi Location"
                        src="https://maps.google.com/maps?q=TIME%20Cyber%20Media%20Pvt%20Ltd%20Nawada%20Delhi&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                      ></iframe>
                    </div>
                  </div>

                  {/* Mumbai Office */}
                  <div className="space-y-3">
                    <ContactItem
                      href="https://www.google.com/maps/place/Vfx+Multimedia+School+Graphic+Design-Video+Editing+Institute+Animation+Institute+In+Vasai-Vfx+Course+In+Vasai+Vfx+Institute/@19.3485819,72.7433027,13.01z/data=!4m22!1m15!4m14!1m6!1m2!1s0x390d05a3b320d5f3:0x9b40cb0d00276119!2sP+Square+Salon+Unisex+salon,+Red+Light+%F0%9F%9A%A6,+P+Square+Salon+1st+Floor+Plot+no+63,+Mohit+Nagar+Dwarka,+opposite+NSUT,+near+Nexa+Showroom,+Kakrola,+Delhi,+110078!2m2!1d77.0352846!2d28.6064227!1m6!1m2!1s0x3be7ae64ffffffff:0x352cd000cf148a0a!2sVfx+Multimedia+School+Graphic+Design-Video+Editing+Institute+Animation+Institute+In+Vasai-Vfx+Course+In+Vasai+Vfx+Institute,+Vinayak+shopping+centre,+A+%2F201+202,+Vasai+Station+Rd,+opp.+Union+bank,+Navghar+Manikpur,+Dindayal+Nagar,+Vasai+West,+Mumbai,+Vasai-Virar,+Maharashtra+401202!2m2!1d72.8274074!2d19.3784544!3m5!1s0x3be7ae64ffffffff:0x352cd000cf148a0a!8m2!3d19.3784544!4d72.8274074!16s%2Fg%2F11b90fq89w?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                      icon={MapPin}
                      label="Mumbai Office"
                      value="Mumbai Office :- A /201 202, Vinayak Shopping Centre, Pravati Cross, Vasai Station Rd, opp. Union Bank, Vasai West, Mumbai Maharashtra 401202"
                      target="_blank"
                      className="text-left"
                    />
                    <div className="w-full h-[220px] rounded-3xl overflow-hidden border border-indigo-500/15 shadow-xl relative group">
                      <iframe
                        title="Google Maps Mumbai Location"
                        src="https://maps.google.com/maps?q=Vfx%20Multimedia%20School%20Graphic%20Design-Video%20Editing%20Institute%20Animation%20Institute%20In%20Vasai-Vfx%20Course%20In%20Vasai%20Vfx%20Institute&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Right – Social + Office info */}
            <SlideIn from="right" delay={0.1}>
              <div className="space-y-6">

                {/* Social Media */}
                <div className="glass-card border border-indigo-500/15 p-6">
                  <h3 className="text-lg font-black text-gradient-prestige font-serif mb-2">Follow Us</h3>
                  <p className="text-indigo-100/60 text-sm mb-5">Stay updated with the latest news, announcements, and highlights.</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.a
                          key={i}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}
                          whileHover={{ scale: 1.15, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon size={20} className="text-white" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                {/* Office hours */}
                <div className="glass-card border border-indigo-500/15 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1D4ED8] via-[#4338CA] to-[#9F1239] flex items-center justify-center shadow-md">
                      <Clock size={16} className="text-white" />
                    </div>
                    <h3 className="font-black text-white">Office Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-indigo-200/70">Working Days</span>
                      <span className="text-white font-semibold">Mon – Sat</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200/70">Timing</span>
                      <span className="text-white font-semibold">10:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-200/70">Response Time</span>
                      <span className="text-indigo-300 font-semibold">Within 1 business day</span>
                    </div>
                  </div>
                </div>
                {/* Phone Numbers */}
                <div className="glass-card border border-indigo-500/15 p-6">
                  <h3 className="text-lg font-black text-gradient-prestige font-serif mb-4">Phone Numbers</h3>
                  <div className="space-y-3">
                    {phones.map((phone, i) => (
                      <a
                        key={i}
                        href={`tel:${phone.tel}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-500/5 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                          <Phone size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] text-indigo-300/60 uppercase font-bold tracking-wider">{phone.label}</p>
                          <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">{phone.display}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick enquiry nudge */}
                <div className="glass-card border border-indigo-400/20 p-6 bg-indigo-900/10 animate-border-glow">
                  <p className="text-indigo-100/80 text-sm leading-relaxed mb-4">
                    For <strong className="text-white">nominations</strong>, <strong className="text-white">sponsorships</strong>, or <strong className="text-white">media partnerships</strong> — reach out directly via the contact details above or WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/919821020995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm w-full justify-center"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </PageHero>

      {/* Bottom gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    </>
  );
}
