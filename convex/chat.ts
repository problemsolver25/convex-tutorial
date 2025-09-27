import { query, mutation, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";

// Convex backend logic = TypeScript functions.

// Mutation: Write to the database.
// Update the database.
// Always run as transactions (all or nothing).
export const sendMessage = mutation({
  args: {
    user: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("This TypeScript function is running on the server.");

    await ctx.db.insert("messages", {
      user: args.user,
      body: args.body,
    });

    // Add the following lines:
    if (args.body.startsWith("/wiki")) {
      // Get the string after the first space
      const topic = args.body.slice(args.body.indexOf(" ") + 1);
      await ctx.scheduler.runAfter(0, internal.chat.getWikipediaSummary, {
        topic,
      });
    }

  },
});

// Query: Read from the database.
// Queries are not transactional, and can be cached.
export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    // Get most recent messages first
    const messages = await ctx.db.query("messages").order("desc").take(50);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse();
  },
});

// # Sync Engine:
// - Combines queries, mutations, and the database.
// - Works via WebSockets for fast real-time updates.
// - When data changes, Convex reruns queries automatically and pushes updates to all clients.


// # Why Actions Exist

// Mutations & queries cannot call external APIs because Convex enforces:
// - Strong transactions (all-or-nothing).
// - Deterministic sync engine (predictable reactivity).
// - Real apps need external calls → Convex provides actions for that.

// /wiki <topic> command handler
export const getWikipediaSummary = internalAction({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const response = await fetch(
      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" +
        args.topic,
    );

    // Replace the `return ...` with the following.
    const summary = getSummaryFromJSON(await response.json());
    await ctx.scheduler.runAfter(0, api.chat.sendMessage, {
      user: "Wikipedia",
      body: summary,
    });

  },
});

function getSummaryFromJSON(data: any) {
  const firstPageId = Object.keys(data.query.pages)[0];
  return data.query.pages[firstPageId].extract;
}