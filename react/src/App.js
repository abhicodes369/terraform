import React, { useState, useEffect } from 'react';
import './App.css';

const FEATURES = [
  { icon: '⚡', title: 'Auto Deploy', desc: 'Every git push triggers a fresh build and deploy via AWS CodePipeline.' },
  { icon: '🛡️', title: 'CloudFront CDN', desc: 'Assets served globally at the edge — low latency, always available.' },
  { icon: '🪣', title: 'S3 Hosting', desc: 'Static files stored in a versioned, private S3 bucket.' },
  { icon: '🔧', title: 'Terraform IaC', desc: 'All infrastructure defined as code — reproducible in one command.' },
];

export default function App() {
  const [active, setActive] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const steps = ['Push to GitHub', 'CodePipeline triggers', 'CodeBuild runs', 'Deploy to S3', 'CloudFront serves'];
  const currentStep = tick % steps.length;

  return (
    <div className="app">
      <header className="hero">
        <div className="badge">AWS · CI/CD · IaC</div>
        <h1>React <span className="accent">SPA</span> on AWS</h1>
        <p className="sub">Automated deployment powered by Terraform, CodePipeline & CloudFront</p>
      </header>

      <section className="pipeline-section">
        <h2>Live Pipeline Flow</h2>
        <div className="pipeline">
          {steps.map((step, i) => (
            <div key={step} className={`step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}>
              <div className="step-dot">{i < currentStep ? '✓' : i + 1}</div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`card ${active === f.title ? 'open' : ''}`}
            onClick={() => setActive(active === f.title ? null : f.title)}
          >
            <div className="card-header">
              <span className="icon">{f.icon}</span>
              <strong>{f.title}</strong>
              <span className="chevron">{active === f.title ? '▲' : '▼'}</span>
            </div>
            {active === f.title && <p className="card-desc">{f.desc}</p>}
          </div>
        ))}
      </section>

      <footer>
        Built with React · Deployed via Terraform on AWS
      </footer>
    </div>
  );
}
