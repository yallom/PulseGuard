import { useState } from "react";
import { LayoutDashboard, Pill, HeartPulse, CalendarDays, MessageCircle, Siren } from "lucide-react";

const P = "#d41111";

const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { icon: <Pill size={20} />, label: "Medications" },
    { icon: <HeartPulse size={20} />, label: "Vitals" },
    { icon: <CalendarDays size={20} />, label: "Appointments" },
    { icon: <MessageCircle size={20} />, label: "Messages" },
];

export default function PulseGuardSidebar() {
    const [activeNav, setActiveNav] = useState(3);

    return (
        <aside style={{
            width: 256, background: "#fff", display: "flex", flexDirection: "column",
            padding: "24px 16px", gap: 8, boxShadow: "2px 0 12px rgba(180,0,0,0.06)",
            flexShrink: 0, height: "100vh"
        }}>
            {/* Logo */}
            <div style={{ fontWeight: 900, fontSize: 32, color: "#b91c1c", letterSpacing: "-0.5px", marginBottom: 16, paddingLeft: 8 }}>
                PulseGuard
            </div>

            {/* User greeting */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#ebe7e7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="#94a3b8">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                </div>
                <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Welcome back</div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Stay healthy today</div>
                </div>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                {navItems.map(({ icon, label }, i) => (
                    <button key={label} onClick={() => setActiveNav(i)}
                        style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                            borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 600,
                            fontSize: 14, textAlign: "left", transition: "all 0.15s",
                            ...(activeNav === i ? { background: "#fef2f2", color: P } : { background: "none", color: "#475569" })
                        }}>
                        {icon}{label}
                    </button>
                ))}
            </nav>

            {/* Emergency SOS */}
            <button style={{
                width: "100%", padding: "14px 0", background: P, color: "#fff", border: "none",
                borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 6px 20px rgba(212,17,17,0.25)"
            }}>
                <Siren size={18} /> Emergency SOS
            </button>
        </aside>
    );
}