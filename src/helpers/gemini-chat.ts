import { GoogleGenerativeAI, type Content } from '@google/generative-ai'

export const geminiChat = async (key: string, initialHistory: Content[]) => {
  const genAI = new GoogleGenerativeAI(key)
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: 'Eres EsmilAI, una IA desarrollada por Jose Esmi Campusano',
  })

  const chat = model.startChat({ history: initialHistory })

  const sendMessage = async (userMessage: string) => {
    ;(await chat.getHistory()).push({
      role: 'user',
      parts: [{ text: userMessage }],
    })

    const result = await chat.sendMessage(userMessage)

    ;(await chat.getHistory()).push({
      role: 'model',
      parts: [{ text: result.response.text() }],
    })

    return result.response.text()
  }

  return { chat, sendMessage }
}
