import { assertEquals } from "jsr:@std/assert";
import * as jwtUtils from "../helpers/jwtUtils.ts";

Deno.test("Testing Token Creation and token validation", () => {
  const data = { name: "janedoe" };
  const token = jwtUtils.signToken(data);
  const verifiedToken = jwtUtils.verifyToken(token);
  assertEquals(typeof verifiedToken, "object");
  assertEquals(typeof token, "string");
});
