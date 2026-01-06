'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import type { ProjectCategory } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// カウントアップコンポーネント
function CountUp({ end, suffix = '', decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, decimals]);

  return (
    <div ref={ref} className="stat-v">
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </div>
  );
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const { scrollYProgress } = useScroll();
  
  const yPosAnim = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgY = useTransform(yPosAnim, [0, 1], ['15%', '25%']);

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'enterprise', label: 'Enterprise PM' },
    { key: 'product', label: 'Product' },
    { key: 'infrastructure', label: 'Infra/SRE' },
    { key: 'technical', label: 'Technical' },
  ];

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main>
      {/* 動的背景 */}
      <motion.div
        className="bg-gradient"
        style={{
          y: bgY,
        }}
      />

      {/* Top Nav */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="brand">
            H・M
          </a>
          <nav className="nav-links">
            <a href="#role">Role Definition</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact" className="pill">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero - EY想定版：役割定義ブロック */}
      <section id="top" className="hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p className="kicker" variants={fadeUp}>
              Enterprise Technical Project Manager
            </motion.p>

            <motion.h1 className="hero-title" variants={fadeUp}>
              I help enterprise B2B teams move from PoC to stable production
            </motion.h1>

            <motion.div className="role-definition" variants={fadeUp}>
              <div className="role-item">
                <div className="role-label">What I solve</div>
                <div className="role-value">
                  Projects that are technically complete but cannot move to production due to ambiguous requirements,
                  quality disputes, or operational risks
                </div>
              </div>
              <div className="role-item">
                <div className="role-label">What makes me different</div>
                <div className="role-value">
                  Not project tracking, but decision design that prevents projects from stalling after development is
                  technically complete
                </div>
              </div>
              <div className="role-item">
                <div className="role-label">Scope of responsibility</div>
                <div className="role-value">From requirement ambiguity through production operation</div>
              </div>
            </motion.div>

            <motion.p className="hero-desc" variants={fadeUp}>
              17 years of enterprise PM experience in manufacturing (precision: 0.01mm, failure cost constraints) ×
              Technology delivery (24/7 operations). I design trade-offs and move projects forward under ambiguous
              requirements, complex stakeholders, and high failure costs.
            </motion.p>

            <motion.div className="cta" variants={fadeUp}>
              <a className="btn primary pulse" href="mailto:xzengbu@gmail.com">
                Schedule Conversation
              </a>
              <a className="btn ghost" href="#projects">
                View Representative Projects →
              </a>
              <a className="btn ghost" href="https://github.com/rancorder" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </motion.div>

            {/* Operational Highlights - 運用実績を最前列化 */}
            <motion.div className="operational-highlights" variants={fadeUp}>
              <div className="op-header">Operational Highlights</div>
              <div className="stats-operational">
                <motion.div className="stat-op" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <CountUp end={99.7} suffix="%" decimals={1} />
                  <div className="stat-l">Uptime (19+ days continuous monitoring)</div>
                </motion.div>
                <motion.div className="stat-op" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <CountUp end={45} suffix="+ days" />
                  <div className="stat-l">Single-site production jobs (no interruption)</div>
                </motion.div>
                <motion.div className="stat-op" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                  <div className="stat-v">Circuit Breakers</div>
                  <div className="stat-l">Designed with failure isolation</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Traditional Stats */}
            <motion.div className="stats" variants={fadeUp}>
              <motion.div className="stat" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <CountUp end={17} suffix=" years" />
                <div className="stat-l">Enterprise PM Experience</div>
              </motion.div>
              <motion.div className="stat" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <CountUp end={21} suffix=" SKUs" />
                <div className="stat-l">Simultaneous Launch (max scale)</div>
              </motion.div>
              <motion.div className="stat" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <CountUp end={11} suffix=" months" />
                <div className="stat-l">24/7 Production Operation</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Role Clarification - やらないこと明示 + PM誤解防止 */}
      <section id="role" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              What I intentionally do NOT optimize for
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              Clarity on boundaries = Trust in execution
            </motion.p>

            <motion.div className="not-optimize-grid" variants={stagger}>
              <motion.div className="card" variants={fadeUp}>
                <div className="mini-title">Micromanaging task boards</div>
                <p className="muted">
                  I manage projects primarily through decision clarity and ownership design, not through excessive
                  tooling. Tools are introduced only when they reduce cognitive load.
                </p>
              </motion.div>

              <motion.div className="card" variants={fadeUp}>
                <div className="mini-title">Velocity-only delivery without operational ownership</div>
                <p className="muted">
                  I take responsibility from requirement ambiguity through production operation. Delivery speed means
                  nothing if systems cannot run in production.
                </p>
              </motion.div>

              <motion.div className="card" variants={fadeUp}>
                <div className="mini-title">PoCs with no clear production intent</div>
                <p className="muted">
                  Every technical decision is made with production operation in mind. PoCs without operational
                  feasibility design waste resources.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="pm-clarification" variants={fadeUp}>
              <div className="pm-clarification-inner">
                <div className="pm-icon">💡</div>
                <div>
                  <div className="pm-clarification-title">My PM Approach</div>
                  <p className="pm-clarification-text">
                    I manage projects primarily through decision clarity and ownership design, not through excessive
                    tooling. Tools (JIRA, Asana, etc.) are introduced only when they reduce cognitive load. My value is
                    in designing decisions that prevent projects from stalling after development is technically
                    complete.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              Representative Projects
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              Context → Structural Problem → Decision Design → Production Result
            </motion.p>

            <motion.div className="filters" variants={fadeUp}>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`chip ${activeCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={stagger}
                className="grid"
              >
                {filtered.map((p) => (
                  <motion.article
                    key={p.id}
                    className="card"
                    variants={fadeUp}
                    layout
                    whileHover={{
                      y: -8,
                      boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-head">
                      <h3 className="project-title">{p.title}</h3>
                      <span className="badge">{p.category}</span>
                    </div>

                    <p className="project-desc">{p.description}</p>

                    {p.pmDecisions && p.pmDecisions.length > 0 ? (
                      <div className="pm-box">
                        <div className="pm-title">Decision Design</div>
                        <ul className="pm-list">
                          {p.pmDecisions.map((d, idx) => (
                            <li key={idx}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="two-col">
                      <div>
                        <div className="mini-title">Production Result</div>
                        <ul className="list">
                          {p.highlights.map((h, idx) => (
                            <li key={idx}>{h}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="mini-title">Tech</div>
                        <div className="tags">
                          {p.technologies.map((t) => (
                            <span className="tag" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                        {p.links && (
                          <div className="project-links">
                            {p.links.github && (
                              <a
                                href={p.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="project-link"
                              >
                                GitHub →
                              </a>
                            )}
                            {p.links.demo && (
                              <a
                                href={p.links.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="project-link"
                              >
                                Demo →
                              </a>
                            )}
                            {p.links.article && (
                              <a
                                href={p.links.article}
                                target="_blank"
                                rel="noreferrer"
                                className="project-link"
                              >
                                Article →
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Skills - "Used for" 形式 */}
      <section id="skills" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              Skills
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              Not "what I can do" but "how I use them to solve problems"
            </motion.p>

            <motion.div className="grid skills" variants={stagger}>
              {skills.map((g) => (
                <motion.div
                  key={g.category}
                  className="card"
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mini-title">{g.category}</div>
                  <ul className="list">
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact - EY向けCTA */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              If your project is technically complete but cannot move to production
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              I'm happy to have a conversation
            </motion.p>

            <motion.div className="contact-card" variants={fadeUp}>
              <div className="contact-left">
                <div className="mini-title">Contact</div>
                <p className="muted">
                  Brief context about your project helps — I can propose the best approach from both manufacturing PM
                  and technical PM perspectives.
                </p>
              </div>
              <div className="contact-right">
                <a className="btn primary pulse" href="mailto:xzengbu@gmail.com">
                  xzengbu@gmail.com
                </a>
                <a className="btn ghost" href="https://github.com/rancorder" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="muted">© {new Date().getFullYear()} H・M</span>
        </div>
      </footer>

      {/* Styles */}
      <style jsx global>{`
        :root {
          --bg: #05070f;
          --panel: rgba(255, 255, 255, 0.06);
          --panel-2: rgba(255, 255, 255, 0.04);
          --border: rgba(255, 255, 255, 0.12);
          --text: rgba(255, 255, 255, 0.92);
          --muted: rgba(255, 255, 255, 0.68);
          --muted2: rgba(255, 255, 255, 0.55);
          --accent: #7c3aed;
          --accent2: #22c55e;
          --shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        html,
        body {
          height: 100%;
        }

        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
        }

        .bg-gradient {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          background: radial-gradient(1200px 800px at 15% 10%, rgba(124, 58, 237, 0.22), transparent 60%),
            radial-gradient(900px 700px at 80% 25%, rgba(34, 197, 94, 0.16), transparent 55%);
          animation: gradientShift 15s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .container {
          width: min(1100px, calc(100% - 40px));
          margin: 0 auto;
        }

        .muted {
          color: var(--muted);
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(12px) saturate(180%);
          background: rgba(5, 7, 15, 0.7);
          border-bottom: 1px solid var(--border);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
        }

        .brand {
          font-weight: 800;
          letter-spacing: 0.3px;
          transition: color 0.2s ease;
        }

        .brand:hover {
          color: var(--accent);
        }

        .nav-links {
          display: flex;
          gap: 16px;
          align-items: center;
          color: var(--muted);
          font-size: 14px;
        }

        .nav-links a {
          transition: color 0.2s ease;
        }

        .nav-links a:hover {
          color: var(--text);
        }

        .pill {
          padding: 8px 14px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--panel-2);
          transition: all 0.2s ease;
        }

        .pill:hover {
          background: var(--panel);
          border-color: rgba(255, 255, 255, 0.22);
        }

        .hero {
          padding: 100px 0 60px;
        }

        .kicker {
          margin: 0 0 12px;
          font-weight: 700;
          color: var(--muted2);
          font-size: 15px;
        }

        .hero-title {
          margin: 0;
          font-size: clamp(32px, 3.5vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--text), rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          margin: 20px 0 0;
          font-size: 17px;
          color: var(--muted);
          line-height: 1.7;
        }

        .hero-desc {
          margin: 12px 0 0;
          font-size: 15px;
          color: var(--muted2);
          line-height: 1.8;
          max-width: 900px;
        }

        /* 🆕 Role Definition Block */
        .role-definition {
          margin: 32px 0;
          padding: 28px;
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 20px;
        }

        .role-item {
          margin-bottom: 20px;
        }

        .role-item:last-child {
          margin-bottom: 0;
        }

        .role-label {
          font-weight: 900;
          font-size: 12px;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }

        .role-value {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
        }

        /* 🆕 Operational Highlights */
        .operational-highlights {
          margin-top: 40px;
          padding: 32px;
          border: 2px solid rgba(124, 58, 237, 0.4);
          background: rgba(124, 58, 237, 0.08);
          border-radius: 20px;
        }

        .op-header {
          font-weight: 900;
          font-size: 14px;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          text-align: center;
        }

        .stats-operational {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-op {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 18px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
          text-align: center;
        }

        .stat-op:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.22);
        }

        .cta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding: 0 20px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--panel-2);
          color: var(--text);
          font-weight: 700;
          font-size: 14px;
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .btn:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.28);
        }

        .btn.primary {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(34, 197, 94, 0.6));
          border-color: transparent;
          box-shadow: 0 12px 40px rgba(124, 58, 237, 0.4);
        }

        .btn.primary:hover {
          box-shadow: 0 18px 60px rgba(124, 58, 237, 0.5);
        }

        .btn.pulse {
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.4);
          }
          50% {
            box-shadow: 0 18px 60px rgba(124, 58, 237, 0.6);
          }
        }

        .btn.ghost {
          background: var(--panel-2);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 32px;
        }

        .stat {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 18px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .stat:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.22);
        }

        .stat-v {
          font-weight: 900;
          font-size: 32px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-l {
          margin-top: 8px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
        }

        .section {
          padding: 120px 0;
        }

        .section-title {
          margin: 0;
          font-size: 32px;
          letter-spacing: -0.01em;
          font-weight: 800;
        }

        .section-sub {
          margin: 12px 0 0;
          color: var(--muted);
          line-height: 1.7;
          font-size: 16px;
        }

        .grid {
          margin-top: 32px;
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .card {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        /* 🆕 Not Optimize Grid */
        .not-optimize-grid {
          margin-top: 32px;
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        /* 🆕 PM Clarification Box */
        .pm-clarification {
          margin-top: 40px;
          padding: 32px;
          border: 1px solid rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.06);
          border-radius: 20px;
        }

        .pm-clarification-inner {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .pm-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .pm-clarification-title {
          font-weight: 900;
          font-size: 16px;
          margin-bottom: 12px;
          color: var(--accent2);
        }

        .pm-clarification-text {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
          font-size: 14px;
        }

        .filters {
          margin-top: 24px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .chip {
          border: 1px solid var(--border);
          background: var(--panel-2);
          color: var(--muted);
          border-radius: 999px;
          padding: 10px 16px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .chip:hover {
          border-color: rgba(255, 255, 255, 0.28);
          background: var(--panel);
        }

        .chip.active {
          color: var(--text);
          background: rgba(124, 58, 237, 0.32);
          border-color: rgba(124, 58, 237, 0.5);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.25);
        }

        .project-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .project-title {
          margin: 0;
          font-size: 18px;
          line-height: 1.4;
          font-weight: 700;
        }

        .badge {
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: rgba(255, 255, 255, 0.04);
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
        }

        .project-desc {
          margin: 16px 0 0;
          color: var(--muted);
          line-height: 1.75;
          font-size: 14px;
        }

        .pm-box {
          margin-top: 20px;
          padding: 20px;
          border-radius: 16px;
          border: 1px solid rgba(124, 58, 237, 0.4);
          background: rgba(124, 58, 237, 0.14);
          position: relative;
        }

        .pm-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.5), rgba(34, 197, 94, 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          animation: pmGlow 3s ease-in-out infinite;
        }

        @keyframes pmGlow {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .pm-title {
          font-weight: 900;
          margin-bottom: 12px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pm-list {
          margin: 0;
          padding-left: 20px;
          color: var(--muted);
          line-height: 1.8;
          font-size: 13px;
        }

        .pm-list li {
          margin-bottom: 8px;
        }

        .pm-list li:last-child {
          margin-bottom: 0;
        }

        .two-col {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 20px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        .mini-title {
          font-weight: 900;
          font-size: 13px;
          color: var(--text);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .list {
          margin: 0;
          padding-left: 20px;
          color: var(--muted);
          line-height: 1.75;
          font-size: 13px;
        }

        .list li {
          margin-bottom: 8px;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: rgba(255, 255, 255, 0.03);
          transition: all 0.2s ease;
        }

        .tag:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .project-links {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .project-link {
          font-size: 13px;
          color: var(--accent);
          font-weight: 700;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        .project-link:hover {
          color: var(--accent2);
          transform: translateX(4px);
        }

        .grid.skills {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .contact-card {
          margin-top: 32px;
          display: flex;
          gap: 24px;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(34, 197, 94, 0.1));
          border-radius: 20px;
          padding: 32px;
        }

        .contact-left {
          min-width: 280px;
          flex: 1;
        }

        .contact-right {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer {
          border-top: 1px solid var(--border);
          padding: 32px 0;
          color: var(--muted);
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 860px) {
          .stats {
            grid-template-columns: 1fr;
          }
          .stats-operational {
            grid-template-columns: 1fr;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .grid.skills {
            grid-template-columns: 1fr;
          }
          .not-optimize-grid {
            grid-template-columns: 1fr;
          }
          .two-col {
            grid-template-columns: 1fr;
          }
          .nav-links {
            gap: 12px;
          }
          .section {
            padding: 80px 0;
          }
        }
      `}</style>
    </main>
  );
}
