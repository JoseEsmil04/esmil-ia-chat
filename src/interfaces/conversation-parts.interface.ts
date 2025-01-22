export interface ConversationPart {
  text: string
}

export interface ConversationMessage {
  role: 'user' | 'model'
  parts: ConversationPart[]
}
