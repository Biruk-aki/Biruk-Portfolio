import React, { useState, useEffect } from 'react';

// ⚙️ HARDWARE & RTOS TECH STACK FOR MARQUEE
const techMarqueeItems = [
  { name: "Zephyr RTOS", category: "RTOS" },
  { name: "ARM Cortex-M33", category: "MCU" },
  { name: "ESP32-S3", category: "MCU" },
  { name: "RP2350 (Pico 2)", category: "MCU" },
  { name: "NRF52840", category: "Wireless" },
  { name: "CC1352 / 2-FSK", category: "RF" },
  { name: "Embedded C/C++", category: "Lang" },
  { name: "Python HIL / pytest", category: "Testing" },
  { name: "I2C / SPI / UART", category: "Bus" },
  { name: "FreeRTOS", category: "RTOS" },
  { name: "Devicetree / Kconfig", category: "Firmware" },
  { name: "React.js", category: "Frontend" }
];

// 🚀 INFINITE SCROLL MARQUEE COMPONENT
function TechMarquee() {
  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {/* Duplicated array for seamless infinite looping */}
        {[...techMarqueeItems, ...techMarqueeItems].map((item, idx) => (
          <div key={idx} className="marquee-badge">
            <span className="badge-cat">{item.category}</span>
            <span className="badge-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showSecondaryWork, setShowSecondaryWork] = useState(false);

  // Spotlight radial blur effect following mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update active navigation highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'stack'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🌟 TOP FEATURED PROJECTS (Matches GitHub + CV)
  const featuredProjects = [
    {
  title: "Multi-Node Zephyr RTOS Biometric System",
  badge: "PESP Group 7 Project",
  role: "Hardware-In-The-Loop & Driver Lead",
  desc: "Distributed health telemetry platform separating sensor acquisition from data aggregation across two Raspberry Pi Pico 2 microcontrollers.",
  diagram: `[ SENSOR NODE: Pico 2 ] ──I2C (Custom Sensor API)──> [ BASE STATION: Pico 2 ] ──USB-C──> [ TERMINAL ]
   ├── Heart Rate (Analog Sen-KY039HS)                         └── Serial Telemetry
   ├── SpO2 Oximeter (I2C)
   └── Temperature Sensor (I2C)`,
  highlights: [
    "Implemented custom Zephyr Sensor API driver for inter-node I2C data streaming.",
    "Engineered native_sim x86 host unit test suite validating I2C state machine & callback logic (write/read/stop buffers).",
    "Built automated HIL Python test suite (pytest + pyserial) verifying sensor-to-serial telemetry over COM ports."
  ],
  tech: ["Zephyr RTOS", "RP2350 (Pico 2)", "native_sim", "I2C Unit Testing", "pytest", "West / C"],
  github: "https://github.com/Biruk-aki/zephyr-multi-node-health-monitor"
},
    {
      title: "Dyadic Backscatter Communication Optimization",
      badge: "Uppsala Research (WCNES)",
      role: "Research & Firmware Lead",
      desc: "Baud rate optimization (100 kBaud → 50 kBaud) investigating SNR improvements and bit/packet error rate (BER/PER) in passive RF backscatter telemetry.",
      diagram: `[ CW Carrier (NRF52840) ] ──> [ Passive Tag (Pico + Dual CC2500) ] ──(2-FSK)──> [ Receiver (CC1352) ]`,
      highlights: [
        "Collected 15 empirical log datasets across 5 carrier distances and 3 baud rates.",
        "Built automated Python log parsing script handling multi-format SmartRF Studio data.",
        "Validated hardware sync-word packet rejection by injecting single-bit errors."
      ],
      tech: ["Embedded C", "2-FSK Modulation", "NRF52840", "CC1352", "CC2500", "Python Analysis"],
      github: "https://github.com/Biruk-aki"
    },
    {
      title: "ESP32-S3 Smart Actuator Controller",
      badge: "Zephyr RTOS",
      role: "Sole Developer",
      desc: "Multi-threaded Zephyr firmware managing ADC sensor sampling, digital signal filtering, and state machine motor control.",
      diagram: `[ ADC Sensors ] ──> [ 8-Sample Moving Avg Filter ] ──> [ 3-State FSM Controller ] ──> [ PWM Actuators ]`,
      highlights: [
        "Real-time ADC acquisition loop with digital moving average filtering.",
        "Thread synchronization using Zephyr mutexes and message queues.",
        "Driven by a 3-State Finite State Machine (FSM) outputting software PWM."
      ],
      tech: ["C", "Zephyr RTOS", "ESP32-S3", "PWM", "ADC", "FSM"],
      github: "https://github.com/Biruk-aki/ESP32S3-Zephyr-Smart-Controller"
    },
    {
      title: "Environmental & Air Quality Monitoring (IAQ)",
      badge: "Zephyr RTOS & Sensors",
      role: "Sole Developer",
      desc: "Real-time TPHG (Temperature, Pressure, Humidity, Gas) sensing platform for VOC detection using MOX metal-oxide gas sensors.",
      diagram: `[ Zephyr Sensor API ] ──(I2C / Kconfig)──> [ BME680 Sensor (Heater Plate VOC Control) ]`,
      highlights: [
        "Managed sensor heater plate targeting specific temperatures for VOC detection.",
        "Utilized Devicetree overlays and Kconfig to enable Zephyr Sensor API drivers.",
        "Calculated comprehensive Indoor Air Quality (IAQ) scores in real time."
      ],
      tech: ["C", "Zephyr RTOS", "RP2350", "BME680", "I2C", "Devicetree"],
      github: "https://github.com/Biruk-aki/zephyr-bme680-driver"
    }
  ];

  // 📦 SECONDARY / COLLAPSIBLE WORK
  const secondaryProjects = [
    {
      title: "AVR Deterministic Real-Time Scheduler",
      tech: "Embedded C, ATmega, WCET Analysis",
      desc: "Hard real-time task scheduler guaranteeing strict deadline compliance based on Worst-Case Execution Time analysis."
    },
    {
      title: "Thermal Safety Hardware Alert Prototype",
      tech: "Zephyr RTOS, RP2350, Software PWM, Kconfig",
      desc: "Thread-safe alert system using Devicetree overlays and passive buzzer software PWM for high-temperature notifications."
    },
    {
      title: "Contiki-NG & TinyOS Sensor Networking Labs",
      tech: "Contiki-NG, TinyOS, nesC, Embedded C",
      desc: "Low-power Wireless Sensor Network (WSN) prototyping under constrained IoT operating systems."
    },
    {
      title: "Parallel Concurrency & Synchronization Primitives",
      tech: "C++, POSIX Threads, Mutexes, Semaphores",
      desc: "Parallel system benchmark analyzing thread synchronization, race conditions, and shared resource locking."
    }
  ];

  // 💼 WORK EXPERIENCE (From CV)
  const experiences = [
    {
      period: "2024 — 2025",
      role: "Junior Frontend Web Developer",
      company: "Aynalem Electronics",
      desc: "Developed modular and reusable React.js interfaces. Applied strict code review standards and optimized frontend state management logic for high-performance applications.",
      tech: ["React.js", "JavaScript", "Software Quality", "Code Reviews"]
    },
    {
      period: "2023 — 2024",
      role: "Frontend Web Developer",
      company: "Proxima Technologies",
      desc: "Collaborated in an agile Scrum environment using Git version control for high-velocity feature delivery, translating technical requirements into functional software.",
      tech: ["React.js", "Git", "Agile / Scrum", "Documentation"]
    }
  ];

  return (
    <div className="brittany-wrapper">
      {/* MOUSE SPOTLIGHT EFFECT */}
      <div 
        className="spotlight"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      <div className="layout-container">
        
        {/* ================= LEFT COLUMN: FIXED HEADER & NAV ================= */}
        <header className="left-column">
          <div>
            <h1 className="name">Biruk Ambaye</h1>
            <h2 className="role-title">Embedded Systems Engineer</h2>
            <p className="bio-tagline">
              MSc Student @ Uppsala University specializing in low-level C firmware, multi-threaded Zephyr RTOS applications, custom device drivers, and HIL testing.
            </p>

            {/* CV / RESUME DOWNLOAD LINK */}
            <div className="cv-link-box">
              <a href="/Biruk_Ambaye_CV.pdf" target="_blank" rel="noreferrer" className="cv-btn">
                📄 View Full CV / Resume ↗
              </a>
            </div>

            {/* NAV LINKS */}
            <nav className="nav-menu">
              <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                <span className="nav-indicator"></span>
                <span className="nav-text">ABOUT</span>
              </a>
              <a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>
                <span className="nav-indicator"></span>
                <span className="nav-text">EXPERIENCE</span>
              </a>
              <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>
                <span className="nav-indicator"></span>
                <span className="nav-text">PROJECTS</span>
              </a>
              <a href="#stack" className={`nav-link ${activeSection === 'stack' ? 'active' : ''}`}>
                <span className="nav-indicator"></span>
                <span className="nav-text">TECH STACK</span>
              </a>
            </nav>
          </div>

          {/* VECTOR SVG ICON BAR */}
          <div className="social-icon-bar">
            <a href="https://github.com/Biruk-aki" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a href="mailto:akibiruk39@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </header>

        {/* ================= RIGHT COLUMN: SCROLLABLE CONTENT ================= */}
        <main className="right-column">
          
          {/* 🌟 HARDWARE & RTOS INFINITE MARQUEE BANNER */}
          <TechMarquee />

          {/* ABOUT SECTION */}
          <section id="about" className="content-section">
            <p>
              Hi! I'm Biruk, an embedded systems engineer based in Sweden. Currently pursuing my Master's at <span className="text-highlight">Uppsala University</span>, I build low-level C firmware, multi-threaded Zephyr RTOS applications, and custom device drivers.
            </p>
            <p>
              I thrive on the challenge of making hardware deterministic and reliable—from real-time sensor sampling and signal filtering to sub-GHz wireless protocols and automated Python <span className="text-highlight">HIL testing</span>. Having also worked as a frontend developer , I love crafting clean systems that bridge physical electronics seamlessly with host dashboards.
            </p>
          </section>

          {/* PROFESSIONAL EXPERIENCE SECTION */}
          <section id="experience" className="content-section">
            <h3 className="section-label">WORK EXPERIENCE</h3>
            <div className="exp-list">
              {experiences.map((e, idx) => (
                <div key={idx} className="exp-card">
                  <span className="exp-period">{e.period}</span>
                  <div>
                    <h4 className="exp-title">{e.role} • <span className="text-highlight">{e.company}</span></h4>
                    <p className="exp-desc">{e.desc}</p>
                    <div className="tag-list">
                      {e.tech.map((t, tIdx) => (
                        <span key={tIdx} className="pill-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TOP FEATURED PROJECTS */}
          <section id="projects" className="content-section">
            <h3 className="section-label">FEATURED ENGINEERING PROJECTS</h3>
            
            <div className="projects-list">
              {featuredProjects.map((p, idx) => (
                <div key={idx} className="project-card">
                  <div className="card-top">
                    <h4 className="project-name">
                      <a href={p.github} target="_blank" rel="noreferrer">
                        {p.title} <span className="arrow">↗</span>
                      </a>
                    </h4>
                    <span className="badge">{p.badge}</span>
                  </div>

                  <p className="project-role">{p.role}</p>
                  <p className="project-desc">{p.desc}</p>

                  <div className="diagram-box">
                    <pre className="diagram-text">{p.diagram}</pre>
                  </div>

                  <ul className="highlights">
                    {p.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>

                  <div className="tag-list">
                    {p.tech.map((t, tIdx) => (
                      <span key={tIdx} className="pill-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 📦 COLLAPSIBLE SECONDARY TECHNICAL WORK */}
            <div className="secondary-work-box">
              <button 
                className="toggle-secondary-btn"
                onClick={() => setShowSecondaryWork(!showSecondaryWork)}
              >
                {showSecondaryWork ? "▲ Hide Secondary Work & Labs" : "▼ View Other Technical Work & Labs"}
              </button>

              {showSecondaryWork && (
                <div className="secondary-list">
                  {secondaryProjects.map((s, idx) => (
                    <div key={idx} className="secondary-card">
                      <h5 className="secondary-title">{s.title}</h5>
                      <span className="secondary-tech">{s.tech}</span>
                      <p className="secondary-desc">{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* TECH STACK MATRIX */}
<section id="stack" className="content-section">
  <h3 className="section-label">TECHNICAL SKILLS MATRIX</h3>
  <div className="stack-grid">
    <div className="stack-card">
      <h4>Microcontrollers & Hardware</h4>
      <p>ARM Cortex-M33 (RP2350), ESP32-S3, AVR ATmega, NRF52840, CC1352, CC2500</p>
    </div>
    <div className="stack-card">
      <h4>RTOS & Protocols</h4>
      <p>Zephyr RTOS, FreeRTOS, Custom Drivers, I2C, SPI, UART, CAN Bus, Sub-GHz Wireless</p>
    </div>
    <div className="stack-card">
      <h4>Testing & Verification</h4>
      <p>Zephyr native_sim, Host Unit Testing (ZTest), Python HIL (pytest + pyserial), Oscilloscopes, Logic Analyzers, GDB, Git</p>
    </div>
  </div>
</section>

          <footer className="right-footer">
            <p>Designed & Built by Biruk Ambaye • Uppsala University • 2026</p>
          </footer>

        </main>

      </div>
    </div>
  );
}