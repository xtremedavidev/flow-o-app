export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  timestamp: string;
  updatedAt: string;
  createdAt: string;
}

export interface SendChatMsgResponse {
  message: string;
  chatMessage: ChatMessage;
}

export type GetChatMsgResp = ChatMessage[];
