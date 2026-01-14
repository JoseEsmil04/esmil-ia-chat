import type { GeminiChatOptions } from '@/interfaces/geminiChat-options.interface'
import { GoogleGenAI, type Content } from '@google/genai'

export const geminiChat = ({
  apiKey,
  model = 'gemini-2.5-flash',
  initialHistory = [],
  providedName,
}: GeminiChatOptions) => {
  const ai = new GoogleGenAI({ apiKey })

  const localHistory: Content[] = [...initialHistory]

  const chat = ai.chats.create({
    model,
    history: initialHistory,
    config: {
      systemInstruction: `Eres JE.ai, una IA desarrollada por Jose Esmi Campusano y el nombre del usuario es: ${providedName}.`,
    },
  })

  const sendMessage = async (userMessage: string) => {
    localHistory.push({ role: 'user', parts: [{ text: userMessage }] })
    const res = await chat.sendMessage({ message: userMessage })

    const text = res.text ?? ''
    localHistory.push({ role: 'model', parts: [{ text }] })

    return text
  }

  const getHistory = () => [...localHistory]

  return { chat, sendMessage, getHistory }
}
