FROM golang:1.24-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main ./cmd/main.go

FROM alpine:latest
WORKDIR /app
RUN apk add --no-cache netcat-openbsd

COPY --from=builder /app/main .
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/.env .
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

EXPOSE 8080
CMD ["./wait-for-db.sh", "db", "./main"]
