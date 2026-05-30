export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  username?: string;
  title?: string;
  bio?: string;
  level?: number;
  response_rate?: number;
  on_time_delivery?: number;
  created_at: string;
}
