import { useState } from "react";
import { CircleUser, Siren, Gauge, Bell, Activity, Wind, Droplet , Pill, PillBottle} from "lucide-react";

const ICONS = {
  account_circle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  notifications: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
  sos: "M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 13h-2v-2h2v2zm0-4h-2V7h2v4z",
  blood_pressure: "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-7 9a7 7 0 0 0 14 0H5zm1.5 2h11a5.5 5.5 0 0 1-11 0z",
  favorite: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  air: "M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z",
  water_drop: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z",
  pill: "M4.22 11.29l6.07-6.07c1.56-1.56 4.09-1.56 5.66 0l2.83 2.83c1.56 1.56 1.56 4.09 0 5.66l-6.07 6.07c-1.56 1.56-4.09 1.56-5.66 0l-2.83-2.83c-1.56-1.56-1.56-4.09 0-5.66zm4.24 7.07c.78.78 2.05.78 2.83 0L14.1 15.5l-5.66-5.66-2.83 2.83c-.78.78-.78 2.05 0 2.83l2.85 2.86z",
  medication: "M17.5 3A3.5 3.5 0 0 0 14 6.5v1H2v2h1v11h14V9.5h1A3.5 3.5 0 0 0 21 6a3.5 3.5 0 0 0-3.5-3zm-5 10.5H11v1.5H9.5V14H8v-1.5h1.5V11H11v1.5h1.5V13.5z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  radio_button_unchecked: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8 8-8z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  description: "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
  calendar_month: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z",
  person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
};

const Icon = ({ name }) => {
  const d = ICONS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d={d} />
    </svg>
  );
};

const stats = [
  { icon: <Gauge size={24} color="black" />, label: "BP", value: "120/80", unit: "mmHg", status: "Normal", color: "green" },
  { icon: <Activity size={24} color="black" />, label: "Heart Rate", value: "72", unit: "BPM", status: "Steady", color: "green" },
  { icon: <Wind size={24} color="black" />, label: "SpO2", value: "98", unit: "%", status: "Oxygenated", color: "green" },
  { icon: <Droplet size={24} color="black" />, label: "Water", value: "1.2", unit: "Liters", status: "Low", color: "amber" },
];

const statusStyles = {
  green: "text-green-600 bg-green-100",
  amber: "text-amber-600 bg-amber-100",
};

const meds = [
  { id: 1, name: "Lisinopril - 10mg", time: "10:00 AM", icon: <Pill size={20} color="gray" />, priority: true },
  { id: 2, name: "Multivitamin", time: "12:30 PM", icon: <PillBottle size={20} color="gray" />, priority: false },
];

const navItems = [
  { icon: "home", label: "Home" },
  { icon: "description", label: "Records" },
  { icon: "pill", label: "Meds" },
  { icon: "calendar_month", label: "Events" },
  { icon: "person", label: "Profile" },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState(0);
  const [checked, setChecked] = useState({});

  const toggleMed = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));

  return (
    <>
    <style>{`
      * { font-family: sans-serif; box-sizing: border-box; }
      body { margin: 0; }
      :root { --primary: #d41111; }
    `}</style>

      <div style={{ background: "#f8f6f6", minHeight: "100dvh", paddingBottom: 96, color: "#0f172a" }}>

        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", background: "#fff", padding: "12px 16px", position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid #fce4e4", width: "100%", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "#fce4e4", marginRight: 12 }}>
            <CircleUser size={24} color="#d41111" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 20 }}>VitalCare</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Arthur's Health Hub</div>
          </div>
          <button style={{ position: "relative", width: 40, height: 40, borderRadius: 12, background: "#f8f6f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={24} color="black" />
            <span style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#d41111" }} />
          </button>
        </header>

        {/* Main */}
        <main style={{ margin: "0 auto" }}>
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Good Morning, Arthur</h2>
              <p style={{ color: "#64748b", fontWeight: 500, margin: "4px 0 0" }}>Monday, October 23rd</p>
            </div>

            {/* Emergency Button */}
            <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, background: "#d41111", color: "#fff", padding: "24px 0", borderRadius: 16, border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(212,17,17,0.25)" }}>
              <Siren size={24} color="white" />
              <span style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2 }}>Emergency Help</span>
            </button>
          </div>

          {/* Quick Stats */}
          <section style={{ padding: "8px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>Quick Stats</h3>
              <button style={{ color: "#d41111", fontWeight: 600, fontSize: 14, background: "none", border: "none", cursor: "pointer" }}>See Trends</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {stats.map(({ icon, label, value, unit, status, color }) => (
                <div key={label} style={{ background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    {icon}
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>{label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 24, fontWeight: 700 }}>{value}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{unit}</span>
                  </div>
                  <div style={{ marginTop: 8, display: "inline-block", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, ...(color === "green" ? { color: "#16a34a", background: "#dcfce7" } : { color: "#d97706", background: "#fef3c7" }) }}>
                    {status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Medications */}
          <section style={{ padding: 16, marginTop: 8 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Upcoming Medication</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {meds.map(({ id, name, time, icon, priority }) => {
                const done = !!checked[id];
                return (
                  <div key={id} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, borderRadius: 12, ...(priority ? { background: "#fce4e4", borderLeft: "4px solid #d41111" } : { background: "#fff", border: "1px solid #e2e8f0" }) }}>
                    <div style={{ padding: 8, borderRadius: 8, background: priority ? "#fff" : "#f1f5f9", color: priority ? "#d41111" : "#94a3b8" }}>
                      {icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, textDecoration: done ? "line-through" : "none", color: done ? "#94a3b8" : "inherit" }}>{name}</div>
                      <div style={{ fontSize: 13, color: "#64748b" }}>Due at {time}</div>
                    </div>
                    <button
                      onClick={() => toggleMed(id)}
                      style={{ width: 36, height: 36, borderRadius: "50%", border: done || priority ? "none" : "2px solid #e2e8f0", background: done ? "#16a34a" : priority ? "#d41111" : "transparent", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                      {///<Icon name={done ? "check" : priority ? "check" : "radio_button_unchecked"} style={{ color: done || priority ? "#fff" : "#cbd5e1", fontSize: 20 }} />
                      }
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* Bottom Nav */}
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e2e8f0", padding: "8px 8px 20px", zIndex: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", margin: "0 auto" }}>
            {navItems.map(({ icon, label }, i) => {
              const active = activeNav === i;
              return (
                <button key={label} onClick={() => setActiveNav(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", color: active ? "#d41111" : "#94a3b8" }}>
                  <Icon name={icon} fill={active ? 1 : 0} style={{ fontSize: 28 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
                </button>
              );
            })}
          </div>
        </nav>

      </div>
    </>
  );
}