export interface Message {
  id: string;
  open_ai_id: string | null;
  content: string;
  actual_token_length: number;
  estimated_token_length: number;
  conversation_id: string;
  is_from_user: number;
  language?: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}
