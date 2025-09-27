# Convex tutorial

You're just a few minutes away from having a chat app powered by Convex.

Follow the tutorial at
[docs.convex.dev/tutorial](https://docs.convex.dev/tutorial) for instructions.


## A live updating chat app with:

- A mutation (`sendMessage`) that inserts new chat messages.
- A query (`getMessages`) that keeps the UI updated in real-time.
- Sync engine automatically handling updates across multiple clients.

Convex abstracts away complex backend plumbing (real-time sync, database transactions, API endpoints) into simple TypeScript functions and React hooks.

## 1. Convex Basics

Convex is a fully featured backend with:
- Cloud functions
- Document-relational database
- Scheduling
- Real-time sync engine
- Keeps frontend and backend automatically in sync.

## 2. Setup

- Requires Node.js 18+ and Git.
- Running npm run dev starts both:

    - The frontend dev server.
    - The Convex backend (keeps in sync with local code).

## 3. Database

Document-relational database:
- Tables hold JSON-like documents.
- Each document has an auto-generated _id.
- `_id` supports relationships between documents.
- Convex creates tables automatically on first insert (schemas optional but recommended later).

## 4. Functions

Convex backend logic = TypeScript functions.

**Mutations:**
- Update the database.
- Always run as transactions (all or nothing).
- Example: sendMessage inserts a new document into the messages table.

**Queries:**
- Read-only access to the database.
- Frontend subscribes to queries → real-time updates.
- Example: getMessages fetches the latest 50 messages.

## 5. Sync Engine

- Combines queries, mutations, and the database.
- Works via WebSockets for fast real-time updates.
- When data changes, Convex reruns queries automatically and pushes updates to all clients.

## 6. Frontend Integration

Use React hooks from `convex/react`:

- `useMutation(api.chat.sendMessage)` → call a mutation.
- `useQuery(api.chat.getMessages)` → subscribe to a query.
- Queries automatically trigger React re-renders when data changes.

## 7. Debugging & Dashboard

Convex dashboard at dashboard.convex.dev:

- Data tab → inspect database tables.
- Logs tab → see function calls and debugging logs (console.log works on server).

## 8. Why Actions Exist

Mutations & queries cannot call external APIs because Convex enforces:

- Strong transactions (all-or-nothing).
- Deterministic sync engine (predictable reactivity).
- Real apps need external calls → Convex provides actions for that.

## 9. Action Functions

- Action = a serverless function (like AWS Lambda or Cloud Run).
- Use them for external fetches / non-deterministic work.
- Can’t directly read/write the database → must go through mutations or queries.
- Use internalAction for private, backend-only functions.

Example:
`getWikipediaSummary` calls the Wikipedia API, extracts a summary, and then schedules a follow-up mutation to save the result.

## 10. Scheduler

- `ctx.scheduler` is how you coordinate async workflows inside Convex.
- In mutations, it’s the only way to call actions.
- If a mutation fails, scheduled actions are not queued (ensures atomicity).
- `runAfter(delay, fn, args)` → schedules a function (mutation or action).
- **Example:** sendMessage mutation checks for /wiki command → schedules Wikipedia action.
- The action fetches data → schedules another sendMessage to insert the result.

## 11. Sync Engine + Actions

- Queries + mutations = sync engine core (guaranteed, reactive, transactional).
- Actions = escape hatch for non-deterministic, external-world logic.

Best practice:
- Keep actions small (just the fetch/external step).
- Keep most logic inside mutations/queries.
- This maximizes scalability & throughput.

## 12. What You Built

Added /wiki <topic> support in chat.

Workflow:

- User sends /wiki command → mutation runs.
- Mutation schedules getWikipediaSummary action.
- Action fetches summary → schedules another mutation to insert message.
- Learned how Convex handles external APIs without breaking transactional guarantees.

##
Convex separates deterministic database logic (queries & mutations) from non-deterministic external calls (actions). The scheduler ties them together into reliable workflows.
##