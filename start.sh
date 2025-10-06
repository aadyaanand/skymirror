#!/bin/bash

# SkyMirror Startup Script
# Quick way to get SkyMirror running locally

echo "🌍 SkyMirror Startup"
echo "===================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if icons exist
if [ ! -f "icons/icon-192.png" ]; then
    echo "🎨 Generating placeholder icons..."
    node scripts/generate-icons.js
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "   Local:   http://localhost:8080"
echo "   Network: http://$(ipconfig getifaddr en0 2>/dev/null || hostname -I | awk '{print $1}'):8080"
echo ""
echo "📱 To test on mobile, use the Network URL above"
echo "⌨️  Press Ctrl+C to stop the server"
echo ""

# Start the server
npx serve -p 8080 -n

