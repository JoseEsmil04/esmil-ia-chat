import type { Content } from '@google/genai'

export interface GeminiChatOptions {
  apiKey: string
  model?: string
  systemInstruction?: string
  initialHistory?: Content[]
  providedName: string
}
