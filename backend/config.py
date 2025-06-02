import os
from dotenv import load_dotenv

load_dotenv("../.env")

class Settings:
    FMP_API_KEY = os.getenv("FMP_API_KEY")
    FMP_BASE_URL = "https://financialmodelingprep.com/api/v3"
    
    if not FMP_API_KEY:
        print("⚠️  Warning: FMP_API_KEY not found in environment variables")
        print("Please add your API key to the .env file")
    else:
        print("✅ FMP API Key loaded successfully")

settings = Settings()