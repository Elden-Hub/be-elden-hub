-- command to run the script in terminal
-- 🔻 use this command whit your terminal is pointing at the root directory of your project
-- psql -U postgres -f remakeDatabase.sql

-- env: DATABASE_URL=postgres://postgres:password@localhost:5432/artisans
-- env: TEST_DATABASE_URL=postgres://postgres:password@localhost:5432/artisans_test

DROP DATABASE IF EXISTS artisans;

CREATE DATABASE artisans
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;

DROP DATABASE IF EXISTS artisans_test;

CREATE DATABASE artisans_test
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;