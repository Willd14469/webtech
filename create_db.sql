CREATE TABLE IF NOT EXISTS "users" (
    "user_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL, -- sha256 hash of the plain-text password
    "salt" TEXT NOT NULL, -- salt that is appended to the password before it is hashed
    "full_name" TEXT,
    "date_of_birth" CURRENT_DATE,
    "profile_pic_path" TEXT
);

CREATE TABLE IF NOT EXISTS "members" (
    "user_id" INTEGER,
    "group_id" INTEGER,
    "is_admin" INTEGER(1),
    "role" TEXT,
    "start_date" DATE,
    "end_date" DATE,
    FOREIGN KEY ("user_id") REFERENCES "users" (user_id),
    FOREIGN KEY ("group_id") REFERENCES "groups" (group_id)
);
