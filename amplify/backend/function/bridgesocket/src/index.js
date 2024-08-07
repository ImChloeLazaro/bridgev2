const AWS = require("aws-sdk");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.DATABASE);

//Notification Schema
const notificationSchema = new mongoose.Schema({
  sub: String,
  title: String,
  type: [String],
  description: String,
  unread: Boolean, // read or unread
  hidden: Boolean, //hide or unhide
  location_id: String,
  location: String,
  notified_from: {
    sub: String,
    name: String,
    email: String,
    picture: String,
  },
  createdBy: Date,
});
// Define the user session schema directly within the index.js file
const sessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  sub: String,
  email: String,
  picture: String,
});

const UserSession = mongoose.model("session", sessionSchema);
const Notification = mongoose.model("notification", notificationSchema);
exports.handler = async (event) => {
  try {
    const ENDPOINT =
      "https://ettpkpovgl.execute-api.ap-southeast-1.amazonaws.com/production/";
    const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });

    const session_ids = async () => {
      try {
        const sessions = await UserSession.find();
        return sessions.map((session) => session.id);
      } catch (error) {
        console.error("Error fetching session IDs:", error);
        return [];
      }
    };

    const session_name = async (id) => {
      try {
        const session = await UserSession.findOne({ id });
        return session ? session.name : "Unknown";
      } catch (error) {
        console.error("Error fetching session name:", error);
        return "Unknown";
      }
    };

    const notification_count = async (sub) => {
      try {
        const count = await Notification.countDocuments({ sub, unread: true });
        return count;
      } catch (error) {
        console.error("Error fetching notification count:", error);
        return 0;
      }
    };
    const sendOne = async (id, body) => {
      try {
        await client
          .postToConnection({
            ConnectionId: id,
            Data: Buffer.from(JSON.stringify(body)),
          })
          .promise();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };

    const sendMany = async (ids, body) => {
      try {
        const all = ids.map((i) => sendOne(i, body));
        await Promise.all(all);
      } catch (error) {
        console.error("Error sending messages to multiple connections:", error);
      }
    };

    if (event.requestContext) {
      const connectionId = event.requestContext.connectionId;
      const routeKey = event.requestContext.routeKey;
      let body = {};

      try {
        if (event.body) {
          body = JSON.parse(event.body);
        }
      } catch (error) {
        console.error("Error parsing body:", error);
      }

      switch (routeKey) {
        case "$connect":
          break;
        case "$disconnect":
          await sendMany(await session_ids(), {
            message: `${await session_name(connectionId)} disconnected`,
          });
          await UserSession.deleteOne({ id: connectionId });
          await sendOne(connectionId, {
            message: `users length: ${(await session_ids()).length}`,
          });
          break;
        case "$default":
          break;
        case "setdata":
          try {
            const { name, sub, email, picture } = body;
            await UserSession.create({
              id: connectionId,
              name,
              sub,
              email,
              picture,
            });
            await sendMany(await session_ids(), {
              system: `${body.name} joined the channel.`,
            });

            await sendOne(connectionId, {
              system: `Active users: ${(await session_ids()).length}`,
            });
            const notifications = await Notification.find({ sub });
            await sendOne(connectionId, {
              notifications,
              count: await notification_count(sub),
            });
          } catch (error) {
            sendOne(connectionId, { system: "Error: " + error.message });
          }
          break;
        case "setpublic":
          await sendMany(await session_ids(), { system: "hello from public" });
          break;
        case "setprivate":
          await sendOne(connectionId, { system: "hello from private" });
          break;
        case "dashboard":
          await sendOne(connectionId, { system: "hello from dashboard" });
          break;
        case "notification":
          try {
            // Extract data from the request body
            const {
              subs,
              title,
              type,
              description,
              route,
              notified_from,
              location_id,
              location,
            } = body;

            // Create multiple notifications in bulk
            if (route === "set") {
              // Create a new notification
              const notifications = subs.map((sub) => ({
                sub,
                title,
                type,
                description,
                notified_from,
                location_id,
                location,
                createdBy: new Date(), // Default value for createdBy
                unread: true, // Default value for unread
                hidden: false, // Default value for hidden
              }));

              const insertedNotifications = await Notification.insertMany(
                notifications
              );
              const temp_ids = await UserSession.find({ sub: { $in: subs } });
              /*Send all notification in every sub*/
              // await sendMany(temp_ids.map(data => data.id), { insertNotification });

              // Send inserted notifications to corresponding user sessions
              for (const session of temp_ids) {
                const notificationsForSession = insertedNotifications.filter(
                  (notification) => notification.sub === session.sub
                );
                const count = await notification_count(session.sub);
                await sendOne(session.id, {
                  notifications: notificationsForSession,
                  count,
                });
              }
            }

            if (route === "setread") {
              // Mark the notification as read
              const { id } = body;
              await Notification.updateOne({ _id: id }, { unread: false });
              await sendOne(connectionId, {
                system: "Marked as read id " + id,
              });
            }
            if (route === "setunread") {
              // Mark the notification as read
              const { id } = body;
              await Notification.updateOne({ _id: id }, { unread: true });
              await sendOne(connectionId, {
                system: "Marked as unread id " + id,
              });
            }

            if (route === "sethide") {
              // Mark the notification as hidden
              const { id } = body;
              await Notification.updateOne({ _id: id }, { hidden: true });
              await sendOne(connectionId, { system: "hide, id " + id });
            }
            if (route === "setshow") {
              // Mark the notification as hidden
              const { id } = body;
              await Notification.updateOne({ _id: id }, { hidden: false });
              await sendOne(connectionId, { system: "unhide, id " + id });
            }

            if (route === "delete") {
              const { id } = body;
              await Notification.deleteOne({ _id: id });
              await sendOne(connectionId, { system: "delete, id " + id });
            }
          } catch (error) {
            await sendOne(connectionId, {
              system: error.message,
              success: false,
            });
          }
          break;
        case "chat":
          await sendOne(connectionId, { system: "hello from chat" });
          break;
        default:
          sendMany([connectionId], { system: "NO ROUTE" });
          sendOne(connectionId, { system: "NO ROUTE" });
          console.log("Unknown routeKey:", routeKey);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify("Connection Established!"),
    };
  } catch (error) {
    console.error("Unhandled error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
