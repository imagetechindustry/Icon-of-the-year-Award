import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { PageHero } from "../components/Motion.jsx";

export default function AuthCallback() {
    const { setExternalAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const userStr = params.get("user");

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                setExternalAuth({ token, user });

                // Use a full page redirect to ensures the entire app re-initializes 
                // with the new authentication state. This is more robust than 
                // client-side navigate when handling auth state handovers.
                window.location.replace("/nominate");
            } catch (e) {
                console.error("Auth Callback Error:", e);
                window.location.replace("/login?error=auth_callback_failed");
            }
        } else {
            window.location.replace("/login");
        }
    }, [setExternalAuth]);

    return (
        <>
            <PageHero
                badge="Authentication"
                icon="🔑"
                title="Secure Login"
                subtitle="Please wait while we finalize your authentication..."
            >
                {/* Loading spinner during auth token parse */}
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-white">
                    <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-4" />
                    <p className="text-lg font-bold tracking-widest uppercase animate-pulse">
                        Completing Login...
                    </p>
                </div>
            </PageHero>
        </>
    );
}
