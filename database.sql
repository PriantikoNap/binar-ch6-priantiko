CREATE TABLE user_game (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(10) NOT NULL,
  pass VARCHAR(15) NOT NULL
  );

CREATE TABLE user_game_biodata(
    id SERIAL PRIMARY KEY NOT NULL,
    nama VARCHAR(20) NOT NULL,
    alamat VARCHAR(20),
    email VARCHAR(20) NOT NULL,
    wallet NUMERIC DEFAULT 0,
    country VARCHAR(20),
    create_at TIMESTAMP DEFAULT now()
);

CREATE TABLE user_game_history(
    id SERIAL PRIMARY KEY,
    played NUMERIC DEFAULT 0,
    lvl NUMERIC DEFAULT 0,
);