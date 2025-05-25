FROM golang:1.24-alpine AS builder

WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/. .
RUN go build -o main ./cmd/main.go

FROM alpine:latest
WORKDIR /app

# Установим netcat для ожидания БД
RUN apk add --no-cache netcat-openbsd

COPY --from=builder /app/main .
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/.env .
COPY backend/wait-for-db.sh .
RUN chmod +x wait-for-db.sh

EXPOSE 8080
CMD ["./wait-for-db.sh", "db", "./main"]
