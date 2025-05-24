-- +goose Up
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    type TEXT CHECK (type IN ('development', 'education')) NOT NULL,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    title TEXT NOT NULL,
    description TEXT,
    level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    price NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'student', 'instructor')) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER REFERENCES courses(id),
    enrolled_at TIMESTAMP DEFAULT NOW(),
    status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active'
);
-- +goose Down
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS categories;

