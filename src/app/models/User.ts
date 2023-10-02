export class User {
  _id?: number;
  email: string;
  password: string;
  age?: number;
  state_use?: string = 'Active';

  constructor(
    email: string,
    password: string,
    age: number,
    state_use: string = 'Active'
  ) {
    this.email = email;
    this.password = password;
    this.age = age;
    this.state_use = state_use;
  }
}
