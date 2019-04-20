export class User {
  id: number;
  group: number;
  email: string;
  username: string;
  date_joined: Date;
  is_manager: boolean;
}

export class Message {
  id: number;
  text: string;
  issue: number;
  space: number;
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


