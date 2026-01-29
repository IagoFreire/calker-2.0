import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, View, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Form, Button, Popconfirm, App } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
import { PageTitle, PageSubtitle } from '../../components/common/PageHeader';
import { Button as StyledButton } from '../../components/common/Button';
import { FormInput, FormTextArea, FormSelect, FormDatePicker, FormSelectOption } from '../../components/common/FormInput';
import { appointmentsService, Appointment } from '../../services/appointments';
import {
  AgendaContainer,
  AgendaHeader,
  HeaderContent,
  CalendarWrapper,
  EventContent,
  EventTitle,
  EventTime,
  EventClient,
} from './Agenda.styled';

// Configurar moment para português brasileiro ANTES de criar o localizer
// Importar e configurar locale antes de tudo
moment.locale('pt-br', {
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
});

// Criar o localizer com moment já configurado
const localizer = momentLocalizer(moment);

// Helper para garantir que o moment sempre use pt-br
const momentPtBr = (date: Date | string | number) => {
  const m = moment(date);
  m.locale('pt-br');
  return m;
};

// Função específica para formatar o cabeçalho do mês
const formatMonthHeader = (date: Date): string => {
  const m = moment(date);
  m.locale('pt-br');
  const monthName = m.format('MMMM');
  const year = m.format('YYYY');
  return `${monthName} de ${year}`;
};

// Componente customizado de Toolbar para garantir que o cabeçalho do mês seja renderizado em português
const CustomToolbar = (props: any) => {
  const { label, onNavigate, onView, view, date } = props;
  
  // Formatar o label usando moment com locale pt-br
  const formatLabel = () => {
    if (view === 'month') {
      // Para visualização mensal, usar o formatMonthHeader
      const currentDate = date || new Date();
      return formatMonthHeader(currentDate);
    }
    // Para outras visualizações, usar o label padrão mas garantir locale pt-br
    if (label) {
      // Tentar parsear o label como data e formatar em português
      const m = moment(label);
      if (m.isValid()) {
        m.locale('pt-br');
        return m.format('MMMM [de] YYYY');
      }
    }
    return label;
  };

  const goToBack = () => {
    onNavigate('PREV');
  };

  const goToNext = () => {
    onNavigate('NEXT');
  };

  const goToToday = () => {
    onNavigate('TODAY');
  };

  const goToView = (view: View) => {
    onView(view);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          ‹
        </button>
        <button type="button" onClick={goToToday}>
          Hoje
        </button>
        <button type="button" onClick={goToNext}>
          ›
        </button>
      </span>
      <span className="rbc-toolbar-label">{formatLabel()}</span>
      <span className="rbc-btn-group">
        <button
          type="button"
          className={view === 'month' ? 'rbc-active' : ''}
          onClick={() => goToView('month')}
        >
          Mês
        </button>
        <button
          type="button"
          className={view === 'week' ? 'rbc-active' : ''}
          onClick={() => goToView('week')}
        >
          Semana
        </button>
        <button
          type="button"
          className={view === 'day' ? 'rbc-active' : ''}
          onClick={() => goToView('day')}
        >
          Dia
        </button>
        <button
          type="button"
          className={view === 'agenda' ? 'rbc-active' : ''}
          onClick={() => goToView('agenda')}
        >
          Agenda
        </button>
      </span>
    </div>
  );
};

// Mensagens em português para o calendário
const messages = {
  allDay: 'Dia inteiro',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste período',
  showMore: (total: number) => `+ Ver mais ${total}`,
};


interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
}

const Agenda = () => {
  const { message } = App.useApp();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
  const [form] = Form.useForm();
  const [currentView, setCurrentView] = useState<View>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsService.getAll();
      setAppointments(data);
    } catch (error: any) {
      message.error('Erro ao carregar agendamentos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedEvent(null);
    form.resetFields();
    const start = moment(slotInfo.start).startOf('hour');
    const end = moment(slotInfo.start).add(1, 'hour');
    
    form.setFieldsValue({
      start_time: dayjs(start.toDate()),
      end_time: dayjs(end.toDate()),
    });
    setModalVisible(true);
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event.resource);
    form.setFieldsValue({
      title: event.resource.title,
      description: event.resource.description,
      start_time: dayjs(event.resource.start_time),
      end_time: dayjs(event.resource.end_time),
      client_name: event.resource.client_name,
      client_email: event.resource.client_email,
      client_phone: event.resource.client_phone,
      status: event.resource.status,
    });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const startTime = dayjs(values.start_time).toISOString();
      const endTime = dayjs(values.end_time).toISOString();

      if (selectedEvent) {
        // Atualizar
        await appointmentsService.update(selectedEvent.id, {
          ...values,
          start_time: startTime,
          end_time: endTime,
        });
        message.success('Agendamento atualizado com sucesso');
      } else {
        // Criar
        await appointmentsService.create({
          ...values,
          start_time: startTime,
          end_time: endTime,
        });
        message.success('Agendamento criado com sucesso');
      }

      setModalVisible(false);
      form.resetFields();
      setSelectedEvent(null);
      loadAppointments();
    } catch (error: any) {
      if (error.errorFields) {
        return; // Erro de validação do formulário
      }
      message.error(selectedEvent ? 'Erro ao atualizar agendamento' : 'Erro ao criar agendamento');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      await appointmentsService.delete(selectedEvent.id);
      message.success('Agendamento deletado com sucesso');
      setModalVisible(false);
      form.resetFields();
      setSelectedEvent(null);
      loadAppointments();
    } catch (error: any) {
      message.error('Erro ao deletar agendamento');
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    form.resetFields();
    setSelectedEvent(null);
  };

  const events: CalendarEvent[] = appointments.map((apt) => ({
    id: apt.id,
    title: apt.title,
    start: new Date(apt.start_time),
    end: new Date(apt.end_time),
    resource: apt,
  }));

  const eventStyleGetter = (event: CalendarEvent) => {
    const statusColors: { [key: string]: { backgroundColor: string; borderColor: string } } = {
      scheduled: { backgroundColor: '#006994', borderColor: '#005a7a' },
      confirmed: { backgroundColor: '#4ecdc4', borderColor: '#3db8a8' },
      completed: { backgroundColor: '#52c41a', borderColor: '#389e0d' },
      cancelled: { backgroundColor: '#ef5350', borderColor: '#d32f2f' },
    };

    const colors = statusColors[event.resource.status] || statusColors.scheduled;

    return {
      style: {
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        padding: '2px 4px',
      },
    };
  };

  const CustomEvent = ({ event }: { event: CalendarEvent }) => {
    return (
      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventTime>
          {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
        </EventTime>
        {event.resource.client_name && (
          <EventClient>{event.resource.client_name}</EventClient>
        )}
      </EventContent>
    );
  };

  return (
    <AgendaContainer>
      <AgendaHeader>
        <HeaderContent>
          <PageTitle>Agenda</PageTitle>
          <PageSubtitle>Gerencie seus agendamentos e compromissos</PageSubtitle>
        </HeaderContent>
        <StyledButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedEvent(null);
            form.resetFields();
            setModalVisible(true);
          }}
        >
          Novo Agendamento
        </StyledButton>
      </AgendaHeader>

      <CalendarWrapper>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={setCurrentDate}
          messages={messages}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
          culture="pt-BR"
          formats={{
            dayHeaderFormat: (date: Date) => momentPtBr(date).format('dddd, DD/MM'),
            dayFormat: (date: Date) => momentPtBr(date).format('DD'),
            weekdayFormat: (date: Date) => momentPtBr(date).format('ddd'),
            monthHeaderFormat: formatMonthHeader,
            dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
              `${momentPtBr(start).format('DD/MM')} - ${momentPtBr(end).format('DD/MM')}`,
            timeGutterFormat: (date: Date) => momentPtBr(date).format('HH:mm'),
            eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
              `${momentPtBr(start).format('HH:mm')} - ${momentPtBr(end).format('HH:mm')}`,
          }}
        />
      </CalendarWrapper>

      <Modal
        title={selectedEvent ? 'Editar Agendamento' : 'Novo Agendamento'}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            {selectedEvent && (
              <Popconfirm
                title="Tem certeza que deseja deletar este agendamento?"
                onConfirm={handleDelete}
                okText="Sim"
                cancelText="Não"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Deletar
                </Button>
              </Popconfirm>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
              <Button onClick={handleModalClose}>Cancelar</Button>
              <StyledButton 
                type="primary" 
                onClick={() => form.submit()} 
                icon={selectedEvent ? <EditOutlined /> : <PlusOutlined />}
              >
                {selectedEvent ? 'Atualizar' : 'Criar'}
              </StyledButton>
            </div>
          </div>
        }
        width={600}
        destroyOnHidden
        styles={{
          header: {
            padding: '18px 24px',
            fontSize: '18px',
            fontWeight: 600,
          },
          body: {
            maxHeight: 'calc(70vh - 180px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '24px',
          },
          content: {
            maxHeight: '70vh',
            display: 'flex',
            flexDirection: 'column',
          },
          footer: {
            borderTop: '1px solid #f0f0f0',
            padding: '16px 24px',
            marginTop: 0,
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'scheduled',
          }}
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: 'Por favor, insira o título' }]}
          >
            <FormInput placeholder="Ex: Reunião com cliente" />
          </Form.Item>

          <Form.Item name="description" label="Descrição">
            <FormTextArea rows={3} placeholder="Detalhes do agendamento..." />
          </Form.Item>

          <Form.Item
            name="start_time"
            label="Data e Hora de Início"
            rules={[{ required: true, message: 'Por favor, selecione a data e hora de início' }]}
            style={{ width: '100%' }}
          >
            <FormDatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              placeholder="Selecione a data e hora"
              locale={locale}
              style={{ width: '100%', minWidth: '300px' }}
            />
          </Form.Item>

          <Form.Item
            name="end_time"
            label="Data e Hora de Término"
            rules={[{ required: true, message: 'Por favor, selecione a data e hora de término' }]}
          >
            <FormDatePicker
              showTime
              format="DD/MM/YYYY HH:mm"
              placeholder="Selecione a data e hora"
              locale={locale}
            />
          </Form.Item>

          <Form.Item name="client_name" label="Nome do Cliente">
            <FormInput placeholder="Nome completo do cliente" />
          </Form.Item>

          <Form.Item
            name="client_email"
            label="E-mail do Cliente"
            rules={[{ type: 'email', message: 'E-mail inválido' }]}
          >
            <FormInput placeholder="cliente@email.com" />
          </Form.Item>

          <Form.Item name="client_phone" label="Telefone do Cliente">
            <FormInput placeholder="(00) 00000-0000" />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <FormSelect placeholder="Selecione o status">
              <FormSelectOption value="scheduled">Agendado</FormSelectOption>
              <FormSelectOption value="confirmed">Confirmado</FormSelectOption>
              <FormSelectOption value="completed">Concluído</FormSelectOption>
              <FormSelectOption value="cancelled">Cancelado</FormSelectOption>
            </FormSelect>
          </Form.Item>
        </Form>
      </Modal>
    </AgendaContainer>
  );
};

export default Agenda;
