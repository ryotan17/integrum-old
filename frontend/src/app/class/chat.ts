export class User {
  id: number;
  group: number;
  email: string;
  username: string;
  date_joined: Date;
  is_manager: boolean;
  token: string;
}

export class Space {
  id: number;
  group: number;
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

export class Session {
  login: boolean;

  constructor() {
    this.login = false;
  }

  reset(): Session {
    this.login = false;
    return this;
  }

}


