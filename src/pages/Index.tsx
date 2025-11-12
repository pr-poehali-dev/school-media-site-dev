import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  emoji: string;
  views: number;
  replies: number;
  created_at: string;
}

interface ForumReply {
  id: number;
  author: string;
  content: string;
  likes: number;
  created_at: string;
}

const FORUM_API = 'https://functions.poehali.dev/b5a77f7e-5949-4421-84bb-917c30b33f23';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [topicReplies, setTopicReplies] = useState<ForumReply[]>([]);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopicData, setNewTopicData] = useState({ title: '', author: '', category: 'students', emoji: '💬' });
  const [newReplyData, setNewReplyData] = useState({ author: '', content: '' });
  const [loading, setLoading] = useState(false);

  const sections = [
    { id: 'home', title: 'Главная', icon: 'Home', color: 'bg-primary' },
    { id: 'about', title: 'О школе', icon: 'School', color: 'bg-secondary' },
    { id: 'schedule', title: 'Расписание', icon: 'Calendar', color: 'bg-accent' },
    { id: 'news', title: 'Новости', icon: 'Newspaper', color: 'bg-purple-500' },
    { id: 'achievements', title: 'Достижения', icon: 'Trophy', color: 'bg-amber-500' },
    { id: 'contacts', title: 'Контакты', icon: 'Phone', color: 'bg-green-500' },
    { id: 'forum', title: 'Форум', icon: 'MessageCircle', color: 'bg-pink-500' }
  ];

  const news = [
    { id: 1, title: 'Открытие новой спортивной площадки', date: '10 ноября 2025', emoji: '⚽' },
    { id: 2, title: 'Победа в олимпиаде по математике', date: '8 ноября 2025', emoji: '🏆' },
    { id: 3, title: 'День открытых дверей', date: '5 ноября 2025', emoji: '🎉' }
  ];

  const achievements = [
    { title: 'Золото на олимпиаде', category: 'Математика', icon: '🥇' },
    { title: 'Лучшая команда года', category: 'Спорт', icon: '⚽' },
    { title: 'Конкурс роботов', category: 'Технологии', icon: '🤖' },
    { title: 'Творческий фестиваль', category: 'Искусство', icon: '🎨' }
  ];

  const schedule = [
    { time: '08:30 - 09:15', subject: 'Математика', room: '201' },
    { time: '09:25 - 10:10', subject: 'Русский язык', room: '305' },
    { time: '10:20 - 11:05', subject: 'Физика', room: '112' },
    { time: '11:25 - 12:10', subject: 'История', room: '208' },
    { time: '12:20 - 13:05', subject: 'Английский язык', room: '401' }
  ];

  const renderHome = () => (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            🚀 Школа №1
          </h1>
          <p className="text-xl mb-6 animate-fade-in opacity-90">
            Место, где знания становятся приключением!
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="animate-bounce-soft"
            onClick={() => setActiveSection('forum')}
          >
            Войти в форум
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
        <img 
          src="https://cdn.poehali.dev/projects/31fc1faf-cf00-45f3-9577-52396c794bf5/files/6079b686-66f3-4c4c-b6d2-ced5272fe48f.jpg" 
          alt="School" 
          className="absolute right-0 top-0 h-full object-cover opacity-20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.slice(1, -1).map((section, index) => (
          <Card 
            key={section.id}
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in border-2 hover:border-primary"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setActiveSection(section.id)}
          >
            <CardHeader>
              <div className={`${section.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <Icon name={section.icon as any} size={32} className="text-white" />
              </div>
              <CardTitle className="text-2xl">{section.title}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <span>📰</span> Последние новости
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {news.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
              <span className="text-4xl">{item.emoji}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
              <Icon name="ChevronRight" className="text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderAbout = () => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-4xl flex items-center gap-3">
          <span>🏫</span> О нашей школе
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">
            Школа №1 — это современное образовательное учреждение, где каждый ученик может раскрыть свой потенциал. 
            Мы создаём комфортную среду для обучения и развития творческих способностей.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-primary/10 p-6 rounded-2xl text-center">
            <div className="text-4xl font-bold text-primary mb-2">850</div>
            <div className="text-muted-foreground">Учеников</div>
          </div>
          <div className="bg-secondary/10 p-6 rounded-2xl text-center">
            <div className="text-4xl font-bold text-secondary mb-2">45</div>
            <div className="text-muted-foreground">Преподавателей</div>
          </div>
          <div className="bg-accent/10 p-6 rounded-2xl text-center">
            <div className="text-4xl font-bold text-accent mb-2">28</div>
            <div className="text-muted-foreground">Классов</div>
          </div>
        </div>

        <div className="space-y-4 mt-8">
          <h3 className="text-2xl font-semibold">Наши преимущества:</h3>
          <div className="grid gap-3">
            {[
              'Современное оборудование и интерактивные классы',
              'Квалифицированные педагоги с высшим образованием',
              'Спортивные секции и творческие кружки',
              'Индивидуальный подход к каждому ученику'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                <div className="text-2xl">✅</div>
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSchedule = () => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-4xl flex items-center gap-3">
          <span>📅</span> Расписание уроков
        </CardTitle>
        <CardDescription>Понедельник, 8А класс</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.map((lesson, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all"
            >
              <div className="bg-primary text-white px-4 py-2 rounded-xl font-semibold min-w-[140px] text-center">
                {lesson.time}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg">{lesson.subject}</div>
                <div className="text-sm text-muted-foreground">Кабинет {lesson.room}</div>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {index + 1}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderNews = () => (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex items-center gap-3">
            <span>📰</span> Новости школы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{item.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.date}</p>
                    <p className="text-lg leading-relaxed">
                      Подробности этого события можно узнать на стенде школы или в разделе форума.
                    </p>
                    <Button className="mt-4" variant="outline">
                      Читать далее
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex items-center gap-3">
            <span>🏆</span> Наши достижения
          </CardTitle>
          <CardDescription>Гордость школы — успехи наших учеников</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="overflow-hidden hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{achievement.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{achievement.title}</h3>
                      <Badge className="mt-2">{achievement.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
            <img 
              src="https://cdn.poehali.dev/projects/31fc1faf-cf00-45f3-9577-52396c794bf5/files/7ddc8231-3bc3-4f70-93fc-bf3130fb9859.jpg"
              alt="Achievements"
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">2024-2025 учебный год</h4>
            <p className="text-lg">
              Более 100 призовых мест в городских и региональных олимпиадах!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContacts = () => (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-4xl flex items-center gap-3">
          <span>📞</span> Контакты
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
              <Icon name="MapPin" className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-semibold mb-1">Адрес</h4>
                <p className="text-muted-foreground">г. Москва, ул. Школьная, д. 1</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
              <Icon name="Phone" className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-semibold mb-1">Телефон</h4>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl">
              <Icon name="Mail" className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p className="text-muted-foreground">school1@edu.ru</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
              <Icon name="Clock" className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-semibold mb-1">Режим работы</h4>
                <p className="text-muted-foreground">Пн-Пт: 8:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-4">Напишите нам</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Ваше имя"
                className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email"
                className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors"
              />
              <textarea 
                placeholder="Ваше сообщение"
                rows={4}
                className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors resize-none"
              />
              <Button className="w-full" size="lg">
                Отправить
                <Icon name="Send" className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    if (activeSection === 'forum') {
      loadForumTopics();
    }
  }, [activeSection]);

  const loadForumTopics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${FORUM_API}/?action=topics`);
      const data = await response.json();
      setForumTopics(data.topics || []);
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTopicReplies = async (topicId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${FORUM_API}/?action=replies&topic_id=${topicId}`);
      const data = await response.json();
      setTopicReplies(data.replies || []);
    } catch (error) {
      console.error('Error loading replies:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewTopic = async () => {
    if (!newTopicData.title || !newTopicData.author) {
      alert('Заполните название и имя автора!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(FORUM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_topic',
          ...newTopicData
        })
      });
      
      if (response.ok) {
        setShowNewTopicForm(false);
        setNewTopicData({ title: '', author: '', category: 'students', emoji: '💬' });
        await loadForumTopics();
      }
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Ошибка при создании темы');
    } finally {
      setLoading(false);
    }
  };

  const createNewReply = async () => {
    if (!newReplyData.author || !newReplyData.content || !selectedTopic) {
      alert('Заполните все поля!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(FORUM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_reply',
          topic_id: selectedTopic.id,
          ...newReplyData
        })
      });
      
      if (response.ok) {
        setNewReplyData({ author: '', content: '' });
        await loadTopicReplies(selectedTopic.id);
      }
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('Ошибка при отправке ответа');
    } finally {
      setLoading(false);
    }
  };

  const likeReply = async (replyId: number) => {
    try {
      await fetch(FORUM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'like',
          reply_id: replyId
        })
      });
      
      if (selectedTopic) {
        await loadTopicReplies(selectedTopic.id);
      }
    } catch (error) {
      console.error('Error liking reply:', error);
    }
  };

  const openTopic = (topic: ForumTopic) => {
    setSelectedTopic(topic);
    loadTopicReplies(topic.id);
  };

  const emojiList = ['💬', '📐', '📚', '🚀', '⚽', '🎨', '🤖', '💡', '🎯', '🌟'];

  const renderForum = () => (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl flex items-center gap-3">
            <span>💬</span> Школьный форум
          </CardTitle>
          <CardDescription>Общение учеников, учителей и родителей</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Все темы</TabsTrigger>
              <TabsTrigger value="students">Ученики</TabsTrigger>
              <TabsTrigger value="teachers">Учителя</TabsTrigger>
              <TabsTrigger value="parents">Родители</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4 mt-6">
              {selectedTopic ? (
                <div className="space-y-6">
                  <Button variant="ghost" onClick={() => setSelectedTopic(null)} className="mb-4">
                    <Icon name="ArrowLeft" className="mr-2" size={18} />
                    Назад к темам
                  </Button>

                  <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-6xl">{selectedTopic.emoji}</div>
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold mb-2">{selectedTopic.title}</h2>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Автор: {selectedTopic.author}</span>
                            <span className="flex items-center gap-1">
                              <Icon name="Eye" size={14} />
                              {selectedTopic.views}
                            </span>
                            <Badge>{
                              selectedTopic.category === 'students' ? 'Ученики' :
                              selectedTopic.category === 'teachers' ? 'Учителя' : 'Родители'
                            }</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {loading ? (
                      <p className="text-center text-muted-foreground py-8">Загрузка сообщений...</p>
                    ) : topicReplies.length > 0 ? (
                      topicReplies.map((reply) => (
                        <Card key={reply.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <span className="font-semibold text-primary">{reply.author}</span>
                                <span className="text-sm text-muted-foreground ml-3">
                                  {new Date(reply.created_at).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => likeReply(reply.id)}
                                className="gap-2"
                              >
                                <Icon name="ThumbsUp" size={16} />
                                {reply.likes}
                              </Button>
                            </div>
                            <p className="text-lg leading-relaxed">{reply.content}</p>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">Пока нет сообщений. Будьте первым!</p>
                    )}
                  </div>

                  <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                    <CardHeader>
                      <CardTitle className="text-xl">Написать сообщение</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={newReplyData.author}
                        onChange={(e) => setNewReplyData({ ...newReplyData, author: e.target.value })}
                        className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors"
                      />
                      <textarea
                        placeholder="Ваше сообщение"
                        value={newReplyData.content}
                        onChange={(e) => setNewReplyData({ ...newReplyData, content: e.target.value })}
                        rows={4}
                        className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors resize-none"
                      />
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={createNewReply}
                        disabled={loading}
                      >
                        {loading ? 'Отправка...' : 'Отправить'}
                        <Icon name="Send" className="ml-2" size={18} />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : showNewTopicForm ? (
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardHeader>
                    <CardTitle className="text-2xl">Создать новую тему</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Название темы</label>
                      <input
                        type="text"
                        placeholder="О чём хотите поговорить?"
                        value={newTopicData.title}
                        onChange={(e) => setNewTopicData({ ...newTopicData, title: e.target.value })}
                        className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Ваше имя</label>
                      <input
                        type="text"
                        placeholder="Как вас зовут?"
                        value={newTopicData.author}
                        onChange={(e) => setNewTopicData({ ...newTopicData, author: e.target.value })}
                        className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Категория</label>
                      <select
                        value={newTopicData.category}
                        onChange={(e) => setNewTopicData({ ...newTopicData, category: e.target.value })}
                        className="w-full p-3 rounded-xl border-2 border-border focus:border-primary outline-none transition-colors"
                      >
                        <option value="students">Ученики</option>
                        <option value="teachers">Учителя</option>
                        <option value="parents">Родители</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Выберите эмодзи</label>
                      <div className="flex gap-2 flex-wrap">
                        {emojiList.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setNewTopicData({ ...newTopicData, emoji })}
                            className={`text-3xl p-2 rounded-xl transition-all hover:scale-110 ${
                              newTopicData.emoji === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-white'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="flex-1"
                        size="lg"
                        onClick={createNewTopic}
                        disabled={loading}
                      >
                        {loading ? 'Создание...' : 'Создать тему'}
                        <Icon name="Plus" className="ml-2" size={18} />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowNewTopicForm(false)}
                      >
                        Отмена
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowNewTopicForm(true)}
                  >
                    <Icon name="Plus" className="mr-2" size={20} />
                    Создать новую тему
                  </Button>

                  {loading ? (
                    <p className="text-center text-muted-foreground py-8">Загрузка тем...</p>
                  ) : (
                    <div className="space-y-3">
                      {forumTopics.map((topic) => (
                        <Card
                          key={topic.id}
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => openTopic(topic)}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                              <div className="text-4xl">{topic.emoji}</div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2">{topic.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span>Автор: {topic.author}</span>
                                  <span className="flex items-center gap-1">
                                    <Icon name="MessageCircle" size={14} />
                                    {topic.replies}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Icon name="Eye" size={14} />
                                    {topic.views}
                                  </span>
                                  <Badge variant="outline">{
                                    topic.category === 'students' ? 'Ученики' :
                                    topic.category === 'teachers' ? 'Учителя' : 'Родители'
                                  }</Badge>
                                </div>
                              </div>
                              <Icon name="ChevronRight" className="text-muted-foreground" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <p className="text-center text-muted-foreground py-8">Темы для учеников</p>
            </TabsContent>

            <TabsContent value="teachers" className="mt-6">
              <p className="text-center text-muted-foreground py-8">Темы для учителей</p>
            </TabsContent>

            <TabsContent value="parents" className="mt-6">
              <p className="text-center text-muted-foreground py-8">Темы для родителей</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎓</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Школа №1
                </h1>
                <p className="text-sm text-muted-foreground">Образование будущего</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(section.id)}
                  className="gap-2"
                >
                  <Icon name={section.icon as any} size={18} />
                  <span className="hidden sm:inline">{section.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && renderHome()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'schedule' && renderSchedule()}
        {activeSection === 'news' && renderNews()}
        {activeSection === 'achievements' && renderAchievements()}
        {activeSection === 'contacts' && renderContacts()}
        {activeSection === 'forum' && renderForum()}
      </main>

      <footer className="bg-gradient-to-r from-primary to-secondary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">© 2025 Школа №1. Все права защищены.</p>
          <p className="text-sm opacity-90">Создано с ❤️ для учеников, учителей и родителей</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;