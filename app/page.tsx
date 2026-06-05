'use client'
import Image from "next/image";
import { useState } from 'react';
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
  return (
    <div className="container">
      <main className="mainLayout">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Improve your agent experience! 
          </h1>
        </div>
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
      </main>
    </div>
  );
}
