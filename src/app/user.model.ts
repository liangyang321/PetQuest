export class User {
  id: any;
  name: string;
  email: string;
  password: string;
  zipcode: string;
  role: string;    // four roles: admin, shelter, user, visiter
  message: string[] = [];
}
