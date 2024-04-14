"use client"
import React, { useState, useEffect, useRef } from "react";

const URL = 'wss://kggqfk9nf5.execute-api.ap-southeast-1.amazonaws.com/production/'

const Test = () => {
    // Establish WebSocket connection
    const socket = new WebSocket('wss://kggqfk9nf5.execute-api.ap-southeast-1.amazonaws.com/production/');

    // Event handler for WebSocket connection established
    socket.onopen = function (event) {
        console.log('WebSocket connection established');
        // Perform any initialization or send initial messages if needed
    };

    // Event handler for WebSocket messages received
    socket.onmessage = function (event) {
        const message = JSON.parse(event.data);
        console.log('Message received:', message);
        // Handle the received message according to your application logic
    };

    // Event handler for WebSocket connection closed
    socket.onclose = function (event) {
        console.log('WebSocket connection closed');
        // Perform any cleanup or reconnection logic if needed
    };

    // Function to send a message through the WebSocket connection
    function sendMessage(message) {
        socket.send(JSON.stringify(message));
        console.log('Message sent:', message);
    }

    setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            sendMessage({ action: 'setData', name: 'Alice' });
            console.log('Message sent:');
        } else {
            console.warn('WebSocket connection is not open yet. Message not sent:');
        }
    }, 5000);
    // Example usage:

    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}

export default Test;
