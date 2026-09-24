import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaUsers,
  FaBook,
  FaGavel,
  FaFileContract,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaTrophy,
  FaHistory,
  FaRegClone,
  FaRegEdit,
  FaQuestionCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPreviousEditions, fetchUpcomingEditions } from "../services/api.js";
import "./Navbar.css";

export default function Navbar() {
  const [editions, setEditions] = useState([]);
  const [upcomingEditions, setUpcomingEditions] = useState([]);

  // showPill: State boolean toggling the visibility of the sticky floating pill header upon scrolling
  const [showPill, setShowPill] = useState(false);

  // mobileMenuOpen: State boolean controlling the open/closed active drawer state for mobile viewports
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth Context: Retrieves active user identity, authentication status, and logout actions
  const { user, isAuthenticated, logout } = useAuth();

  // Router Hooks: Handles history navigation, page transitions, and location path checks
  const navigate = useNavigate();
  const location = useLocation();

  // Route Context Helpers: Booleans to verify if active route is admin panel, nomination form, or home
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isNominateRoute = location.pathname.startsWith("/nominate");
  const isHomePage = location.pathname === "/";
  const isUser = user?.role === "user";
  const isAdminUser = user?.role === "admin";

  // headerRef: DOM reference to measure header element height for offsets during page transitions
  const headerRef = useRef();

  // Effect (Mount): Fetches previous award editions database listings to populate the past dropdown options
  useEffect(() => {
    fetchPreviousEditions().then(res => setEditions(res.data || [])).catch(console.error);
    fetchUpcomingEditions().then(res => {
      // Flatten the grouped data
      const flattened = res.reduce((acc, group) => acc.concat(group.items.map(item => ({ ...item, year: group.year }))), []);
      setUpcomingEditions(flattened);
    }).catch(console.error);
  }, []);

  // Effect (Route Change): Automatically resets scrolling context below the header for compact mobile screens
  useEffect(() => {
    if (!isAdminRoute && !isNominateRoute) {
      if (window.innerWidth < 800 && headerRef.current) {
        const y = window.scrollY;
        if (y > 80) {
          window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
        }
      }
    }
  }, [location.pathname, isAdminRoute, isNominateRoute]);

  // Effect (Window Scroll): Listens to window scroll position to show the floating nav pill header
  useEffect(() => {
    if (isAdminRoute) return;

    const onScroll = () => {
      if (window.scrollY > 100) {
        setShowPill(true);
      } else {
        setShowPill(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAdminRoute]);

  // handleLoginClick: Main routing handler for logins, logouts, session ends, and panel redirects
  const handleLoginClick = () => {
    if (isAdminRoute) {
      if (isAdminUser) {
        logout();
      } else {
        navigate("/admin/login");
      }
    } else {
      if (isAuthenticated) {
        logout();
      } else {
        navigate("/login");
      }
    }
  };

  if (isAdminRoute) {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#020617] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/logo.png"
                alt="TIME Cyber Media Logo"
                className="h-8 w-auto object-contain cursor-pointer"
              />
            </a>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-white">Admin Dashboard</span>
              <span className="text-[11px] text-gray-300">
                Indian Icon of The Year, 2026 – Internal Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdminUser && user ? (
              <span className="hidden md:inline text-xs text-gray-200">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
            ) : null}
            {isAdminUser && (
              <button
                onClick={handleLoginClick}
                className="border border-white px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <div className="hidden min-[800px]:block">
        <header
          className={`fixed top-0 w-full z-50 text-white transition-all duration-500 ${showPill ? "opacity-0 pointer-events-none -translate-y-10" : "opacity-100 translate-y-0"
            }`}
          ref={headerRef}
        >
          <div className="bg-transparent h-14">
            <div className="max-w-10xl mx-auto px-10 h-full flex items-center text-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-43 h-18 flex items-center justify-center">
                  <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/images/logo.png"
                      alt="TIME Cyber Media Logo"
                      className="absolute top-[-0.5px] left-[-3px] h-[70px] rounded-md w-auto max-w-none object-contain z-50 drop-shadow-md cursor-pointer"
                    />
                  </a>
                </div>
                <div className="flex gap-2 font-semibold whitespace-nowrap ml-4">
                  <span>TIME Cyber Media </span>
                  <span>Pvt Ltd.</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                {isUser && user ? (
                  <>
                    <span className="hidden md:inline text-xs text-gray-100">
                      Welcome, <span className="font-semibold">{user.name}</span>
                    </span>
                    {user.role === "user" && (
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="border border-indigo-400 px-4 py-1 rounded-full text-xs text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
                      >
                        My Nominations
                      </button>
                    )}
                  </>
                ) : null}
                <button
                  onClick={handleLoginClick}
                  className="border border-white px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </div>
          <nav className="bg-transparent h-12">
            <div className="max-w-7xl mx-auto px-1 min-[1300px]:px-6 h-full flex justify-center items-center responsive-nav-links">
              {menuLinks("white", undefined, headerRef, isUser, false, editions, upcomingEditions)}
            </div>
          </nav>
        </header>

        <div
          className={`fixed top-4 left-0 w-full z-[150] flex justify-center px-4 transition-all duration-500 ${showPill ? "opacity-100 translate-y-0 scale-100" : "opacity-0 pointer-events-none -translate-y-4 scale-95"
            }`}
        >
          <div className="
               relative
               bg-slate-950/85 backdrop-blur-lg text-white 
               rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(16,185,129,0.25)] 
               border border-indigo-500/30 
               py-2.5 flex items-center responsive-nav-pill-outer
               group
             "
            style={{
              background: "linear-gradient(135deg, rgba(8, 17, 36, 0.85) 0%, rgba(3, 8, 20, 0.95) 100%)",
            }}
          >
            {/* Liquid Refractive Element */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-cyan-500/10 opacity-50" />
              <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] animate-pulse" />
            </div>

            <div className="flex items-center gap-4 z-10">
              <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/logo.png"
                  alt="TIME Cyber Media Logo"
                  className="h-8 w-auto object-contain cursor-pointer brightness-110"
                />
              </a>
              <div className="h-6 w-px bg-white/10 mx-1"></div>
            </div>
            <div className="relative flex items-center z-10 responsive-nav-pill-inner">
              {menuLinks("white", undefined, headerRef, isUser, false, editions, upcomingEditions)}
            </div>
          </div>
        </div>
      </div>

      <div className="block min-[800px]:hidden">
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center h-16 sm:h-20 px-4 justify-between ${showPill
            ? "bg-slate-950/90 backdrop-blur-lg border-b border-indigo-500/20 shadow-xl"
            : "bg-transparent"
            }`}
          ref={headerRef}
        >
          <div className="flex items-center gap-2">
            <a href="https://www.timecybermedia.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/logo.png"
                alt="TIME Cyber Media Logo"
                className="h-9 w-auto object-contain"
                style={{ maxWidth: 40 }}
              />
            </a>
            <span className="text-[13px] font-semibold whitespace-nowrap text-white">TIME Cyber Media Pvt Ltd.</span>
          </div>
          <div className="flex items-center gap-1">
            {isAuthenticated ? (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="border border-white text-white px-3 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
              >
                Login
              </button>
            )}
            <button
              aria-label="Open Menu"
              onClick={() => setMobileMenuOpen(true)}
              className="ml-2 text-white text-xl flex items-center justify-center"
            >
              <FaBars />
            </button>
          </div>
        </header>

        <MobileMenuDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          user={user}
          isAuthenticated={isAuthenticated}
          handleLoginClick={handleLoginClick}
          headerRef={headerRef}
          isUser={isUser}
          editions={editions}
          upcomingEditions={upcomingEditions}
        />
      </div>
    </>
  );
}

// menuLinks: Helper function that renders all link nodes. Sets up event overrides for mobile viewport drawers.
const menuLinks = (color, onClick, headerRef, isUser, showDashboard = true, editions = [], upcomingEditions = []) => {
  // createNavHandler: Higher-order scroll listener wrapping the click events to trigger automatic top offsets on transition
  const createNavHandler = (routeHandler) => (e) => {
    if (onClick) onClick();
    setTimeout(() => {
      if (window.innerWidth < 800 && headerRef && headerRef.current) {
        window.scrollTo({ top: headerRef.current.offsetHeight + 2, behavior: "smooth" });
      }
    }, 0);
    if (routeHandler && typeof routeHandler === 'function') routeHandler(e);
  };
  return (
    <>
      <NavItem to="/" icon={<FaHome />} label="Home" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/categories" icon={<FaListAlt />} label="Category" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/jury" icon={<FaUsers />} label="Guest" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/guidelines" icon={<FaBook />} label={<span className="whitespace-nowrap">Entry Guidelines</span>} color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/judging" icon={<FaGavel />} label={<span className="whitespace-nowrap">Selection Process</span>} color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/terms" icon={<FaFileContract />} label="T&C" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/contact" icon={<FaEnvelope />} label={<span className="whitespace-nowrap">Contact Us</span>} color={color} onClick={createNavHandler(onClick)} />
      <UpcomingNavDropdown icon={<FaHistory />} label={<span className="whitespace-nowrap">Upcoming Awards</span>} color={color} options={upcomingEditions} onClick={createNavHandler(onClick)} />
      <NavDropdown icon={<FaHistory />} label={<span className="whitespace-nowrap">Previous Editions</span>} color={color} options={editions} onClick={createNavHandler(onClick)} />
      <NavItem to="/faq" icon={<FaQuestionCircle />} label="FAQ" color={color} onClick={createNavHandler(onClick)} />
      <NavItem to="/nominate" icon={<FaRegEdit />} label="Nominate Now" color={color} onClick={createNavHandler(onClick)} isSpecial={true} />
      {isUser && showDashboard && (
        <NavItem
          to="/dashboard"
          icon={<FaRegClone />}
          label="My Nominations"
          color={color}
          onClick={createNavHandler(onClick)}
        />
      )}
    </>
  );
};

// NavItem: Standard link item component mapping. Supports a special glowing style modifier (isSpecial) for CTAs.
function NavItem({ to, icon, label, color, onClick, isSpecial }) {
  // If special flag is enabled, render as a glowing action button pill (e.g. Nominate Now)
  if (isSpecial) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `nav-glow-btn flex items-center whitespace-nowrap gap-1 ${isActive ? "nav-glow-btn-active" : ""}`
        }
      >
        <span className="text-[11px]">{icon}</span>
        <span className="whitespace-nowrap">{label}</span>
      </NavLink>
    );
  }

  // Otherwise, render standard clean text link with underline triggers on active match
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-1 ${isActive
          ? `font-semibold border-b-2 ${color === "white" ? "border-white" : "border-black"
          }`
          : color === "white"
            ? "opacity-80 hover:opacity-100"
            : "text-gray-700 hover:text-black"
        }`
      }
    >
      <span className="text-[11px]">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

// MobileMenuDrawer: Collapsible responsive drawer sidebar for smaller devices (< 1024px).
// Includes overlay filters, spring motion animations, background aurora animations, and session control buttons.
function MobileMenuDrawer({
  open,
  onClose,
  user,
  isAuthenticated,
  handleLoginClick,
  headerRef,
  isUser,
  editions,
  upcomingEditions
}) {
  // Effect (Keyboard Escape): Listens to Escape key presses to close the mobile drawer sidebar
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-slate-950/60 "
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[120] w-[85%] max-w-xs h-full bg-[#0b1120] text-white shadow-2xl flex flex-col overflow-hidden rounded-4xl justify-between"
          >
            {/* Liquid Background Accents */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 h-20 border-b border-white/5 bg-slate-900/40 ">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="TIME Cyber Media Logo"
                  className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                />
                <div className="flex flex-col leading-none">
                  <span className="font-black text-[10px] uppercase tracking-tighter">TIME Cyber Media <br /> Pvt Ltd.</span>
                </div>
              </div>
              <button
                aria-label="Close Menu"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                onClick={onClose}
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-between overflow-y-auto medical-scrollbar px-4 py-8">
              <nav className="flex flex-col gap-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                  className="flex flex-col gap-3"
                >
                  {menuLinks("white", onClose, headerRef, isUser, true, editions, upcomingEditions)}
                </motion.div>
              </nav>

              {/* Bottom Section */}
              <div className="mt-12 space-y-6">
                {user && (
                  <div className="px-2 py-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-center">
                    <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Authenticated Session</p>
                    <p className="text-sm font-black text-white">{user.name}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    handleLoginClick();
                    onClose();
                  }}
                  className="w-full relative overflow-hidden group/btn rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#4338CA] to-[#9F1239] text-white font-black py-4 text-xs uppercase tracking-[0.2em] shadow-lg shadow-[0_0_20px_rgba(251,113,133,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="relative z-10">{isAuthenticated ? "Sign Out" : "Secure Login"}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>

                <p className="text-[10px] text-center text-slate-500 font-medium">
                  &copy; 2026 TIME Cyber Media Pvt Ltd. <br /> All Rights Reserved.
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// NavDropdown: Dropdown menu selector handling collapsible nested sub-menus (Previous Editions list).
// Automatically displays options list on mouse hover for desktop and toggle-clicks on mobile viewports.
function NavDropdown({ icon, label, color, options, onClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Effect (Click Outside): Listens to external document clicks to automatically collapse open dropdown sub-menus
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // isActiveGroup: Helper check that returns active status if current location matches any dropdown list items
  const isActiveGroup = options.some(opt => {
    const formattedTitle = opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return location.pathname === `/${opt.year}/${formattedTitle}`;
  }) || location.pathname === "/previous-editions";

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={() => window.innerWidth >= 800 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 800 && setOpen(false)}
    >
      <NavLink
        to="/previous-editions"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className={`flex items-center gap-1 transition-colors ${color === "white"
          ? (isActiveGroup ? "text-indigo-400 font-semibold" : "opacity-80 hover:opacity-100 text-white")
          : (isActiveGroup ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-black")
          }`}
      >
        <span className="text-[11px]">{icon}</span>
        <span>{label}</span>
      </NavLink>

      <div
        className={`min-[800px]:absolute top-[100%] left-0 pt-2 z-50 transition-all duration-200 ${open ? "min-[800px]:opacity-100 min-[800px]:visible min-[800px]:translate-y-0 flex" : "min-[800px]:opacity-0 min-[800px]:invisible hidden"
          } ${window.innerWidth < 800 && !open ? 'hidden' : ''}`}
      >
        <div className="min-w-[240px] max-h-[70vh] overflow-y-auto medical-scrollbar bg-slate-900 border border-indigo-400/30 rounded-xl shadow-2xl py-3 flex flex-col">
          {options.map((opt) => {
            const formattedTitle = opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const isAct = location.pathname === `/${opt.year}/${formattedTitle}`;
            return (
              <NavLink
                key={`${opt.year}-${opt.title}`}
                to={`/${opt.year}/${formattedTitle}`}
                onClick={() => { setOpen(false); if (onClick) onClick(); }}
                className={`px-5 py-2.5 text-sm transition-colors ${isAct ? 'bg-indigo-600/20 font-bold border-l-4 border-indigo-400 text-white' : 'text-indigo-100 hover:bg-white/10 hover:text-white border-l-4 border-transparent'}`}
              >
                {opt.title} ({opt.year})
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function UpcomingNavDropdown({ icon, label, color, options, onClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActiveGroup = options.some(opt => {
    const formattedTitle = opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return location.pathname === `/upcoming-editions/${opt.year}/${formattedTitle}`;
  }) || location.pathname === "/upcoming-awards";

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={() => window.innerWidth >= 800 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 800 && setOpen(false)}
    >
      <NavLink
        to="/upcoming-awards"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className={`flex items-center gap-1 transition-colors ${color === "white"
          ? (isActiveGroup ? "text-indigo-400 font-semibold" : "opacity-80 hover:opacity-100 text-white")
          : (isActiveGroup ? "text-indigo-600 font-semibold" : "text-gray-700 hover:text-black")
          }`}
      >
        <span className="text-[11px]">{icon}</span>
        <span>{label}</span>
      </NavLink>

      <div
        className={`min-[800px]:absolute top-[100%] left-0 pt-2 z-50 transition-all duration-200 ${open ? "min-[800px]:opacity-100 min-[800px]:visible min-[800px]:translate-y-0 flex" : "min-[800px]:opacity-0 min-[800px]:invisible hidden"
          } ${window.innerWidth < 800 && !open ? 'hidden' : ''}`}
      >
        <div className="min-w-[240px] max-h-[70vh] overflow-y-auto medical-scrollbar bg-slate-900 border border-indigo-400/30 rounded-xl shadow-2xl py-3 flex flex-col">
          {options.map((opt) => {
            const formattedTitle = opt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            const isAct = location.pathname === `/upcoming-editions/${opt.year}/${formattedTitle}`;
            return (
              <NavLink
                key={`${opt.year}-${opt.title}`}
                to={`/upcoming-editions/${opt.year}/${formattedTitle}`}
                onClick={() => { setOpen(false); if (onClick) onClick(); }}
                className={`px-5 py-2.5 text-sm transition-colors ${isAct ? 'bg-indigo-600/20 font-bold border-l-4 border-indigo-400 text-white' : 'text-indigo-100 hover:bg-white/10 hover:text-white border-l-4 border-transparent'}`}
              >
                {opt.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
