-- +goose Up

-- 1. Корневые категории
INSERT INTO categories (name, type, parent_id)
VALUES 
  ('Разработка', 'development', NULL),
  ('Обучение', 'education', NULL);

-- 2. Подкатегории разработки
INSERT INTO categories (name, type, parent_id)
VALUES
  ('Web', 'development', (SELECT id FROM categories WHERE name = 'Разработка')),
  ('Mobile', 'development', (SELECT id FROM categories WHERE name = 'Разработка')),
  ('Desktop', 'development', (SELECT id FROM categories WHERE name = 'Разработка')),
  ('DevOps', 'development', (SELECT id FROM categories WHERE name = 'Разработка'));

-- 3. Подкатегории обучения
INSERT INTO categories (name, type, parent_id)
VALUES
  ('Web Курсы', 'education', (SELECT id FROM categories WHERE name = 'Обучение')),
  ('Mobile Курсы', 'education', (SELECT id FROM categories WHERE name = 'Обучение')),
  ('DevOps Курсы', 'education', (SELECT id FROM categories WHERE name = 'Обучение'));

-- +goose Down

-- Удаляем всё в правильном порядке (сначала подкатегории, потом родительские)
DELETE FROM categories WHERE name IN (
  'Web', 'Mobile', 'Desktop', 'DevOps',
  'Web Курсы', 'Mobile Курсы', 'DevOps Курсы'
);

DELETE FROM categories WHERE name IN ('Разработка', 'Обучение');
