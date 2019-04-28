export class Group {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export class User {
  id: number;
  group: Group[];
  email: string;
  username: string;
  date_joined: Date;
  is_manager: boolean;
  token: string;
}

export class Space {
  id: number;
  group: Group;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  member: User[];
}

export class Message {
  id: number;
  text: string;
  texts: string[];
  issue: number;
  space: Space[];
  author: User;
  mention: User[];
  created_at: Date;
  updated_at: Date;
}
