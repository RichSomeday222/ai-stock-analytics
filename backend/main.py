from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.stocks import router as stocks_router


app = FastAPI(
    title="Stock Analytics API",
    description="AI-assisted stock analytics backend",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(stocks_router, prefix="/api/stocks", tags=["stocks"])


@app.get("/")
async def root():
    return {"message": "Stock Analytics API is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}