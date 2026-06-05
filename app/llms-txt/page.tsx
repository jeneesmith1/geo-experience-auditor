'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from 'react';
import { generateLlmsTxt } from '../services/llmsTxtService';

export default function LlmsTxtPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      setIsLoading(true);
      const text = await generateLlmsTxt(url);
      setResult(text);
    } catch (error) {
      console.error("Failed to generate llms.txt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = 'llms.txt';
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="container">
      <header className="topHeader">
        <div className="urlIndicator">
          <span className="urlDot"></span>
          <span className="urlText">{url || 'https://jeneesmith.com'}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/" className="newAuditButton" style={{ textDecoration: 'none' }}>
            Agent audit
          </Link>
          {result && (
            <button onClick={handleReset} className="newAuditButton">
              New file
            </button>
          )}
        </div>
      </header>

      <main className="mainLayout">
        {!result ? (
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
              Generate your llms.txt
            </h1>
            <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: '440px', lineHeight: 1.5, marginTop: '-0.5rem' }}>
              An <code style={{ background: '#f4f4f5', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.9em' }}>llms.txt</code> file helps AI tools and agents understand and navigate your site efficiently.
            </p>
            <form onSubmit={handleGenerate} className="auditForm">
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
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </form>
          </div>
        ) : (
          <div className="resultsDashboard">
            <section className="overviewSection" style={{ alignItems: 'center' }}>
              <div className="summaryMeta">
                <span className="agentReadinessLabel">LLMS.TXT</span>
                <h2 className="verdictTitle">Your file is ready</h2>
                <p className="summaryText">
                  Place this file at the root of your domain at <code style={{ background: '#f4f4f5', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.9em' }}>{new URL(url).origin}/llms.txt</code> to help AI agents understand your site.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
                <button onClick={handleCopy} className="newAuditButton">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={handleDownload} className="auditButton" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  Download
                </button>
              </div>
            </section>

            <section className="dashboardSection">
              <h3 className="sectionTitle">PREVIEW</h3>
              <textarea
                value={result}
                onChange={(e) => setResult(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '480px',
                  padding: '1.25rem',
                  border: '1px solid #e4e4e7',
                  borderRadius: '10px',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  color: '#1a1a1a',
                  background: '#fafafa',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
