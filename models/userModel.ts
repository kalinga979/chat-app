import * as mongo from "./mongo.ts";
export class User {
  name?: string;
  username?: string;
  password?: string;

  constructor(data: { name: string; username: string; password: string }) {
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
  }

  async addUser(): Promise<{ message: string }> {
    try {
      const doesUserExists: boolean = await this.checkUserName();

      if (doesUserExists) return { message: "Username already exists" };

      const response = await mongo.insertData([{
        name: this.name,
        username: this.username,
      }], "users");

      if (response.acknowledged) {
        return { message: "User credentials created." };
      } else return { message: "Failed to create credentials" };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async checkUserName(): Promise<boolean> {
    try {
      const existingUserName = await mongo.findOne(
        { usename: this.username },
        "users",
      );
      if (existingUserName && existingUserName?.length > 0) {
        return true;
      } else return false;
    } catch (err) {
      throw err;
    }
  }

  async getUser(): Promise<object | boolean> {
    try {
      const existingUserName = await mongo.findOne(
        { usename: this.username },
        "users",
      );
      if (existingUserName && existingUserName?.length > 0) {
        return existingUserName[0];
      } else return false;
    } catch (err) {
      throw err;
    }
  }
}

const newUser = new User();
newUser.name = "hello";
