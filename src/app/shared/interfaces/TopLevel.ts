export interface TopLevel {
  topic_id: number;
  name: string;
  faqs: FAQ[];
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
