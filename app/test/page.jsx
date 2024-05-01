"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../aws-auth";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Image } from "@nextui-org/react";
const URL =
  "wss://ettpkpovgl.execute-api.ap-southeast-1.amazonaws.com/production/";

const Test = () => {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [user, setUser] = useState({});
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(URL);

    socketRef.current.onopen = () => {
      console.log("connected");
      setConnected(true);
      fetchUserAttributes().then((attr) => {
        setUser(attr);
        socketRef.current.send(
          JSON.stringify({
            action: "setdata",
            name: attr.name,
            email: attr.email,
            sub: attr.sub,
            picture: attr.picture,
          })
        );
      });
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.notifications) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...data.notifications,
        ]);
      }
      if (data.count !== undefined) {
        setNotificationCount(data.count);
      }
    };

    socketRef.current.onclose = () => {
      console.log("disconnected");
      setConnected(false);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const handleDisconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  const updateNotificationState = (data, action) => {
    let route;
    switch (action) {
      case "read":
        route = "setread";
        break;
      case "unread":
        route = "setunread";
        break;
      case "hide":
        route = "sethide";
        break;
      case "setshow":
        route = "setshow"; // Use 'setshow' for unhiding
        break;
      default:
        return;
    }

    // Update notification state without marking as read for 'hide' and 'setshow' actions
    const updatedNotifications = notifications.map((notification) => {
      if (notification._id === data) {
        if (action === "read") {
          return { ...notification, unread: false, hidden: false };
        } else if (action === "unread") {
          return { ...notification, unread: true };
        } else if (action === "hide") {
          return { ...notification, hidden: true };
        } else if (action === "setshow") {
          return { ...notification, hidden: false };
        }
      }
      return notification;
    });

    // Send WebSocket message
    socketRef.current.send(
      JSON.stringify({ action: "notification", id: data, route })
    );

    // Update notification count based on action
    if (action === "read") {
      setNotificationCount((prevCount) => prevCount - 1);
    } else if (action === "unread") {
      setNotificationCount((prevCount) => prevCount + 1);
    }

    // Update notifications
    setNotifications(updatedNotifications);
  };

  const getNotificationId = (proxy, data) => {
    if (["read", "unread", "hide", "setshow"].includes(proxy)) {
      updateNotificationState(data, proxy);
      console.log(proxy, data);
    } else if (proxy === "delete") {
      // Check if the notification to be deleted is unread
      const notificationToDelete = notifications.find(
        (notification) => notification._id === data && notification.unread
      );
      if (notificationToDelete) {
        // If the notification to be deleted is unread, decrease the notification count
        setNotificationCount((prevCount) => prevCount - 1);
      }
      socketRef.current.send(
        JSON.stringify({ action: "notification", id: data, route: "delete" })
      );
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== data)
      );
    }
  };

  const sendnotification = () => {
    //subs, title, type, description, route, notified_from
    // const subs = window.prompt("Enter subs and separate with comma").split(",");
    // const title = window.prompt("Enter title");
    // const type = window.prompt("Enter type and separate with comma").split(",");
    // const description = window.prompt("Enter description");
    // console.log("TYPEOF", typeof subs, subs.split(","));
    // console.log("TYPEOF", typeof title, title);
    // console.log("TYPEOF", typeof type, type.split(","));
    // console.log("TYPEOF", typeof description, description);
    socketRef.current.send(
      JSON.stringify({
        action: "notification",
        subs: ["a8dfd442-2977-499b-a917-a0e226c6c089"],
        title: "NOTIFICATION PUSH TESTING",
        type: ["mentioned"],
        description: "TSEING TSEINTSETINTSEITN",
        notified_from: user,
        route: "set",
      })
    );
  };
  return (
    <>
      <h1>Live Notification Count: {notificationCount}</h1>
      <div className="w-96 p-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`m-1 rounded-md flex gap-1 content-between p-5 border border-slate-700`}
            style={{
              backgroundColor: notification.unread ? "#6B7280" : "#E5E7EB",
            }}
          >
            <Image
              alt="notification picture"
              src={notification?.notified_from?.picture}
              className=" rounded-full w-12 h-12"
            />
            <div>
              <p className="font-bold">{notification.title}</p>
              <p>{notification.description}</p>
            </div>
            <div className="flex gap-1 items-center content-center">
              <button
                onClick={() =>
                  getNotificationId(
                    `${notification.unread ? "read" : "unread"}`,
                    notification._id
                  )
                }
                className="bg-green-400 p-1 rounded-md"
              >{`${notification.unread ? "read" : "unread"}`}</button>
              <button
                onClick={() =>
                  getNotificationId(
                    `${notification.hidden ? "setshow" : "hide"}`,
                    notification._id
                  )
                }
                className={`${
                  notification.hidden ? "bg-yellow-400" : "bg-red-400"
                } p-1 rounded-md`}
              >{`${notification.hidden ? "Show" : "Hide"}`}</button>
              <button
                onClick={() => getNotificationId("delete", notification._id)}
                className="bg-red-400 p-1 rounded-md"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {connected && (
        <div className="flex">
          <button
            className="m-1 p-1 bg-blue-400 rounded-md text-white"
            onClick={sendnotification}
          >
            Send Notification
          </button>
          <button
            className="m-1 p-1 bg-red-400 rounded-md"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
};

export default Test;
