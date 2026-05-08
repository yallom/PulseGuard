import { useState } from "react";
import {
  LayoutDashboard, Pill, HeartPulse, CalendarDays, MessageCircle,
  Siren, SlidersHorizontal, Plus, CheckCircle2, Stethoscope,
  Heart, AlertTriangle, Navigation
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const P = "#d41111";

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { icon: <Pill size={20} />, label: "Medications" },
  { icon: <HeartPulse size={20} />, label: "Vitals" },
  { icon: <CalendarDays size={20} />, label: "Appointments", active: true },
  { icon: <MessageCircle size={20} />, label: "Messages" },
];

const filters = [
  { label: "Consultations", color: P },
  { label: "Testing", color: "#d97706" },
  { label: "Physical Therapy", color: "#2563eb" },
  { label: "Routine Check", color: "#94a3b8" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// October 2023 starts on Sunday
const events = {
  2: { label: "Cardiology Consult", type: "red" },
  4: { label: "Blood Panel", type: "amber" },
  10: { label: "Physical Rehab", type: "today" },
  14: { label: "Therapy Session", type: "blue" },
  18: { label: "Lung Capacity Test", type: "amber" },
  23: { label: "Oncology Follow-up", type: "red" },
};


const eventStyle = {
  red: { bg: "#fef2f2", border: P, text: P },
  amber: { bg: "#fffbeb", border: "#d97706", text: "#b45309" },
  blue: { bg: "#eff6ff", border: "#2563eb", text: "#1d4ed8" },
  today: { bg: "#fff", border: P, text: P },
};

const schedule = [
  {
    time: "08:00 AM - Morning Vitals",
    done: true,
    icon: <Heart size={20} color={P} />,
    title: "Blood Pressure Check",
    sub: "Record daily systolic/diastolic",
    style: { bg: "#f8f6f6", border: "none" },
  },
  {
    time: "10:30 AM - Appointment",
    done: false,
    icon: <Stethoscope size={20} color={P} />,
    title: "Physical Rehabilitation",
    sub: "St. Jude Medical Center",
    doctor: "Dr. Sarah Thompson",
    cta: "Get Directions",
    style: { bg: "#fef2f2", border: "1px solid #fecaca" },
  },
  {
    time: "02:00 PM - Medication",
    done: false,
    icon: <Pill size={20} color="#64748b" />,
    title: "Lisinopril 10mg",
    sub: "Take with glass of water",
    style: { bg: "#f8f6f6", border: "none" },
  },
  {
    time: "05:00 PM - Lab Prep",
    done: false,
    icon: <AlertTriangle size={20} color="#d97706" />,
    title: "Fast for tomorrow's test",
    sub: "No food after 8:00 PM for morning blood draw.",
    style: { bg: "#fffbeb", border: "1px solid #fde68a" },
    warn: true,
  },
];

// Build 35-cell calendar (Oct starts Sunday=0, pad 2 days from previous month)
const cells = [
  { day: 29, prev: true }, { day: 30, prev: true },
  ...Array.from({ length: 26 }, (_, i) => ({ day: i + 1 })),
];


export default function HomePage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(3);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white text-[#1e1b1b]">
      <style>{`*, *::before, *::after { box-sizing: border-box; } body { margin: 0; }`}</style>

      {/* Main */}
      <main style={{ flex: 1, display: "flex", height: "100vh", overflow: "hidden" }}>

        {/* Calendar Column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 32, overflowY: "auto" }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Medical Events</h1>
              <p style={{ color: "#64748b", fontSize: 16, margin: "4px 0 0" }}>Manage your health schedule and upcoming tests.</p>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ display: "flex", background: "#fff", borderRadius: 12, padding: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                {["Month", "Week", "Day"].map((v, i) => (
                  <button key={v} style={{ padding: "6px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, ...(i === 0 ? { background: P, color: "#fff" } : { background: "none", color: "#475569" }) }}>{v}</button>
                ))}
              </div>
              <button style={{ padding: 10, background: "#fff", border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <SlidersHorizontal size={20} color="#475569" />
              </button>
            </div>
          </header>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            {filters.map(({ label, color }) => (
              <button key={label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, border: `1px solid ${color}22`, background: `${color}11`, color, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />{label}
              </button>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, background: "#e2e8f0", borderRadius: 16, overflow: "hidden", minHeight: 480 }}>
            {DAYS.map(d => (
              <div key={d} style={{ background: "#f8fafc", padding: "12px 0", textAlign: "center", fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>{d}</div>
            ))}
            {cells.map(({ day, prev }, i) => {
              const ev = !prev && events[day];
              const isToday = day === 10 && !prev;
              return (
                <div key={i} style={{ background: isToday ? "#fff5f5" : "#fff", padding: 12, minHeight: 100, opacity: prev ? 0.3 : 1, ...(isToday ? { outline: "2px solid #fca5a5", outlineOffset: "-2px" } : {}) }}>
                  {isToday
                    ? <span style={{ width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", background: P, color: "#fff", borderRadius: "50%", fontWeight: 700, fontSize: 14 }}>{day}</span>
                    : <span style={{ fontWeight: 700, fontSize: 14 }}>{day}</span>
                  }
                  {ev && (() => {
                    const s = eventStyle[ev.type];
                    return (
                      <div style={{ marginTop: 6, padding: "3px 6px", background: s.bg, borderLeft: `3px solid ${s.border}`, borderRadius: 4, fontSize: 10, fontWeight: 700, color: s.text, lineHeight: 1.3 }}>{ev.label}</div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule Panel */}
        <aside style={{ width: 340, background: "#fff", display: "flex", flexDirection: "column", padding: 28, boxShadow: "-4px 0 24px rgba(0,0,0,0.06)", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Today's Schedule</h2>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", background: "#f1f5f9", color: "#64748b", borderRadius: 999 }}>OCT 10</span>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
            {schedule.map(({ time, done, icon, title, sub, doctor, cta, style, warn }, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 28, paddingBottom: 28 }}>
                {/* dot */}
                <div style={{ position: "absolute", left: 0, top: 4, width: 12, height: 12, borderRadius: "50%", background: done ? P : "#cbd5e1", outline: `4px solid ${done ? "#fee2e2" : "#f1f5f9"}` }} />
                {/* line */}
                {i < schedule.length - 1 && <div style={{ position: "absolute", left: 5, top: 18, bottom: 0, width: 1, background: "#f1f5f9" }} />}

                <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{time}</div>
                <div style={{ borderRadius: 14, padding: 14, background: style.bg, border: style.border || "none" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ marginTop: 1 }}>{icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: warn ? "#92400e" : "#0f172a" }}>{title}</div>
                      <div style={{ fontSize: 12, color: warn ? "#b45309" : "#64748b", marginTop: 2 }}>{sub}</div>
                      {doctor && <div style={{ fontSize: 11, fontWeight: 700, color: "#7f1d1d", marginTop: 8 }}>👤 {doctor}</div>}
                    </div>
                    {done && <CheckCircle2 size={20} color="#22c55e" fill="#22c55e" />}
                  </div>
                  {cta && (
                    <button style={{ width: "100%", marginTop: 12, padding: "8px 0", background: P, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <Navigation size={14} /> {cta}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 20, marginTop: 4 }}>
            <button style={{ width: "100%", padding: "14px 0", border: `2px solid #fecaca`, background: "none", color: P, fontWeight: 700, borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14 }}>
              <Plus size={18} /> New Event
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}