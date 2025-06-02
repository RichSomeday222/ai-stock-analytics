# AI-Assisted Stock Analytics Platform

> A modern stock analytics web application built with AI assistance in under 2 hours

![Demo](https://img.shields.io/badge/Demo-Live-green) ![AI-Powered](https://img.shields.io/badge/AI-Powered-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Backend-red) ![Next.js](https://img.shields.io/badge/Next.js-Frontend-black)

## 🚀 Quick Start Guide

### Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **Financial Modeling Prep API Key** - [Get free key](https://site.financialmodelingprep.com/)

### 📋 Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-stock-analytics.git
cd ai-stock-analytics
```

#### 2. Set Up Environment Variables
```bash
# Create .env file in the project root
touch .env

# Add your API key (replace with your actual key)
echo "FMP_API_KEY=your_actual_api_key_here" > .env
```

⚠️ **Important**: Replace `your_actual_api_key_here` with your real Financial Modeling Prep API key!

#### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

#### 4. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

### 🏃‍♂️ Running the Application

#### Terminal 1: Start Backend Server
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
✅ FMP API Key loaded successfully
```

#### Terminal 2: Start Frontend Server
```bash
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
- Ready in 2.1s
```

### 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🧪 Testing the Application

### 1. Test Backend API
Visit http://localhost:8000/api/stocks/test - you should see:
```json
{
  "status": "success",
  "message": "API connection working",
  "sample_data": "Apple Inc."
}
```

### 2. Test Frontend
1. Go to http://localhost:3000
2. Try the search functionality with these stocks:
   - **AAPL** (Apple)
   - **TSLA** (Tesla)
   - **META** (Meta)
   - **GOOGL** (Google)

### 3. Test Search Suggestions
- Type "app" in the search box
- You should see Apple suggestions appear
- Use keyboard arrows to navigate suggestions

## 🔧 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Issue: "FMP_API_KEY not found"
# Solution: Check your .env file
cat .env  # Should show: FMP_API_KEY=your_key_here
```

#### Frontend styling looks broken
```bash
# Issue: CSS not loading properly
# Solution: Clear Next.js cache and restart
cd frontend
rm -rf .next
npm run dev
```

#### Search suggestions not working
```bash
# Issue: Backend API not responding
# Solution: Ensure backend is running on port 8000
curl http://localhost:8000/api/stocks/test
```

#### Port already in use
```bash
# Issue: Port 3000 or 8000 already in use
# Solution: Kill existing processes
# Mac/Linux:
lsof -ti:3000 | xargs kill
lsof -ti:8000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### API Key Issues

If you see API errors:
1. Verify your API key is correct at https://site.financialmodelingprep.com/
2. Check you haven't exceeded the daily limit (250 calls for free tier)
3. Ensure the .env file is in the project root directory

## 📁 Project Structure

```
ai-stock-analytics/
├── .env                    # Environment variables (API key)
├── README.md              # This file
├── backend/               # FastAPI backend
│   ├── main.py           # Application entry point
│   ├── config.py         # Configuration management
│   ├── api/
│   │   └── stocks.py     # Stock data API routes
│   ├── venv/             # Python virtual environment
│   └── requirements.txt  # Python dependencies
└── frontend/             # Next.js frontend
    ├── app/
    │   ├── page.tsx      # Homepage
    │   ├── layout.tsx    # App layout
    │   ├── globals.css   # Global styles
    │   └── company/
    │       └── [symbol]/ # Dynamic company pages
    ├── package.json      # Node.js dependencies
    └── node_modules/     # Node.js packages
```

## 🎯 Key Features

- **🔍 Smart Search**: Real-time stock search with AI-powered suggestions
- **📊 Interactive Charts**: 30-day price history with hover tooltips
- **💰 Real-time Data**: Live stock prices, market cap, volume, and key metrics
- **🎨 Modern Design**: Dark theme optimized for young investors
- **⚡ Fast Performance**: Optimized API calls with error handling
- **📱 Responsive**: Works on desktop and tablet devices

## 🛠 Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Custom CSS with modern gradients
- **Charts**: Recharts library
- **Data Source**: Financial Modeling Prep API
- **Development**: AI-assisted with Claude 4

## 📊 API Endpoints

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/api/stocks/suggestions/{query}` | Search suggestions | `/api/stocks/suggestions/app` |
| `/api/stocks/search/{symbol}` | Company profile | `/api/stocks/search/AAPL` |
| `/api/stocks/quote/{symbol}` | Real-time quote | `/api/stocks/quote/TSLA` |
| `/api/stocks/historical/{symbol}` | Price history | `/api/stocks/historical/META` |
| `/api/stocks/test` | API health check | `/api/stocks/test` |

## 🚀 Development Notes

- **Development Time**: 2 hours total
- **AI Assistance**: 90% of code generated with AI tools
- **Performance**: < 500ms API response time
- **Error Handling**: Comprehensive loading states and error messages

## 🤝 Contributing

This project demonstrates AI-assisted development. To contribute:

1. Fork the repository
2. Create a feature branch
3. Use AI tools for rapid development
4. Submit a pull request

## 📜 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Financial Modeling Prep** for free financial data API
- **Claude 4** for AI-assisted development
- **Next.js & FastAPI** for excellent frameworks
- **Recharts** for beautiful chart components
