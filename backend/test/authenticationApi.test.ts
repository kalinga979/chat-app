import { expect } from "jsr:@std/expect";

Deno.test("POST /user/login Testing login logic", async () => {
  const result = await fetch("http://localhost:3001/user/login", {
    "method": "POST",
    headers: {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      username: "janedoe",
      password: "janedoe123",
    }),
  });
  //console.log(result);
  expect(result.status).toBe(200);
  await result.body?.cancel();
  return;
});

Deno.test("POST /user/register Testing registration logic", async () => {
  const result = await fetch("http://localhost:3001/user/register", {
    "method": "POST",
    headers: {
      "Content-Type": "application/json",
    },
    "body": JSON.stringify({
      name: 1,
      username: "janedoe",
      password: "janedoe123",
    }),
  });
  expect(result.status).toBe(200);
  // await result.body?.cancel();
  console.log(await result.text());
  return;
});
