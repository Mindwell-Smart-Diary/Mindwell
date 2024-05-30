DROP TABLE IF EXISTS suggestions;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Create the events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  mood TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create the suggestions table
CREATE TABLE suggestions (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rank INTEGER,
  execution_date DATE,
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);
