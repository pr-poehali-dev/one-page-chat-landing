import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
}

const portfolioItems = [
  {
    id: 1,
    type: 'Черновая квартира в новостройке',
    before: '/placeholder.svg',
    after: '/placeholder.svg',
    area: '75 м²',
    description: 'Современная двухкомнатная квартира с яркими акцентами'
  },
  {
    id: 2,
    type: 'Квартира на вторичке',
    before: '/placeholder.svg',
    after: '/placeholder.svg',
    area: '52 м²',
    description: 'Капремонт с перепланировкой и дизайн-проектом'
  },
  {
    id: 3,
    type: 'Частный дом, коттедж',
    before: '/placeholder.svg',
    after: '/placeholder.svg',
    area: '180 м²',
    description: 'Загородный дом в скандинавском стиле'
  },
  {
    id: 4,
    type: 'Коммерческое помещение',
    before: '/placeholder.svg',
    after: '/placeholder.svg',
    area: '120 м²',
    description: 'Современный офис с open-space зонами'
  }
];

const services = [
  {
    icon: 'Hammer',
    title: 'Ремонт под ключ',
    description: 'Полный цикл работ от черновой отделки до финишных штрихов'
  },
  {
    icon: 'PenTool',
    title: 'Дизайн-проект',
    description: 'Профессиональная визуализация и планировка пространства'
  },
  {
    icon: 'Home',
    title: 'Капитальный ремонт',
    description: 'Комплексное обновление вторичного жилья с перепланировкой'
  },
  {
    icon: 'ShoppingBag',
    title: 'Магазин материалов',
    description: 'Собственный склад отделочных материалов с выгодными ценами'
  }
];

export default function Index() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, text: 'Здравствуйте! Я помогу подобрать оптимальное решение для вашего ремонта. Как вас зовут?', isBot: true }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    objectType: '',
    objectTypeOther: '',
    area: '',
    rooms: '',
    services: [] as string[],
    startTime: '',
    deadline: '',
    budget: '',
    materialsInterest: '',
    consultationType: ''
  });
  const [selectedFilter, setSelectedFilter] = useState('Все');

  const addMessage = (text: string, isBot: boolean) => {
    setMessages(prev => [...prev, { id: prev.length, text, isBot }]);
  };

  const handleNextStep = (userAnswer: string) => {
    if (userAnswer) {
      addMessage(userAnswer, false);
    }

    setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);

      const botResponses = [
        'Отлично! Теперь укажите ваш контактный телефон',
        'Спасибо! В каком городе находится объект и его адрес?',
        'Понятно. Какой тип объекта вы планируете ремонтировать?',
        'Хорошо! Укажите площадь объекта и количество комнат',
        'Отлично! Что именно вы планируете делать?',
        'Когда вы планируете начать ремонт?',
        'Есть ли желаемые сроки завершения работ?',
        'Какой у вас ориентировочный бюджет на ремонт?',
        'У нас есть собственный магазин материалов! Хотите узнать подробнее?',
        'Как вам удобнее получить консультацию?',
        'Спасибо! Мы свяжемся с вами в ближайшее время для уточнения деталей 🚀'
      ];

      if (nextStep < botResponses.length) {
        addMessage(botResponses[nextStep], true);
      }
    }, 500);
  };

  const filteredPortfolio = selectedFilter === 'Все' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.type === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Здесь ремонт
          </h1>
          <nav className="hidden md:flex gap-8">
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#about" className="hover:text-primary transition-colors">О компании</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button onClick={() => setIsChatOpen(true)} className="gap-2">
            <Icon name="MessageCircle" size={20} />
            Получить расчет
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 animate-fade-in" variant="secondary">
            Ремонт с гарантией качества
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-scale-in bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Создаём интерьеры<br />вашей мечты
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Полный цикл работ от дизайн-проекта до финишной отделки. Собственный магазин материалов и команда профессионалов
          </p>
          <div className="flex gap-4 justify-center animate-fade-in">
            <Button size="lg" onClick={() => setIsChatOpen(true)} className="gap-2 text-lg px-8">
              <Icon name="Sparkles" size={24} />
              Начать ремонт
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="ImageIcon" size={24} />
              Посмотреть работы
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Наши услуги</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  <Icon name={service.icon} size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-8">Наши работы</h3>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Посмотрите трансформацию объектов до и после ремонта
          </p>
          
          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {['Все', 'Черновая квартира в новостройке', 'Квартира на вторичке', 'Частный дом, коттедж', 'Коммерческое помещение'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter)}
                size="sm"
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredPortfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="grid grid-cols-2">
                  <div className="relative group">
                    <img src={item.before} alt="До ремонта" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge variant="secondary" className="text-lg">До</Badge>
                    </div>
                  </div>
                  <div className="relative group">
                    <img src={item.after} alt="После ремонта" className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge className="text-lg">После</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <Badge variant="secondary">{item.area}</Badge>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold mb-6">О компании</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Более 10 лет мы создаём качественные интерьеры для жилых и коммерческих объектов. 
            Наша команда — это профессиональные дизайнеры, прорабы и мастера, которые превращают ваши идеи в реальность.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Завершённых объектов</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-secondary mb-2">10</div>
              <div className="text-muted-foreground">Лет на рынке</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold text-center mb-12">Контакты</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Phone" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Телефон</h4>
                  <p className="text-muted-foreground">+7 (xxx) xxx-xx-xx</p>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Mail" size={20} className="text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">info@zdesremont.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Адрес</h4>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h4 className="text-xl font-semibold mb-4">Готовы начать?</h4>
              <p className="text-muted-foreground mb-6">
                Нажмите кнопку ниже и ответьте на несколько вопросов. Мы подготовим для вас индивидуальное предложение!
              </p>
              <Button onClick={() => setIsChatOpen(true)} className="w-full gap-2" size="lg">
                <Icon name="MessageCircle" size={20} />
                Получить расчет
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-white/80 backdrop-blur-md border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Здесь ремонт. Все права защищены.</p>
        </div>
      </footer>

      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-scale-in">
            <div className="p-6 border-b bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="MessageCircle" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Калькулятор ремонта</h3>
                  <p className="text-sm text-white/80">Ответьте на вопросы для расчёта</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-orange-50/30 to-purple-50/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.isBot 
                      ? 'bg-white shadow-sm' 
                      : 'bg-gradient-to-r from-primary to-secondary text-white'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
                {step === 0 && (
                  <div>
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="mt-2"
                    />
                    <Button
                      onClick={() => formData.name && handleNextStep(`Меня зовут ${formData.name}`)}
                      className="mt-4 w-full"
                      disabled={!formData.name}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <Label htmlFor="phone">Контактный телефон *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 999-99-99"
                      className="mt-2"
                    />
                    <Button
                      onClick={() => formData.phone && handleNextStep(`Мой телефон: ${formData.phone}`)}
                      className="mt-4 w-full"
                      disabled={!formData.phone}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Москва"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Адрес объекта *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="ул. Примерная, д. 1"
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={() => formData.city && formData.address && handleNextStep(`${formData.city}, ${formData.address}`)}
                      className="mt-4 w-full"
                      disabled={!formData.city || !formData.address}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <Label>Тип объекта *</Label>
                    <RadioGroup value={formData.objectType} onValueChange={(value) => setFormData({ ...formData, objectType: value })} className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Черновая квартира в новостройке" id="type1" />
                        <Label htmlFor="type1" className="font-normal cursor-pointer">Черновая квартира в новостройке</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Квартира на вторичке" id="type2" />
                        <Label htmlFor="type2" className="font-normal cursor-pointer">Квартира на вторичке</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Частный дом, коттедж" id="type3" />
                        <Label htmlFor="type3" className="font-normal cursor-pointer">Частный дом, коттедж</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Коммерческое помещение" id="type4" />
                        <Label htmlFor="type4" className="font-normal cursor-pointer">Коммерческое помещение (офис, магазин)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Другое" id="type5" />
                        <Label htmlFor="type5" className="font-normal cursor-pointer">Другое</Label>
                      </div>
                    </RadioGroup>
                    {formData.objectType === 'Другое' && (
                      <Input
                        value={formData.objectTypeOther}
                        onChange={(e) => setFormData({ ...formData, objectTypeOther: e.target.value })}
                        placeholder="Укажите тип"
                        className="mt-3"
                      />
                    )}
                    <Button
                      onClick={() => formData.objectType && handleNextStep(formData.objectType === 'Другое' ? formData.objectTypeOther : formData.objectType)}
                      className="mt-4 w-full"
                      disabled={!formData.objectType || (formData.objectType === 'Другое' && !formData.objectTypeOther)}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="area">Площадь объекта (м²) *</Label>
                      <Input
                        id="area"
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="75"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Количество комнат</Label>
                      <Input
                        id="rooms"
                        type="number"
                        value={formData.rooms}
                        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                        placeholder="2"
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={() => formData.area && handleNextStep(`Площадь: ${formData.area} м²${formData.rooms ? `, комнат: ${formData.rooms}` : ''}`)}
                      className="mt-4 w-full"
                      disabled={!formData.area}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <Label>Что планируете делать? (можно несколько) *</Label>
                    <div className="mt-3 space-y-3">
                      {[
                        'Ремонт под ключ «с нуля»',
                        'Капитальный ремонт во вторичке',
                        'Дизайн-проект с реализацией',
                        'Только дизайн-проект'
                      ].map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({ ...formData, services: [...formData.services, service] });
                              } else {
                                setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
                              }
                            }}
                          />
                          <Label htmlFor={service} className="font-normal cursor-pointer">{service}</Label>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => formData.services.length > 0 && handleNextStep(formData.services.join(', '))}
                      className="mt-4 w-full"
                      disabled={formData.services.length === 0}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <Label>Когда планируете начать? *</Label>
                    <RadioGroup value={formData.startTime} onValueChange={(value) => setFormData({ ...formData, startTime: value })} className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="В течение месяца" id="time1" />
                        <Label htmlFor="time1" className="font-normal cursor-pointer">В течение месяца</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="В ближайшие 3 месяца" id="time2" />
                        <Label htmlFor="time2" className="font-normal cursor-pointer">В ближайшие 3 месяца</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Пока на стадии сбора информации" id="time3" />
                        <Label htmlFor="time3" className="font-normal cursor-pointer">Пока на стадии сбора информации</Label>
                      </div>
                    </RadioGroup>
                    <Button
                      onClick={() => formData.startTime && handleNextStep(formData.startTime)}
                      className="mt-4 w-full"
                      disabled={!formData.startTime}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 7 && (
                  <div>
                    <Label htmlFor="deadline">Желаемые сроки завершения</Label>
                    <Input
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="Например: к сентябрю 2025"
                      className="mt-2"
                    />
                    <Button
                      onClick={() => handleNextStep(formData.deadline || 'Сроки гибкие')}
                      className="mt-4 w-full"
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 8 && (
                  <div>
                    <Label>Ориентировочный бюджет *</Label>
                    <RadioGroup value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })} className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="500 тыс. – 1 млн. руб." id="budget1" />
                        <Label htmlFor="budget1" className="font-normal cursor-pointer">500 тыс. – 1 млн. руб.</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-2 млн. руб." id="budget2" />
                        <Label htmlFor="budget2" className="font-normal cursor-pointer">1-2 млн. руб.</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Более 2 млн. руб." id="budget3" />
                        <Label htmlFor="budget3" className="font-normal cursor-pointer">Более 2 млн. руб.</Label>
                      </div>
                    </RadioGroup>
                    <Button
                      onClick={() => formData.budget && handleNextStep(formData.budget)}
                      className="mt-4 w-full"
                      disabled={!formData.budget}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 9 && (
                  <div>
                    <Label>Интересует наш магазин материалов? *</Label>
                    <p className="text-sm text-muted-foreground mt-2 mb-3">
                      Мы предлагаем комплексное решение: дизайн + все материалы + ремонт. Это выгоднее и гарантирует точное соответствие проекту.
                    </p>
                    <RadioGroup value={formData.materialsInterest} onValueChange={(value) => setFormData({ ...formData, materialsInterest: value })} className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Да, интересует" id="mat1" />
                        <Label htmlFor="mat1" className="font-normal cursor-pointer">Да, хочу узнать подробнее</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Нет, спасибо" id="mat2" />
                        <Label htmlFor="mat2" className="font-normal cursor-pointer">Нет, спасибо</Label>
                      </div>
                    </RadioGroup>
                    <Button
                      onClick={() => formData.materialsInterest && handleNextStep(formData.materialsInterest)}
                      className="mt-4 w-full"
                      disabled={!formData.materialsInterest}
                    >
                      Далее
                    </Button>
                  </div>
                )}

                {step === 10 && (
                  <div>
                    <Label>Как удобнее получить консультацию? *</Label>
                    <RadioGroup value={formData.consultationType} onValueChange={(value) => setFormData({ ...formData, consultationType: value })} className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Позвонить по телефону" id="cons1" />
                        <Label htmlFor="cons1" className="font-normal cursor-pointer">Позвонить по телефону</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Видео-консультация" id="cons2" />
                        <Label htmlFor="cons2" className="font-normal cursor-pointer">Назначить видео-консультацию</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Выезд на объект" id="cons3" />
                        <Label htmlFor="cons3" className="font-normal cursor-pointer">Пригласить замерщика на объект</Label>
                      </div>
                    </RadioGroup>
                    <Button
                      onClick={() => {
                        if (formData.consultationType) {
                          handleNextStep(formData.consultationType);
                          toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время');
                        }
                      }}
                      className="mt-4 w-full"
                      disabled={!formData.consultationType}
                    >
                      Отправить заявку
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
