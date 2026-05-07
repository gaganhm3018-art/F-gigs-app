-- Initialize PostgreSQL database with initial schema
-- This file runs automatically on container startup

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_income_user_id ON "Income"(user_id);
CREATE INDEX IF NOT EXISTS idx_income_date ON "Income"(date);
CREATE INDEX IF NOT EXISTS idx_income_source ON "Income"(source);
