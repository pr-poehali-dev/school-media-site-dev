CREATE TABLE IF NOT EXISTS forum_topics (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    emoji VARCHAR(10) DEFAULT '💬',
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forum_replies (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER REFERENCES forum_topics(id),
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO forum_topics (title, author, category, emoji, views) VALUES
('Подготовка к олимпиаде по математике', 'Иванов И.', 'students', '📐', 45),
('Родительское собрание 15 ноября', 'Классный руководитель', 'parents', '👨‍👩‍👧‍👦', 120),
('Новые учебники по физике', 'Петрова А.С.', 'teachers', '📚', 34),
('Экскурсия в музей космонавтики', 'Сидоров П.', 'students', '🚀', 89),
('Обсуждение школьной формы', 'Родительский комитет', 'parents', '👔', 230);

INSERT INTO forum_replies (topic_id, author, content, likes) VALUES
(1, 'Петров П.', 'Готов помочь с подготовкой! У меня есть хорошие материалы.', 5),
(1, 'Сидорова М.', 'Давайте соберемся после уроков в пятницу?', 3),
(2, 'Иванова Е.', 'Обязательно буду! Есть важные вопросы по успеваемости.', 2),
(3, 'Козлов А.', 'Новые учебники действительно лучше, больше практики!', 7),
(4, 'Смирнов К.', 'Супер идея! Когда планируется?', 12);