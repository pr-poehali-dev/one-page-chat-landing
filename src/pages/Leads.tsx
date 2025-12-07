import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Lead {
  id: number;
  name: string;
  phone: string;
  city: string;
  address: string;
  object_type: string;
  object_type_other?: string;
  area: string;
  rooms?: string;
  services: string[];
  start_time: string;
  deadline?: string;
  budget: string;
  materials_interest: string;
  consultation_type: string;
  created_at: string;
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/a6285366-9cd1-4916-862e-21a416b5bf9e');
      const data = await response.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8 pt-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              Заявки клиентов
            </h1>
            <p className="text-muted-foreground">Всего заявок: {leads.length}</p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline" className="gap-2">
            <Icon name="Home" size={20} />
            На главную
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin">
              <Icon name="Loader2" size={48} className="text-primary" />
            </div>
          </div>
        ) : leads.length === 0 ? (
          <Card className="p-12 text-center">
            <Icon name="Inbox" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Пока нет заявок</h3>
            <p className="text-muted-foreground">Заявки будут появляться здесь после заполнения формы на сайте</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{lead.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span className="text-sm">{formatDate(lead.created_at)}</span>
                    </div>
                  </div>
                  <Badge className="text-base px-3 py-1">#{lead.id}</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Телефон</div>
                      <div className="font-semibold">{lead.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" size={16} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Адрес</div>
                      <div className="font-semibold">{lead.city}, {lead.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Home" size={16} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Тип объекта</div>
                      <div className="font-semibold">
                        {lead.object_type === 'Другое' ? lead.object_type_other : lead.object_type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Ruler" size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Площадь</div>
                      <div className="font-semibold">
                        {lead.area} м²{lead.rooms ? `, ${lead.rooms} комн.` : ''}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Услуги:</div>
                    <div className="flex flex-wrap gap-2">
                      {lead.services.map((service, index) => (
                        <Badge key={index} variant="outline">{service}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Старт:</span>{' '}
                      <span className="font-medium">{lead.start_time}</span>
                    </div>
                    {lead.deadline && (
                      <div>
                        <span className="text-muted-foreground">Дедлайн:</span>{' '}
                        <span className="font-medium">{lead.deadline}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Бюджет:</span>{' '}
                      <span className="font-medium">{lead.budget}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Материалы:</span>{' '}
                      <span className="font-medium">{lead.materials_interest}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Консультация:</span>{' '}
                      <span className="font-medium">{lead.consultation_type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="gap-2" onClick={() => window.open(`tel:${lead.phone}`)}>
                    <Icon name="Phone" size={16} />
                    Позвонить
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2" onClick={() => window.open(`https://wa.me/${lead.phone.replace(/\D/g, '')}`)}>
                    <Icon name="MessageCircle" size={16} />
                    WhatsApp
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
