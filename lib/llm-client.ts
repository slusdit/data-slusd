// LLM Client Abstraction
// Supports multiple providers: local LLM, Gemini, OpenAI, Anthropic

export interface LLMConfig {
  provider: 'openai' | 'gemini' | 'local' | 'anthropic';
  apiKey?: string;
  baseUrl?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

// Provider endpoint mappings
const PROVIDER_ENDPOINTS: Record<string, string> = {
  openai: 'https://api.openai.com/v1',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/openai',
  anthropic: 'https://api.anthropic.com/v1',
  local: 'http://localhost:11434/v1', // Ollama default
};

export class LLMClient {
  private config: LLMConfig;
  private baseUrl: string;

  constructor(config: LLMConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || PROVIDER_ENDPOINTS[config.provider] || PROVIDER_ENDPOINTS.local;
  }

  async chat(messages: ChatMessage[]): Promise<LLMResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Set auth header based on provider
    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    // For Anthropic, use different header format
    if (this.config.provider === 'anthropic') {
      headers['x-api-key'] = this.config.apiKey || '';
      headers['anthropic-version'] = '2023-06-01';
    }

    const body = {
      model: this.config.model,
      messages,
      temperature: this.config.temperature ?? 0.3,
      max_tokens: this.config.maxTokens ?? 2000,
    };

    console.log(`[LLM] Calling ${this.config.provider} at ${this.baseUrl}/chat/completions`);
    console.log(`[LLM] Model: ${this.config.model}`);

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[LLM] Error response:`, error);
      throw new Error(`LLM request failed: ${response.status} - ${error}`);
    }

    const data = await response.json();

    return {
      content: data.choices?.[0]?.message?.content || '',
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
      } : undefined,
    };
  }
}

// Factory function for easy instantiation from env vars
export function createLLMClient(): LLMClient {
  const provider = (process.env.LLM_PROVIDER || 'local') as LLMConfig['provider'];

  const config: LLMConfig = {
    provider,
    apiKey: process.env.LLM_API_KEY,
    baseUrl: process.env.LLM_BASE_URL,
    model: process.env.LLM_MODEL || getDefaultModel(provider),
    temperature: parseFloat(process.env.LLM_TEMPERATURE || '0.3'),
    maxTokens: parseInt(process.env.LLM_MAX_TOKENS || '2000'),
  };

  console.log(`[LLM] Creating client for provider: ${provider}, model: ${config.model}`);

  return new LLMClient(config);
}

function getDefaultModel(provider: string): string {
  switch (provider) {
    case 'gemini':
      return 'gemini-1.5-flash';
    case 'openai':
      return 'gpt-4o-mini';
    case 'anthropic':
      return 'claude-3-haiku-20240307';
    case 'local':
    default:
      return 'llama3.2'; // Common Ollama model
  }
}
