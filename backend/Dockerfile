# 使用 Node.js 20 LTS 版本（更好的 crypto 支援）
FROM node:20-alpine

# 安裝 bash（方便除錯）
RUN apk add --no-cache bash

# 設定工作目錄
WORKDIR /app

# 複製 package 檔案
COPY package*.json ./

# 安裝所有依賴（包含開發依賴）
RUN npm install

# 複製所有檔案
COPY . .

# 建置應用程式
RUN npm run build

# 暴露端口
EXPOSE 3000

# 啟動應用程式（開發模式）
CMD sh -c "npm run migration:run --data-source=master || true && \
    echo '啟動應用程式...' && \
    npm run start:dev"
