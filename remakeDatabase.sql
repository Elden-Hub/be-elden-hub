-- command to run the script in terminal
-- 🔻 use this command whit your terminal is pointing at the root directory of your project
-- psql -U postgres -f remakeDatabase.sql

-- env: DATABASE_URL=postgres://postgres:password@localhost:5432/eldenhub
-- env: TEST_DATABASE_URL=postgres://postgres:password@localhost:5432/eldenhub_test

DROP DATABASE IF EXISTS eldenhub;

CREATE DATABASE eldenhub
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;

DROP DATABASE IF EXISTS eldenhub_test;

CREATE DATABASE eldenhub_test
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  CONNECTION LIMIT = -1
;