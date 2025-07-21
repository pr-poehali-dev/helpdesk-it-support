import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Низкий' | 'Средний' | 'Высокий' | 'Критический';
  status: 'Новая' | 'В работе' | 'Решена' | 'Закрыта';
  createdAt: string;
  assignee?: string;
}

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'HD-001',
      title: 'Не работает 1С:ERP',
      description: 'При попытке входа в систему выдает ошибку соединения с базой данных',
      category: '1С:ERP, 1С:Документооборот',
      priority: 'Высокий',
      status: 'В работе',
      createdAt: '2024-01-15',
      assignee: 'Иванов И.И.'
    },
    {
      id: 'HD-002',
      title: 'Замена картриджа в принтере HP LaserJet',
      description: 'Требуется замена тонер-картриджа в принтере на 3 этаже',
      category: 'Компьютерная и орг.техника',
      priority: 'Средний',
      status: 'Новая',
      createdAt: '2024-01-15'
    },
    {
      id: 'HD-003',
      title: 'Настройка VPN подключения',
      description: 'Новому сотруднику необходимо настроить VPN для удаленной работы',
      category: 'Общие вопросы',
      priority: 'Средний',
      status: 'Решена',
      createdAt: '2024-01-14',
      assignee: 'Петров П.П.'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Средний' as const
  });

  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  const handleCreateTicket = () => {
    if (newTicket.title && newTicket.description && newTicket.category) {
      const ticket: Ticket = {
        id: `HD-${String(tickets.length + 1).padStart(3, '0')}`,
        title: newTicket.title,
        description: newTicket.description,
        category: newTicket.category,
        priority: newTicket.priority,
        status: 'Новая',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: '', description: '', category: '', priority: 'Средний' });
      setShowNewTicketForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критический': return 'bg-red-100 text-red-800 border-red-200';
      case 'Высокий': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Средний': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Низкий': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новая': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'В работе': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Решена': return 'bg-green-100 text-green-800 border-green-200';
      case 'Закрыта': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const categoryCounts = {
    'all': tickets.length,
    '1С:ERP, 1С:Документооборот': tickets.filter(t => t.category === '1С:ERP, 1С:Документооборот').length,
    'Компьютерная и орг.техника': tickets.filter(t => t.category === 'Компьютерная и орг.техника').length,
    'Общие вопросы': tickets.filter(t => t.category === 'Общие вопросы').length
  };

  const statusCounts = {
    'Новая': tickets.filter(t => t.status === 'Новая').length,
    'В работе': tickets.filter(t => t.status === 'В работе').length,
    'Решена': tickets.filter(t => t.status === 'Решена').length,
    'Закрыта': tickets.filter(t => t.status === 'Закрыта').length
  };

  return (
    <div className="min-h-screen bg-muted font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">IT Helpdesk</h1>
            </div>
            <Badge variant="secondary" className="text-xs">
              Система учета задач
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setShowNewTicketForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Новая заявка
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Icon name="User" size={16} />
              <span>Администратор</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего заявок</p>
                  <p className="text-3xl font-bold text-gray-900">{categoryCounts.all}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="TicketCheck" size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">В работе</p>
                  <p className="text-3xl font-bold text-purple-600">{statusCounts['В работе']}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Решено сегодня</p>
                  <p className="text-3xl font-bold text-green-600">{statusCounts['Решена']}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Средн. время</p>
                  <p className="text-3xl font-bold text-orange-600">2.4ч</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="Timer" size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="Database" size={24} className="text-blue-600" />
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  {categoryCounts['1С:ERP, 1С:Документооборот']} заявок
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1С:ERP, 1С:Документооборот</h3>
              <p className="text-sm text-gray-600">Техническая поддержка систем 1С, настройка, обновления</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="Monitor" size={24} className="text-green-600" />
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {categoryCounts['Компьютерная и орг.техника']} заявок
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Компьютерная и орг.техника</h3>
              <p className="text-sm text-gray-600">Ремонт компьютеров, принтеров, настройка оборудования</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon name="HelpCircle" size={24} className="text-purple-600" />
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  {categoryCounts['Общие вопросы']} заявок
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Общие вопросы</h3>
              <p className="text-sm text-gray-600">Консультации, настройка ПО, обучение пользователей</p>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Section */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="new">Новые</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="resolved">Решенные</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{ticket.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            {ticket.createdAt}
                          </span>
                          {ticket.assignee && (
                            <span className="flex items-center">
                              <Icon name="User" size={14} className="mr-1" />
                              {ticket.assignee}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Комментарий
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid gap-4">
              {tickets.filter(t => t.status === 'Новая').map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{ticket.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            {ticket.createdAt}
                          </span>
                          {ticket.assignee && (
                            <span className="flex items-center">
                              <Icon name="User" size={14} className="mr-1" />
                              {ticket.assignee}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Комментарий
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-4">
              {tickets.filter(t => t.status === 'В работе').map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{ticket.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            {ticket.createdAt}
                          </span>
                          {ticket.assignee && (
                            <span className="flex items-center">
                              <Icon name="User" size={14} className="mr-1" />
                              {ticket.assignee}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Комментарий
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved">
            <div className="grid gap-4">
              {tickets.filter(t => t.status === 'Решена').map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono text-gray-500">{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{ticket.category}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{ticket.title}</h3>
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Icon name="Calendar" size={14} className="mr-1" />
                            {ticket.createdAt}
                          </span>
                          {ticket.assignee && (
                            <span className="flex items-center">
                              <Icon name="User" size={14} className="mr-1" />
                              {ticket.assignee}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={14} className="mr-1" />
                          Редактировать
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Комментарий
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Создать новую заявку</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowNewTicketForm(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Название заявки</Label>
                <Input
                  id="title"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  placeholder="Краткое описание проблемы"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Категория</Label>
                <Select value={newTicket.category} onValueChange={(value) => setNewTicket({...newTicket, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1С:ERP, 1С:Документооборот">1С:ERP, 1С:Документооборот</SelectItem>
                    <SelectItem value="Компьютерная и орг.техника">Компьютерная и орг.техника</SelectItem>
                    <SelectItem value="Общие вопросы">Общие вопросы</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Приоритет</Label>
                <Select value={newTicket.priority} onValueChange={(value: any) => setNewTicket({...newTicket, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Низкий">Низкий</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Высокий">Высокий</SelectItem>
                    <SelectItem value="Критический">Критический</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Описание проблемы</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  placeholder="Подробное описание проблемы или запроса"
                  rows={4}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button onClick={handleCreateTicket} className="flex-1">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать заявку
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewTicketForm(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;