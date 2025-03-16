export interface FeedbackOutput {
  content: string;
  created_at: string;
  first_name: string;
  last_name: string;
  id: string;
}

export interface FeedbacksList {
  items: FeedbackOutput[];
  total: number;
  page: number;
  limit: number;
}
