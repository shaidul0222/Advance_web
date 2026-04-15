CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    item TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    qty INTEGER NOT NULL,
    message TEXT,
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    newsletter BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);