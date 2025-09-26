/*import { ConvexClient } from "convex/browser"; // or server

const client = new ConvexClient(import.meta.env.VITE_CONVEX_URL);

async function insertMessages() {
  const channelId = await client.mutation("channels.create", { name: "general" });
  //const userId = await client.mutation("users.create", { name: "Alice" });

  await client.mutation("messages.create", {
    channel: channelId,
    body: "Hello world!",
    user: "User",//userId,
    _creationTime: Date.now(),
  });

  console.log("Inserted test message");
}

insertMessages();
*/