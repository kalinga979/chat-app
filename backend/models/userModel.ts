import * as mongo from "./mongo.ts";
const collectionName = "users";

export class User {
  name?: string;
  username?: string;
  password?: string;
  userCreated: boolean = false;

  constructor(data: { name?: string; username?: string; password?: string }) {
    if (!data.username) throw new Error("Username not specified");
    this.name = data.name;
    this.username = data?.username;
    this.password = data?.password;
  }

  async createUser(): Promise<{ message: string }> {
    try {
      const doesUserExists: boolean = await this.checkUserName();

      if (doesUserExists) return { message: "Username already exists" };

      if (typeof this.name != "string") {
        throw new Error(`Invalid name value: ${this.name}`);
      }

      if (typeof this.password != "string") {
        throw new Error(`Invalid password value: ${this.password}`);
      }

      if (typeof this.username != "string") {
        throw new Error(`Invalid username value: ${this.username}`);
      }

      const response = await mongo.insertData(
        [
          {
            name: this.name,
            username: this.username,
            password: this.password,
          },
        ],
        collectionName,
      );

      if (response.acknowledged) {
        this.userCreated = true;
        return { message: "User credentials created." };
      } else return { message: "Failed to create credentials" };
    } catch (err) {
      throw err;
    }
  }

  async checkUserName(): Promise<boolean> {
    try {
      const existingUserName = await mongo.findOne(
        { username: this.username },
        collectionName,
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
      if (this.userCreated) {
        return {
          name: this.name,
          username: this.username,
          password: this.password,
        };
      }
      const existingUserName = await mongo.findOne(
        { username: this.username },
        collectionName,
      );
      if (existingUserName) {
        this.name = existingUserName.name;
        this.password = existingUserName.password;
        this.userCreated = true;
        return existingUserName;
      } else return null;
    } catch (err) {
      throw err;
    }
  }
}
