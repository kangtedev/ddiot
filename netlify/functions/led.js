const fs = require('fs');
const path = require('path');

// Simple in-memory storage (resets on deploy)
let ledState = { led: 'off' };

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Handle GET - return current state
    if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(ledState)
        };
    }

    // Handle POST - toggle LED
    if (event.httpMethod === 'POST') {
        ledState.led = ledState.led === 'on' ? 'off' : 'on';
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(ledState)
        };
    }

    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};