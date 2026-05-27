import { useState, useEffect, useRef } from "react";

const TOTAL_DURATION = 5000;

const TASKS = [
  { id: 1, label: "Scanning syllabus",        weight: 0.12 },
  { id: 2, label: "Fetching topic data",       weight: 0.18 },
  { id: 3, label: "Generating notes with AI",  weight: 0.35 },
  { id: 4, label: "Structuring content",       weight: 0.20 },
  { id: 5, label: "Finalizing notes",          weight: 0.15 },
];

const taskThresholds = (() => {
  let cum = 0;
  return TASKS.map((t) => {
    const start = cum;
    cum += t.weight;
    return { start, end: cum };
  });
})();

const SEGMENT_COUNT = 90;
const GLOW_COLOR = "#00e676";
const GLOW_SHADOW = "#00e67688";
const DIM_COLOR = "#152a15";

function SegmentBar({ progress }) {
  const activeTo = Math.round((progress / 100) * SEGMENT_COUNT);
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center", width: "100%" }}>
      {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
        const active = i < activeTo;
        return (
          <div
            key={i}
            style={{
              flex: "1 0 0",
              height: active ? "44px" : "30px",
              borderRadius: "2px",
              background: active ? GLOW_COLOR : DIM_COLOR,
              boxShadow: active ? `0 0 8px ${GLOW_SHADOW}` : "none",
              transition: "height 0.1s ease, background 0.1s ease, box-shadow 0.1s ease",
            }}
          />
        );
      })}
    </div>
  );
}

function TaskRow({ task, state, progress }) {
  const dot = state === "pending" ? "#1f3a1f" : GLOW_COLOR;
  const label = state === "done" ? "#7abf7a" : state === "running" ? "#e0ffe0" : "#2a4a2a";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "4px 0",
        opacity: state === "pending" ? 0.35 : 1,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: dot,
          flexShrink: 0,
          boxShadow: state === "running" ? `0 0 7px ${GLOW_COLOR}` : "none",
          animation: state === "running" ? "pulse 1.2s ease-in-out infinite" : "none",
          transition: "background 0.3s",
        }}
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: label,
          flex: 1,
          letterSpacing: "0.02em",
          transition: "color 0.3s",
        }}
      >
        {task.label}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: state === "running" ? GLOW_COLOR : state === "done" ? "#3a6a3a" : "#1a3a1a",
          minWidth: "34px",
          textAlign: "right",
          transition: "color 0.3s",
        }}
      >
        {state === "done" ? "100%" : state === "running" ? `${Math.round(progress)}%` : "—"}
      </span>
    </div>
  );
}

export default function TaskProgressBar() {
  const [overallProgress, setOverallProgress] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = null;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setOverallProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const getState = (idx) => {
    const { start, end } = taskThresholds[idx];
    const p = overallProgress / 100;
    if (p >= end) return "done";
    if (p >= start) return "running";
    return "pending";
  };

  const getTaskProgress = (idx) => {
    const { start, end } = taskThresholds[idx];
    const p = overallProgress / 100;
    if (p <= start) return 0;
    if (p >= end) return 100;
    return ((p - start) / (end - start)) * 100;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          background: "#070d07",
          borderRadius: "14px",
          border: "1px solid #1a2e1a",
          padding: "22px 24px 20px",
          boxSizing: "border-box",
        }}
      >
          {/* Header */}
          <div style={{ marginBottom: "22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: GLOW_COLOR,
                  boxShadow: done ? "none" : `0 0 8px ${GLOW_COLOR}`,
                  animation: done ? "none" : "pulse 1s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  color: done ? "#4a8a4a" : GLOW_COLOR,
                  textTransform: "uppercase",
                }}
              >
                {done ? "notes ready" : "generating notes..."}
              </span>
            </div>

            <div
              style={{
                marginTop: "8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "40px",
                fontWeight: "600",
                color: GLOW_COLOR,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {Math.round(overallProgress)}
              <span style={{ fontSize: "16px", fontWeight: 400, color: "#3a6a3a", marginLeft: "3px" }}>%</span>
            </div>
          </div>

          {/* LED Bar */}
          <div
            style={{
              background: "#040904",
              borderRadius: "8px",
              padding: "16px 14px",
              marginBottom: "20px",
              border: "1px solid #0f1f0f",
            }}
          >
            <SegmentBar progress={overallProgress} />
          </div>

          {/* Task List */}
          <div style={{ borderTop: "1px solid #0f200f", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "2px" }}>
            {TASKS.map((task, idx) => (
              <TaskRow
                key={task.id}
                task={task}
                state={getState(idx)}
                progress={getTaskProgress(idx)}
              />
            ))}
          </div>

          {/* Footer */}
          {done && (
            <div
              style={{
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #0f200f",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: "#3a7a3a",
                  letterSpacing: "0.12em",
                }}
              >
                ✓ notes generated successfully
              </span>
            </div>
          )}
        </div>
    </>
  );
}
