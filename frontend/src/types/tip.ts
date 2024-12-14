export interface Rating {
  value: 1 | 2 | 3 | 4 | 5;
  raterId: string;
}

export interface Comment {
  authorId: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    profilePic?: string;
    firstName: string;
    lastName: string;
  };
}

export interface Author {
  name: string;
  profilePic?: string;
  firstName: string;
  lastName: string;
}

export interface CurrentUser {
  userId: string;
  firstName: string;
  lastName: string;
  profileUrl: string;
  favouritePosts: string[];
  email: string;
}

export interface TipData {
  tipId: string;
  title: string;
  type: "LIFE" | "DEATH";
  description: string;
  tags: string[];
  ratings: Rating[];
  content: string;
  authorId: string;
  createdAt: number;
  upvotes: string[];
  downvotes: string[];
  comments: Comment[];
  author: Author;
  currentUser?: CurrentUser;
} 