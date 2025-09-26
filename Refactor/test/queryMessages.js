/*import { ConvexClient } from "convex/browser"; // or server

const client = new ConvexClient(import.meta.env.VITE_CONVEX_URL);

async function queryMessages() {
    const channelId = await client.mutation("channels.create", { name: "general" });
    const messages = await client.query("messages").withIndex("by_channel", (q) =>
        q.eq("channel", channelId)
    ).collect();

    console.log("Messages in channel:", messages);
}

queryMessages();
*/