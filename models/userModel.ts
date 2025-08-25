import * as mongo from "./mongo.ts";
export class User {
  name?: string;
  username?: string;
  password?: string;
  collectionName: string = "users";

  constructor(data: { name?: string; username?: string; password?: string }) {
    if (!data.username) return;
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
      }], this.collectionName);

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
        this.collectionName,
      );
      if (existingUserName) {
        return true;
      } else return false;
    } catch (err) {
      throw err;
    }
  }

  async getUser(): Promise<object | null> {
    try {
      const existingUserName = await mongo.findOne(
        { usename: this.username },
        this.collectionName,
      );
      if (existingUserName) {
        return existingUserName;
      } else return null;
    } catch (err) {
      throw err;
    }
  }
}
