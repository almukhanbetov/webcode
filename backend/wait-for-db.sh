#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

# Используем переменную POSTGRES_PORT, или 5432 по умолчанию
port="${POSTGRES_PORT:-5432}"

echo "⏳ Ожидаем базу данных на $host:$port..."

# Ждём пока порт станет доступен
until nc -z "$host" "$port"; do
  >&2 echo "⏳ БД недоступна на $host:$port — ждём..."
  sleep 1
done

echo "✅ БД готова — запускаем приложение"
exec $cmd
