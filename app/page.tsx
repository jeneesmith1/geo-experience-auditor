'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from 'react';
import { runAudit, AuditResult } from './services/auditService';
import './globals.css';

export default function Home() {
  const [data, setData] = useState<AuditResult | null>(null);
  const [url, setUrl] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleAudit = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      setIsLoading(true);
      const result = await runAudit(url);
      setData(result);
    } catch (error) {
      console.error("Frontend validation error during execution:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAudit = () => {
    setData(null);
    setUrl('');
  };

  const renderStatusTag = (status: 'pass' | 'fail' | 'warn' | 'info') => {
    switch (status) {
      case 'pass': return <span className="badge badgePass">PASS</span>;
      case 'fail': return <span className="badge badgeFail">FAIL</span>;
      case 'warn': return <span className="badge badgeWarn">WARN</span>;
      case 'info': return <span className="badge badgeInfo">INFO</span>;
      default: return null;
    }
  };

  const getStatusCount = (status: 'pass' | 'fail' | 'warn') => {
    if (!data) return 0;
    return data.checks.filter(check => check.status === status).length;
  };

  return (
    <div className="container">
      <header className="topHeader">
        <div className="urlIndicator">
          <span className="urlDot"></span>
          <span className="urlText">{url || 'https://merge.dev'}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/llms-txt" className="newAuditButton" style={{ textDecoration: 'none' }}>
            Generate llms.txt
          </Link>
          {data && (
            <button onClick={handleNewAudit} className="newAuditButton">
              New audit
            </button>
          )}
        </div>
      </header>

      <main className="mainLayout">
        {!data ? (
          <div className="inputHero">
            <Image
              className="dark:invert"
              src="/Jenee-Smith-signature.png"
              alt="Jenee Smith signature"
              width={200}
              height={40}
              priority
            />
            <h1 className="heroHeading">
              Improve your agent experience! 
            </h1>
            <form onSubmit={handleAudit} className="auditForm">
              <input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="urlInput"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="auditButton"
                disabled={isLoading || !url}
              >
                {isLoading ? 'Auditing Site...' : 'Audit your site'}
              </button>
            </form>
          </div>
        ) : (
          <div className="resultsDashboard">
            <section className="overviewSection">
              <div className="gaugeContainer">
                <div className="gaugeCircle">
                  <span className="scoreBig">{data.score.toFixed(1)}</span>
                  <span className="scoreTotal">/ 10</span>
                </div>
              </div>

              <div className="summaryMeta">
                <span className="agentReadinessLabel">AGENT READINESS</span>
                <h2 className="verdictTitle">{data.verdict}</h2>
                <p className="summaryText">{data.summary}</p>
                
                <div className="statusRowSummary">
                  <span className="summaryCountText"><strong className="textGreen">✓ {getStatusCount('pass')} pass</strong></span>
                  <span className="summaryCountText"><strong className="textOrange">⚠ {getStatusCount('warn')} warn</strong></span>
                  <span className="summaryCountText"><strong className="textRed">✕ {getStatusCount('fail')} fail</strong></span>
                </div>
              </div>
            </section>

            <section className="dashboardSection">
              <h3 className="sectionTitle">CHECKS <span className="titleCount">{data.checks.length}</span></h3>
              <div className="checksList">
                {data.checks.map((check, index) => (
                  <div key={index} className="checkCard">
                    <div className="checkLeft">
                      <div className={`statusIconWrapper ${check.status}Icon`}>
                        {check.status === 'pass' && '✓'}
                        {check.status === 'fail' && '✕'}
                        {check.status === 'warn' && '⚠'}
                        {check.status === 'info' && '•'}
                      </div>
                      <div className="checkTexts">
                        <span className="checkName">{check.name}</span>
                        <span className="checkDesc">{check.description}</span>
                      </div>
                    </div>
                    <div className="checkRight">
                      {renderStatusTag(check.status)}
                      <span className="chevron">▼</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboardSection">
              <h3 className="sectionTitle">RECOMMENDATIONS <span className="titleCount">{data.recommendations.length}</span></h3>
              <div className="recommendationsList">
                {data.recommendations.map((rec, index) => (
                  <div key={index} className="recRow">
                    <div className="recLeft">
                      <span className="recNumber">{String(index + 1).padStart(2, '0')}</span>
                      <div className="recTexts">
                        <h4 className="recTitle">{rec.title}</h4>
                        <p className="recDetail">{rec.detail}</p>
                      </div>
                    </div>
                    <span className={`priorityTag priority${rec.priority}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
