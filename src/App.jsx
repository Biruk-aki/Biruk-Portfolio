import React, { useState } from 'react';

export default function App() {
  const [showSecondaryWork, setShowSecondaryWork] = useState(false);

  // 🌟 TOP FEATURED PROJECTS
  const featuredProjects = [
    {
      title: "ESP32-S3 BLE Macro Knob Controller",
      badge: "Zephyr RTOS & BLE HID",
      role: "Sole Developer",
      desc: "Driverless Bluetooth Low Energy desktop controller using HOGP for real-time volume scrubbing, mouse scrolling, and display brightness control.",
      diagram: `[ Potentiometer (ADC) ] ──> [ EMA Filter ] ──> [ 3-Mode FSM ] ──> [ BLE Composite HID ]
[ 3x Push Buttons     ] ──> [ Debounce   ] ──────────────────────────┤
                                                                     └── [ Status LED WorkQ ]`,
      highlights: [
        "Built composite BLE HID profile (Consumer Control + Mouse Wheel) for native plug-and-play across OS platforms.",
        "Filtered analog potentiometer noise using 12 dB ADC attenuation, a 1st-order EMA filter, and dynamic deadbands.",
        "Created a non-blocking 3-mode state machine with asynchronous LED blink feedback using Zephyr work queues."
      ],
      tech: ["Zephyr RTOS", "ESP32-S3", "BLE HOGP", "ADC", "C"],
      github: "https://github.com/Biruk-aki/esp32s3-ble-macro-knob"
    },
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
        "Engineered native_sim x86 host unit test suite validating I2C state machine & callback logic.",
        "Built automated HIL Python test suite (pytest + pyserial) verifying sensor-to-serial telemetry."
      ],
      tech: ["Zephyr RTOS", "RP2350 (Pico 2)", "native_sim", "I2C Unit Testing", "pytest", "pyserial", "C"],
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
      desc: "Real-time TPHG sensing platform for VOC detection using MOX metal-oxide gas sensors.",
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

  // 📦 SECONDARY WORK
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

  // 💼 CONDENSED WORK EXPERIENCE
  const experiences = [
    {
      period: "2024 — 2025",
      role: "Junior Frontend Web Developer",
      company: "Aynalem Electronics",
      desc: "Developed modular React.js user interfaces, applying strict software quality standards and state management optimization.",
      tech: ["React.js", "JavaScript", "Software Quality"]
    },
    {
      period: "2023 — 2024",
      role: "Frontend Web Developer",
      company: "Proxima Technologies",
      desc: "Collaborated in an agile Scrum environment using Git version control for feature delivery and documentation.",
      tech: ["React.js", "Git", "Agile / Scrum"]
    }
  ];

  return (
    <div className="v4-wrapper">
      
      {/* 🔝 TOP NAVIGATION BAR */}
      <nav className="v4-navbar">
        <div className="nav-logo">
          <a href="#">
            <svg viewBox="0 0 100 100" width="40" height="40">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#64ffda" strokeWidth="6" />
              <text x="50" y="62" fill="#64ffda" fontSize="36" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">B</text>
            </svg>
          </a>
        </div>

        <div className="nav-links">
          <ol>
            <li><a href="#about"><span className="num">01.</span> About</a></li>
            <li><a href="#skills"><span className="num">02.</span> Skills</a></li>
            <li><a href="#projects"><span className="num">03.</span> Projects</a></li>
            <li><a href="#experience"><span className="num">04.</span> Experience</a></li>
          </ol>
          <a 
            href="/Biruk_Ambaye_Resume.pdf" 
            target="_blank" 
            rel="noreferrer" 
            className="resume-btn"
          >
            Resume
          </a>
        </div>
      </nav>

      {/* ⬅️ LEFT FIXED SOCIAL SIDEBAR */}
      <div className="side-left">
        <ul className="social-links">
          <li>
            <a href="https://github.com/Biruk-aki" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </li>
        </ul>
        <div className="side-line"></div>
      </div>

      {/* ➡️ RIGHT FIXED EMAIL SIDEBAR */}
      <div className="side-right">
        <div className="email-wrapper">
          <a href="mailto:akibiruk39@gmail.com">akibiruk39@gmail.com</a>
        </div>
        <div className="side-line"></div>
      </div>

      {/* 🎯 MAIN CONTENT CONTAINER */}
      <main className="v4-main-content">

        {/* HERO SECTION */}
        <section className="hero-section">
          <p className="hero-intro">Hi, my name is</p>
          <h1 className="hero-title">Biruk Ambaye.</h1>
          <h2 className="hero-subtitle">I build firmware & real-time systems.</h2>
          <p className="hero-description">
            I'm an embedded systems engineer based in Sweden, pursuing my Master's at <span className="highlight">Uppsala University</span>. I specialize in low-level C firmware, multi-threaded Zephyr RTOS applications, custom drivers, and automated HIL testing.
          </p>
          <div className="hero-cta" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <a href="mailto:akibiruk39@gmail.com" className="cta-btn">Get In Touch</a>
            <a href="/Biruk_Ambaye_Resume.pdf" target="_blank" rel="noreferrer" className="cta-btn" style={{ background: 'transparent', border: '1px solid #64ffda', color: '#64ffda' }}>View Resume</a>
          </div>
        </section>

        {/* 01. ABOUT SECTION */}
        <section id="about" className="v4-section">
          <h2 className="section-heading"><span className="num">01.</span> About Me</h2>
          <div className="about-content">
            <p>
              My core work centers on making hardware reliable and deterministic. I handle real-time sensor processing, signal filtering, Bluetooth Low Energy (HOGP) protocols, sub-GHz RF communications, and automated HIL testing using Python.
            </p>
            <p>
              Having also developed software, I enjoy connecting physical embedded devices with clean host dashboards.
            </p>
          </div>
        </section>

        {/* 02. EMBEDDED SKILLS */}
        <section id="skills" className="v4-section">
          <h2 className="section-heading"><span className="num">02.</span> Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h4>Microcontrollers & Architectures</h4>
              <p>ARM Cortex-M33 (RP2350), ESP32-S3 (Xtensa LX7), NRF52840, CC1352, AVR ATmega</p>
            </div>
            <div className="skill-card">
              <h4>RTOS & Firmware</h4>
              <p>Zephyr RTOS, FreeRTOS, Custom Drivers, Devicetree Overlays, Kconfig, Thread Synchronization</p>
            </div>
            <div className="skill-card">
              <h4>Testing & Simulation</h4>
              <p>Zephyr native_sim (Host Unit Testing), Python HIL (pytest + pyserial), Oscilloscopes, Logic Analyzers</p>
            </div>
            <div className="skill-card">
              <h4>Protocols & Wireless</h4>
              <p>BLE HOGP (Composite HID), I2C, SPI, UART, CAN Bus, 2-FSK Sub-GHz Wireless, Backscatter Telemetry</p>
            </div>
          </div>
        </section>

        {/* 03. FEATURED PROJECTS */}
        <section id="projects" className="v4-section">
          <h2 className="section-heading"><span className="num">03.</span> Featured Projects</h2>
          <div className="v4-projects-list">
            {featuredProjects.map((p, idx) => (
              <div key={idx} className="v4-project-card">
                <div className="card-header">
                  <span className="badge">{p.badge}</span>
                  <h3 className="project-title">
                    <a href={p.github} target="_blank" rel="noreferrer">{p.title} ↗</a>
                  </h3>
                  <p className="project-role">{p.role}</p>
                </div>
                
                <p className="project-desc">{p.desc}</p>

                <div className="diagram-box">
                  <pre>{p.diagram}</pre>
                </div>

                <ul className="project-highlights">
                  {p.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>

                <div className="tech-tags">
                  {p.tech.map((t, tIdx) => (
                    <span key={tIdx} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SECONDARY LABS COLLAPSIBLE */}
          <div className="secondary-wrapper">
            <button 
              className="secondary-toggle"
              onClick={() => setShowSecondaryWork(!showSecondaryWork)}
            >
              {showSecondaryWork ? "▲ Hide Secondary Work & Labs" : "▼ View Other Technical Work & Labs"}
            </button>

            {showSecondaryWork && (
              <div className="secondary-grid">
                {secondaryProjects.map((s, idx) => (
                  <div key={idx} className="secondary-item">
                    <h5>{s.title}</h5>
                    <span className="sec-tech">{s.tech}</span>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 04. OTHER EXPERIENCE */}
        <section id="experience" className="v4-section">
          <h2 className="section-heading"><span className="num">04.</span> Other Technical Experience</h2>
          <div className="exp-list">
            {experiences.map((e, idx) => (
              <div key={idx} className="exp-item">
                <div className="exp-meta">
                  <span className="period">{e.period}</span>
                  <h4>{e.role} • <span className="company">{e.company}</span></h4>
                </div>
                <p className="exp-desc">{e.desc}</p>
                <div className="tech-tags">
                  {e.tech.map((t, tIdx) => (
                    <span key={tIdx} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="v4-footer">
          <p>Designed & Built by Biruk Ambaye • 2026</p>
        </footer>

      </main>

    </div>
  );
}