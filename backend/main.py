from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.stocks import router as stocks_router

# 创建FastAPI应用实例
app = FastAPI(
    title="Stock Analytics API",
    description="AI-assisted stock analytics backend",
    version="1.0.0"
)

# 配置CORS中间件，允许前端调用
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含股票相关的路由
app.include_router(stocks_router, prefix="/api/stocks", tags=["stocks"])

# 根路径测试端点
@app.get("/")
async def root():
    return {"message": "Stock Analytics API is running"}

# 健康检查端点
@app.get("/health")
async def health_check():
    return {"status": "healthy"}