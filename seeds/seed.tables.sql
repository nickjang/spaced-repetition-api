BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'French', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'saleté', 'dirt', 2),
  (2, 1, 'herbe', 'grass', 3),
  (3, 1, 'tache', 'stain', 4),
  (4, 1, 'lumière', 'light', 5),
  (5, 1, 'feu', 'fire', 6),
  (6, 1, 'laver', 'wash', 7),
  (7, 1, 'parfait', 'perfect', 8),
  (8, 1, 'approfondi', 'thorough', 9),
  (9, 1, 'beau', 'beautiful', 10),
  (10, 1, 'incontestable', 'unquestionable', 11),
  (11, 1, 'majesté', 'majesty', 12),
  (12, 1, 'lin', 'linen', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
