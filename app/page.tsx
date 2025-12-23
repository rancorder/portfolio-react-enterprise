'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import type { ProjectCategory } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'backend', label: 'Backend' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'infrastructure', label: 'Infra/SRE' },
    { key: 'ml', label: 'ML/AI' },
  ];

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main>
      {/* Top Nav */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="brand">
            rancorder
          </a>
          <nav className="nav-links">
            <a href="#why">Why PM</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact" className="pill">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="hero">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p className="kicker" variants={fadeUp}>
              H・M
            </motion.p>

            <motion.h1 className="hero-title" variants={fadeUp}>
              エンタープライズB2Bで、要件を“壊さず前に進める”Technical PM
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              要件定義・品質設計・運用判断を17年。実装と本番運用まで見通して意思決定します。
            </motion.p>

            <motion.p className="hero-desc" variants={fadeUp}>
              曖昧な要件、複雑なステークホルダー、失敗コストの高い制約下でも、
              優先順位とトレードオフを設計し、プロジェクトを前に進めてきました。
            </motion.p>

            <motion.div className="cta" variants={fadeUp}>
              <a className="btn primary" href="mailto:xzengbu@gmail.com">
                面談・相談する
              </a>
              <a className="btn ghost" href="#projects">
                代表実績を見る →
              </a>
              <a className="btn ghost" href="https://github.com/rancorder" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </motion.div>

            <motion.div className="stats" variants={fadeUp}>
              <div className="stat">
                <div className="stat-v">17年</div>
                <div className="stat-l">エンタープライズPM経験</div>
              </div>
              <div className="stat">
                <div className="stat-v">21品番</div>
                <div className="stat-l">同時立上げ（最大）</div>
              </div>
              <div className="stat">
                <div className="stat-v">11ヶ月</div>
                <div className="stat-l">24/7本番運用（連続）</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why PM */}
      <section id="why" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              Why Product Manager
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              技術だけでは前に進まない領域を、意思決定で通す
            </motion.p>

            <motion.div className="card why" variants={fadeUp}>
              <p>
                技術だけでは、プロダクトは前に進みません。要件・品質・運用の「間」で、
                何を採り、何を捨てるかを決める役割が必要です。
              </p>
              <p>
                私は17年間、失敗コストの高いエンタープライズ案件で、
                要件定義・合意形成・品質設計を担い、進め切る意思決定をしてきました。
                その経験をテクノロジー領域のPMとして提供します。
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              代表実績（意思決定と運用）
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              要件・品質・運用のトレードオフをどう捌いたか
            </motion.p>

            <motion.div className="filters" variants={fadeUp}>
              {categories.map((c) => (
                <button
                  key={c.key}
                  className={`chip ${activeCategory === c.key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </motion.div>

            <motion.div className="grid" variants={stagger}>
              {filtered.map((p) => (
                <motion.article key={p.id} className="card project" variants={fadeUp}>
                  <div className="project-head">
                    <h3 className="project-title">{p.title}</h3>
                    <span className="badge">{p.category}</span>
                  </div>

                  <p className="project-desc">{p.description}</p>

                  {p.pmDecisions?.length ? (
                    <div className="pm-box">
                      <div className="pm-title">PMとしての判断</div>
                      <ul className="pm-list">
                        {p.pmDecisions.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="two-col">
                    <div>
                      <div className="mini-title">成果</div>
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
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              Skills
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              「できること」より「どう判断するか」を中心に
            </motion.p>

            <motion.div className="grid skills" variants={stagger}>
              {skills.map((g) => (
                <motion.div key={g.category} className="card" variants={fadeUp}>
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

      {/* Contact */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.h2 className="section-title" variants={fadeUp}>
              詰まりやすい案件を、前に進めます
            </motion.h2>
            <motion.p className="section-sub" variants={fadeUp}>
              要件が曖昧 / 品質で揉める / 運用が怖い —— その詰まりを整理して意思決定します
            </motion.p>

            <motion.div className="contact-card" variants={fadeUp}>
              <div className="contact-left">
                <div className="mini-title">Contact</div>
                <p className="muted">
                  案件の状況（ざっくりでOK）を添えてもらえると、話が早いです。
                </p>
              </div>
              <div className="contact-right">
                <a className="btn primary" href="mailto:xzengbu@gmail.com">
                  xzengbu@gmail.com
                </a>
                <a className="btn ghost" href="https://github.com/rancorder" target="_blank" rel="noreferrer">
                  GitHubを見る
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="muted">© {new Date().getFullYear()} rancorder</span>
        </div>
      </footer>

      {/* Styles (self-contained) */}
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
        html,
        body {
          height: 100%;
        }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          background: radial-gradient(1200px 800px at 15% 10%, rgba(124, 58, 237, 0.22), transparent 60%),
            radial-gradient(900px 700px at 80% 25%, rgba(34, 197, 94, 0.16), transparent 55%),
            var(--bg);
          color: var(--text);
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

        /* Nav */
        .nav {
          position: sticky;
          top: 0;
          z-index: 20;
          backdrop-filter: blur(10px);
          background: rgba(5, 7, 15, 0.55);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
        }
        .brand {
          font-weight: 800;
          letter-spacing: 0.3px;
        }
        .nav-links {
          display: flex;
          gap: 14px;
          align-items: center;
          color: var(--muted);
          font-size: 14px;
        }
        .nav-links a:hover {
          color: var(--text);
        }
        .pill {
          padding: 8px 12px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--panel-2);
        }

        /* Hero */
        .hero {
          padding: 70px 0 34px;
        }
        .kicker {
          margin: 0 0 10px;
          font-weight: 700;
          color: var(--muted2);
        }
        .hero-title {
          margin: 0;
          font-size: clamp(28px, 3.2vw, 46px);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .hero-sub {
          margin: 16px 0 0;
          font-size: 16px;
          color: var(--muted);
          line-height: 1.7;
        }
        .hero-desc {
          margin: 10px 0 0;
          font-size: 15px;
          color: var(--muted2);
          line-height: 1.8;
          max-width: 900px;
        }
        .cta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 18px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          padding: 0 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--panel-2);
          color: var(--text);
          font-weight: 700;
          font-size: 14px;
          transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
        }
        .btn:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 255, 255, 0.22);
        }
        .btn.primary {
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.9), rgba(34, 197, 94, 0.55));
          border-color: transparent;
          box-shadow: var(--shadow);
        }
        .btn.ghost {
          background: var(--panel-2);
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 18px;
        }
        .stat {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 16px;
          padding: 14px;
        }
        .stat-v {
          font-weight: 900;
          font-size: 20px;
        }
        .stat-l {
          margin-top: 6px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.4;
        }

        /* Section */
        .section {
          padding: 54px 0;
        }
        .section-title {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.01em;
        }
        .section-sub {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.7;
        }

        /* Cards/Grid */
        .grid {
          margin-top: 18px;
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .card {
          border: 1px solid var(--border);
          background: var(--panel);
          border-radius: 18px;
          padding: 18px;
        }

        /* Projects */
        .filters {
          margin-top: 16px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .chip {
          border: 1px solid var(--border);
          background: var(--panel-2);
          color: var(--muted);
          border-radius: 999px;
          padding: 8px 12px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }
        .chip.active {
          color: var(--text);
          background: rgba(124, 58, 237, 0.28);
          border-color: rgba(124, 58, 237, 0.45);
        }

        .project-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }
        .project-title {
          margin: 0;
          font-size: 17px;
          line-height: 1.4;
        }
        .badge {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: rgba(255, 255, 255, 0.04);
          white-space: nowrap;
        }
        .project-desc {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.75;
          font-size: 14px;
        }

        .pm-box {
          margin-top: 12px;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(124, 58, 237, 0.35);
          background: rgba(124, 58, 237, 0.12);
        }
        .pm-title {
          font-weight: 900;
          margin-bottom: 8px;
          font-size: 13px;
        }
        .pm-list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.7;
          font-size: 13px;
        }

        .two-col {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 12px;
          border-top: 1px solid var(--border);
          padding-top: 14px;
        }
        .mini-title {
          font-weight: 900;
          font-size: 13px;
          color: var(--text);
          margin-bottom: 10px;
        }
        .list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.75;
          font-size: 13px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: rgba(255, 255, 255, 0.03);
        }

        /* Why */
        .why p {
          margin: 0 0 12px;
          color: var(--muted);
          line-height: 1.85;
        }
        .why p:last-child {
          margin-bottom: 0;
        }

        /* Skills */
        .grid.skills {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        /* Contact */
        .contact-card {
          margin-top: 18px;
          display: flex;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          border: 1px solid var(--border);
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(34, 197, 94, 0.08));
          border-radius: 18px;
          padding: 18px;
        }
        .contact-left {
          min-width: 260px;
          flex: 1;
        }
        .contact-right {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Footer */
        .footer {
          border-top: 1px solid var(--border);
          padding: 22px 0;
          color: var(--muted);
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Responsive */
        @media (max-width: 860px) {
          .stats {
            grid-template-columns: 1fr;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .grid.skills {
            grid-template-columns: 1fr;
          }
          .two-col {
            grid-template-columns: 1fr;
          }
          .nav-links {
            gap: 10px;
          }
        }
      `}</style>
    </main>
  );
}
