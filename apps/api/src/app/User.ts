export interface UserInterface {
  username: string | null;
  password: string | null;
  name?: string | null;
  token: string | null;
}

export class User implements UserInterface {
  constructor(username: string, password: string, name?: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    // this.token =  signJWTUserToken(user); // TODO
  }

  public username = null;
  public password = null;
  public name = null;
  // public token = null;
  public get token() {
    const today = new Date().toString().substr(0, 10);
    return `JWT:FAKETOKEN:${this.username.split('').sort().join('')}${today}`;
  }
}
