'use server'
import { auditorSystemPrompt, createUserPrompt } from '../utils/prompts';
import Anthropic from "@anthropic-ai/sdk";

export interface AuditResult {
  score: number;
  verdict: string;
  summary: string;
  checks: Array<{ 
    name: string;
    status: 'pass' | 'fail' | 'warn' | 'info';
    description: string;
    finding: string | null 
  }>;
  recommendations: Array<{ 
    priority: 'high' | 'medium' | 'low';
    title: string;
    detail: string 
  }>;
}

const client = new Anthropic();

export async function runAudit(targetUrl: string): Promise<AuditResult> {
  try {
    const dynamicUserPrompt = createUserPrompt(new URL(targetUrl));
    
    const msg = await client.messages.create({
      model: "claude-opus-4-8",
      system: auditorSystemPrompt,
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: dynamicUserPrompt
      }],
    });

    const rawText = msg.content[0].type === 'text' ? msg.content[0].text : '';
    console.log(rawText);
    
    const parsedData: AuditResult = JSON.parse(rawText);
    return parsedData;

  } catch (error) {
    console.error("Failed to execute audit:", error);
    throw error;
  }
}