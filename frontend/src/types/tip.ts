export interface TipData {
  tipId: string;
  title: string;
  type: "LIFE" | "DEATH";
  description: string;
  tags: string[];
  ratings: Array<{ value: number; raterId: string }>;
  content: string;
  authorId: string;
  createdAt: number;
  upvotes: string[];
  downvotes: string[];
  comments: Array<{ authorId: string; content: string; createdAt: number }>;
} 