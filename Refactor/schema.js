/*import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  channels: defineTable({
    name: v.string(),
  }),

  users: defineTable({
    name: v.string(),
  }),

  messages: defineTable({
    channel: v.id("channels"),
    body: v.string(),
    user: v.string(),//v.id("users"),
    _creationTime: v.number(), // optional timestamp
  })
    .index("by_channel", ["channel"])
    //.index("by_channel_user", ["channel", "user"])
    .index("by_creationTime", ["_creationTime"]),
});
*/