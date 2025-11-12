import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

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
              <Button className="w-full" size="lg">
                <Icon name="Plus" className="mr-2" size={20} />
                Создать новую тему
              </Button>

              <div className="space-y-3">
                {[
                  { title: 'Подготовка к олимпиаде по математике', author: 'Иванов И.', replies: 12, views: 45, category: 'students', emoji: '📐' },
                  { title: 'Родительское собрание 15 ноября', author: 'Классный руководитель', replies: 8, views: 120, category: 'parents', emoji: '👨‍👩‍👧‍👦' },
                  { title: 'Новые учебники по физике', author: 'Петрова А.С.', replies: 5, views: 34, category: 'teachers', emoji: '📚' },
                  { title: 'Экскурсия в музей космонавтики', author: 'Сидоров П.', replies: 23, views: 89, category: 'students', emoji: '🚀' },
                  { title: 'Обсуждение школьной формы', author: 'Родительский комитет', replies: 45, views: 230, category: 'parents', emoji: '👔' }
                ].map((topic, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
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
