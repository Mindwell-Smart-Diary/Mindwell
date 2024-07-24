import { upAll, down } from "docker-compose";

let teardownHappened = false;

export default async function () {
  console.log("Starting postgres container");
  await upAll();

  await new Promise((r) => setTimeout(r, 2000));

  console.log("Postgres is up");

  return async () => {
    if (teardownHappened) {
      throw new Error("teardown called twice");
    }
    teardownHappened = true;

    await down();
    console.log("Postgres is down");
  };
}
