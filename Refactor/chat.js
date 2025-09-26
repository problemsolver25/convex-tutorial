export const getChannel = query({
  args: { channelName: v.string() },
  handler: async (ctx, args) => {
    // 1️⃣ Fetch the channel by name
    const channel = await ctx.db
      .query("channels")
      .filter((q) => q.eq("name", args.channelName))
      .first();

    if (!channel) {
      throw new Error(`Channel "${args.channelName}" not found`);
    }

    return channel;
  },
});

//channel: channelId,

/*
    // Fetch the "general" channel directly
    const channel = await ctx.db
      .query("channels")
      .filter((q) => q.eq("name", "general"))
      .first();
    if (!channel) {
      throw new Error('Channel "general" not found');
    }
    const channelId = channel._id;*/

    /*
    let userDoc = await ctx.db.query("users").filter(q => q.eq("name", args.user)).first();
    if (!userDoc) {
      userDoc = await ctx.db.insert("users", { name: args.user });
    }
    console.log(userDoc)*/