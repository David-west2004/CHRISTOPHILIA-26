import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function App() {
  // 0: Gate, 1: RSVP Prompt, 2: Verification Pending, 3: Ticket Pass
  const [stage, setStage] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  const LUMA_URL = "https://luma.com/2ugi4qzs";

  const dodgeAlerts = [
    "B. Am not coming",
    "B. Destination Unreachable",
    "B. Not an option",
    "B. Still dodging...",
    "B. You must be there",
    "B. Access denied 😉"
  ];

  const handleDodge = () => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.floor(Math.random() * 150) + 120;
    setNoPos({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance
    });
    setDodgeCount((prev) => prev + 1);
  };

  const handleYes = () => {
    // Elegant celebration burst
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#d4af37", "#ffffff", "#854d0e"]
    });

    // Open Luma registration in a new tab
    window.open(LUMA_URL, "_blank", "noopener,noreferrer");

    // Advance to the registration completion check
    setStage(2);
  };

  const handleConfirmedRegistration = () => {
    // Second burst on final ticket reveal
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#d4af37", "#ffffff", "#854d0e"]
    });
    setStage(3);
  };

  return (
    <div className="min-vh-100 w-100 d-flex align-items-center justify-content-center p-3 position-relative overflow-hidden">
      <div className="bg-vignette" />

      <div className="container position-relative" style={{ maxWidth: "560px", zIndex: 10 }}>
        <AnimatePresence mode="wait">

          {/* STAGE 0: ENVELOPE / SEAL ENTRANCE */}
          {stage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-card p-4 p-md-5 text-center"
            >
              <img
                src="/christophilia.jpeg"
                alt="Christophilia '26"
                className="rounded-circle border border-warning shadow-sm mb-4"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  objectPosition: "50% 35%",
                  borderColor: "var(--gold)"
                }}
              />

              <div className="text-uppercase text-secondary small tracking-widest fw-semibold mb-2" style={{ letterSpacing: "0.25em" }}>
                Official Gathering
              </div>

              <h1 className="font-cinzel text-white fw-bold mb-0 text-break responsive-title">
                CHRISTOPHILIA&apos;26
              </h1>

              <div className="gold-divider" />

              <p className="text-secondary small line-height-lg px-md-3 mb-4">
                Experience five days of divine encounter from 7th – 11th October 2026. A national congress immersed in worship and revival—featuring
                life-changing messages, practical workshops, deep Bible study, and purposeful networking.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStage(1)}
                className="btn btn-outline-warning text-uppercase px-4 py-3 small fw-bold"
                style={{ letterSpacing: "0.15em", fontSize: "0.8rem", borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                Proceed to RSVP <i className="bi bi-arrow-right ms-2" />
              </motion.button>
            </motion.div>
          )}

          {/* STAGE 1: THE EVASIVE DECISION SCREEN */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-card p-4 p-md-5 text-center"
            >
              <span className="text-uppercase text-secondary small fw-semibold" style={{ letterSpacing: "0.2em" }}>
                Confirmation Required
              </span>

              <h2 className="font-cinzel text-white fs-3 fw-bold mt-2 mb-0">
                Will you be present?
              </h2>

              <div className="gold-divider" />

              <p className="text-secondary small mb-5">
                Select your status below to register your attendance.
              </p>

              <div className="position-relative d-flex flex-wrap align-items-center justify-content-center gap-3 py-2" style={{ minHeight: "140px" }}>

                {/* OPTION A: STABLE YES BUTTON */}
                <motion.button
                  onClick={handleYes}
                  animate={{ scale: 1 + dodgeCount * 0.07 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  whileHover={{ scale: 1.05 + dodgeCount * 0.07 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn btn-warning rounded-0 px-4 py-3 fw-bold text-dark text-uppercase shadow-sm"
                  style={{
                    letterSpacing: "0.08em",
                    fontSize: "0.85rem",
                    backgroundColor: "var(--gold)",
                    borderColor: "var(--gold)",
                    zIndex: 5
                  }}
                >
                  <i className="bi bi-check2 me-2" />
                  A. Yes, I would be there
                </motion.button>

                {/* OPTION B: EVASIVE RUNAWAY BUTTON */}
                <motion.button
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  onMouseEnter={handleDodge}
                  onTouchStart={handleDodge}
                  className="btn btn-outline-secondary rounded-0 px-4 py-3 small text-uppercase text-nowrap"
                  style={{
                    letterSpacing: "0.08em",
                    fontSize: "0.85rem",
                    zIndex: 4,
                    borderColor: "rgba(255,255,255,0.2)"
                  }}
                >
                  {dodgeAlerts[Math.min(dodgeCount, dodgeAlerts.length - 1)]}
                </motion.button>
              </div>

              {dodgeCount > 0 && (
                <div className="mt-4 text-secondary small fst-italic" style={{ opacity: 0.6 }}>
                  Option B seems unwilling to cooperate.
                </div>
              )}
            </motion.div>
          )}

          {/* STAGE 2: STEP COMPLETION / VERIFICATION GATE */}
          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-card p-4 p-md-5 text-center"
            >
              <div className="text-warning mb-3">
                <i className="bi bi-box-arrow-up-right fs-1" />
              </div>

              <span className="text-uppercase text-secondary small fw-semibold" style={{ letterSpacing: "0.2em" }}>
                Final Step
              </span>

              <h2 className="font-cinzel text-white fs-3 fw-bold mt-2 mb-0">
                Complete Your Registration
              </h2>

              <div className="gold-divider" />

              <p className="text-secondary small line-height-lg mb-4">
                We opened the official registration page in a new tab. Once you have submitted your details on Luma, confirm below to reveal your pass.
              </p>

              <div className="d-flex flex-column gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirmedRegistration}
                  className="btn btn-warning rounded-0 py-3 fw-bold text-dark text-uppercase shadow-sm"
                  style={{
                    letterSpacing: "0.1em",
                    fontSize: "0.85rem",
                    backgroundColor: "var(--gold)",
                    borderColor: "var(--gold)"
                  }}
                >
                  <i className="bi bi-check-circle-fill me-2" />
                  I Have Completed Registration
                </motion.button>

                <a
                  href={LUMA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary small text-decoration-none"
                  style={{ opacity: 0.75, fontSize: "0.78rem" }}
                >
                  Tab didn&apos;t open? <span className="text-warning text-decoration-underline">Click here to register on Luma</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: SEAT ALLOCATED CONFIRMATION PASS */}
          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-card p-4 p-md-5 text-center"
            >
              <div className="text-warning mb-3">
                <i className="bi bi-shield-check display-5" />
              </div>

              <div className="text-uppercase text-secondary small fw-semibold" style={{ letterSpacing: "0.25em" }}>
                Seat Allocated
              </div>

              <h2 className="font-cinzel text-white fs-3 fw-bold mt-1 mb-0">
                Welcome to CHRISTOPHILIA
              </h2>

              <div className="gold-divider" />

              <p className="text-secondary small line-height-lg mb-4">
                Your presence has been locked in. Prepare for an exceptional time in fellowship.
              </p>

              <div className="border border-secondary-subtle p-3 text-start bg-black bg-opacity-40">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-secondary text-uppercase" style={{ letterSpacing: "0.1em" }}>
                    Event Pass
                  </span>
                  <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-0 small">
                    CONFIRMED
                  </span>
                </div>
                <div className="font-cinzel text-white small fw-bold mb-1">
                  CHRISTOPHILIA&apos;26
                </div>
                <div className="text-secondary small fw-medium" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                  TIMELESS CHRIST: TRANSFORMING CAMPUS AND CULTURE
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}