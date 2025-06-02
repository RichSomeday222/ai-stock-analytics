from fastapi import APIRouter, HTTPException
import requests
from config import settings
from typing import Dict, Any

router = APIRouter()

def make_fmp_request(endpoint: str) -> Dict[Any, Any]:
    """Generic function to send requests to the FMP API"""
    url = f"{settings.FMP_BASE_URL}/{endpoint}"
    params = {"apikey": settings.FMP_API_KEY}
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")

@router.get("/search/{symbol}")
async def get_company_profile(symbol: str):
    """Get company profile information"""
    try:
        symbol = symbol.upper()  # Convert to uppercase
        
        profile_data = make_fmp_request(f"profile/{symbol}")
        
        if not profile_data:
            raise HTTPException(status_code=404, detail="Company not found")
            
        return {
            "symbol": symbol,
            "profile": profile_data[0] if profile_data else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/quote/{symbol}")
async def get_stock_quote(symbol: str):
    """Get real-time stock quote"""
    try:
        symbol = symbol.upper()
        quote_data = make_fmp_request(f"quote/{symbol}")
        
        if not quote_data:
            raise HTTPException(status_code=404, detail="Quote not found")
            
        return {
            "symbol": symbol,
            "quote": quote_data[0] if quote_data else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/historical/{symbol}")
async def get_historical_data(symbol: str, period: str = "1month"):
    """Get historical stock price data"""
    try:
        symbol = symbol.upper()
        
        # Adjust API call based on period
        if period == "1day":
            endpoint = f"historical-chart/5min/{symbol}"  # Intraday data
        else:
            endpoint = f"historical-price-full/{symbol}?timeseries=30"  # Daily data, default to 1 month
            
        historical_data = make_fmp_request(endpoint)
        
        return {
            "symbol": symbol,
            "period": period,
            "data": historical_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/financials/{symbol}")
async def get_financial_data(symbol: str):
    """Get financial statements"""
    try:
        symbol = symbol.upper()
        
        income_statement = make_fmp_request(f"income-statement/{symbol}?limit=4")
        balance_sheet = make_fmp_request(f"balance-sheet-statement/{symbol}?limit=4")
        
        return {
            "symbol": symbol,
            "income_statement": income_statement,
            "balance_sheet": balance_sheet
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/test")
async def test_api():
    """Test API connectivity"""
    try:
        test_data = make_fmp_request("profile/AAPL")
        return {
            "status": "success",
            "message": "API connection working",
            "sample_data": test_data[0]["companyName"] if test_data else "No data"
        }
    except Exception as e:
        return {
            "status": "error", 
            "message": str(e)
        }
