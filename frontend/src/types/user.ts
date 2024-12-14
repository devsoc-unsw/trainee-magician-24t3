export interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  profileUrl?: string;
  email: string;
  favouritePosts: string[];
}

export interface UserProfile {
  name: string;
  profilePic?: string;
  firstName: string;
  lastName: string;
} 