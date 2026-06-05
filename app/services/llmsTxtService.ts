'use server'
import { llmsTxtSystemPrompt, createLlmsTxtUserPrompt } from '../utils/prompts';
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function generateLlmsTxt(targetUrl: string): Promise<string> {
  const dynamicUserPrompt = createLlmsTxtUserPrompt(new URL(targetUrl));

  const msg = await client.messages.create({
    model: "claude-opus-4-8",
    system: llmsTxtSystemPrompt,
    max_tokens: 4096,
    messages: [{ role: "user", content: dynamicUserPrompt }],
  });

  const text = msg.content[0].type === 'text' ? msg.content[0].text : '';
  return text;
}
