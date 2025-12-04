#!/bin/bash

echo "Installing Backend Dependencies..."
cd backend
npm install

echo ""
echo "Installing Frontend Dependencies..."
cd ../frontend
npm install

echo ""
echo "✓ Installation complete!"
echo ""
echo "To start the application:"
echo "  Using Docker: ./start.sh"
echo "  Manually:"
echo "    Backend: cd backend && npm run dev"
echo "    Frontend: cd frontend && npm start"
