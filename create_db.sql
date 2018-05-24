CREATE TABLE IF NOT EXISTS "users" (
    "user_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL, -- sha256 hash of the plain-text password
    "salt" TEXT NOT NULL, -- salt that is appended to the password before it is hashed
    "full_name" TEXT,
    "date_of_birth" CURRENT_DATE,
);

