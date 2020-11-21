export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;    // four roles: admin, shelter, user, visiter
  message: string[] = [];
}
