#!/bin/bash

echo "🌿 Launching Flask backend..."
mintty --exec bash -lc "cd ~/git/minister-sa && py app.py"

echo "🍃 Launching React frontend..."
mintty --exec bash -lc "cd ~/git/minister-sa/frontend && npm start"

echo "🧭 Servers launched in proper Git Bash terminals."
