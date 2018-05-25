CREATE TABLE IF NOT EXISTS "users" (
    "user_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL, 
    "salt" TEXT NOT NULL, 
    "full_name" TEXT,
    "date_of_birth" CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS "events" (
    "event_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "organizer_id" INTEGER,
    "event_name" TEXT,
    "location" TEXT,
    "description" TEXT,
    "start_timestamp" TIMESTAMP,
    "end_timestamp" TIMESTAMP,
    FOREIGN KEY ("organizer_id") REFERENCES "users" (user_id)
);