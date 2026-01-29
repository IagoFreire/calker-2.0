import { Row, Col, Table, Tag } from 'antd';
import {
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { Line, Column, Pie } from '@ant-design/charts';
import { PageHeaderContainer, PageTitle, PageSubtitle } from '../../components/common/PageHeader';
import {
  DashboardContainer,
  StatCard,
  StatIcon,
  ChartCard,
  ChartTitle,
  TableCard,
  ChartWrapper,
} from './Dashboard.styled';

const Dashboard = () => {
  // Dados falsos para estatísticas
  const stats = [
    {
      title: 'Agendamentos Hoje',
      value: 12,
      icon: <CalendarOutlined />,
      color: '#006994',
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Clientes Ativos',
      value: 248,
      icon: <UserOutlined />,
      color: '#4ecdc4',
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Concluídos',
      value: 156,
      icon: <CheckCircleOutlined />,
      color: '#52c41a',
      change: '+5%',
      trend: 'up',
    },
    {
      title: 'Em Andamento',
      value: 23,
      icon: <ClockCircleOutlined />,
      color: '#ffa726',
      change: '-3%',
      trend: 'down',
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.8K',
      icon: <DollarOutlined />,
      color: '#006994',
      change: '+18%',
      trend: 'up',
    },
    {
      title: 'Taxa de Conversão',
      value: '68%',
      icon: <RiseOutlined />,
      color: '#4ecdc4',
      change: '+4%',
      trend: 'up',
    },
  ];

  // Dados falsos para gráfico de linha (agendamentos ao longo do tempo)
  const appointmentsData = [
    { mes: 'Jan', agendamentos: 45, concluidos: 38 },
    { mes: 'Fev', agendamentos: 52, concluidos: 45 },
    { mes: 'Mar', agendamentos: 48, concluidos: 42 },
    { mes: 'Abr', agendamentos: 61, concluidos: 55 },
    { mes: 'Mai', agendamentos: 55, concluidos: 48 },
    { mes: 'Jun', agendamentos: 67, concluidos: 62 },
    { mes: 'Jul', agendamentos: 72, concluidos: 68 },
  ];

  // Preparar dados para gráfico de linha com múltiplas séries
  const lineData = [
    ...appointmentsData.map((item) => ({ mes: item.mes, valor: item.agendamentos, tipo: 'Agendamentos' })),
    ...appointmentsData.map((item) => ({ mes: item.mes, valor: item.concluidos, tipo: 'Concluídos' })),
  ];

  const lineConfig = {
    data: lineData,
    xField: 'mes',
    yField: 'valor',
    seriesField: 'tipo',
    smooth: true,
    color: ['#006994', '#52c41a'],
    point: {
      size: 5,
      shape: 'circle',
    },
    legend: {
      position: 'top-right' as const,
    },
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    },
  };

  // Dados falsos para gráfico de barras (vendas por mês)
  const salesData = [
    { mes: 'Jan', vendas: 32000, meta: 35000 },
    { mes: 'Fev', vendas: 38000, meta: 35000 },
    { mes: 'Mar', vendas: 42000, meta: 40000 },
    { mes: 'Abr', vendas: 45000, meta: 40000 },
    { mes: 'Mai', vendas: 48000, meta: 45000 },
    { mes: 'Jun', vendas: 52000, meta: 50000 },
    { mes: 'Jul', vendas: 58000, meta: 55000 },
  ];

  // Preparar dados para gráfico de barras agrupadas
  const columnData = [
    ...salesData.map((item) => ({ mes: item.mes, valor: item.vendas, tipo: 'Vendas' })),
    ...salesData.map((item) => ({ mes: item.mes, valor: item.meta, tipo: 'Meta' })),
  ];

  const columnConfig = {
    data: columnData,
    xField: 'mes',
    yField: 'valor',
    seriesField: 'tipo',
    isGroup: true,
    color: ['#006994', '#4ecdc4'],
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    legend: {
      position: 'top-right' as const,
    },
    animation: {
      appear: {
        animation: 'scale-in-y',
        duration: 2000,
      },
    },
  };

  // Dados falsos para gráfico de pizza (distribuição de status)
  const statusData = [
    { type: 'Concluídos', value: 156 },
    { type: 'Em Andamento', value: 23 },
    { type: 'Agendados', value: 45 },
    { type: 'Cancelados', value: 8 },
  ];

  const pieConfig: any = {
    data: statusData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.4,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    color: ['#52c41a', '#ffa726', '#006994', '#ef5350'],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: statusData.reduce((sum, item) => sum + item.value, 0).toString(),
      },
    },
    legend: {
      position: 'left' as const,
    },
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Dados falsos para tabela de agendamentos recentes
  const recentAppointments = [
    {
      key: '1',
      cliente: 'João Silva',
      servico: 'Projeto Cozinha',
      data: '2024-01-15T14:00:00',
      status: 'Concluído',
      valor: 'R$ 12.500',
    },
    {
      key: '2',
      cliente: 'Maria Santos',
      servico: 'Projeto Sala',
      data: '2024-01-15T16:00:00',
      status: 'Em Andamento',
      valor: 'R$ 8.900',
    },
    {
      key: '3',
      cliente: 'Pedro Costa',
      servico: 'Projeto Quarto',
      data: '2024-01-16T10:00:00',
      status: 'Agendado',
      valor: 'R$ 6.200',
    },
    {
      key: '4',
      cliente: 'Ana Oliveira',
      servico: 'Projeto Escritório',
      data: '2024-01-16T14:00:00',
      status: 'Agendado',
      valor: 'R$ 9.800',
    },
    {
      key: '5',
      cliente: 'Carlos Mendes',
      servico: 'Projeto Banheiro',
      data: '2024-01-17T09:00:00',
      status: 'Agendado',
      valor: 'R$ 4.500',
    },
  ];

  const columns = [
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Serviço',
      dataIndex: 'servico',
      key: 'servico',
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          Concluído: 'green',
          'Em Andamento': 'orange',
          Agendado: 'blue',
          Cancelado: 'red',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },
  ];

  return (
    <DashboardContainer>
      <PageHeaderContainer>
        <PageTitle>Dashboard</PageTitle>
        <PageSubtitle>Visão geral do seu negócio</PageSubtitle>
      </PageHeaderContainer>

      {/* Cards de Estatísticas */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={8} lg={4} key={index}>
            <StatCard color={stat.color}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <StatIcon color={stat.color}>{stat.icon}</StatIcon>
                <span
                  style={{
                    fontSize: '11px',
                    color: stat.trend === 'up' ? '#52c41a' : '#ef5350',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  {stat.trend === 'up' ? <RiseOutlined /> : <FallOutlined />}
                  {stat.change}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 'clamp(22px, 4.5vw, 24px)', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.2, flex: 1, minWidth: 0 }}>
                  {stat.title}
                </div>
              </div>
            </StatCard>
          </Col>
        ))}
      </Row>

      {/* Gráficos */}
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        {/* Gráfico de Linha - Agendamentos */}
        <Col xs={24} lg={12}>
          <ChartCard>
            <ChartTitle>Agendamentos ao Longo do Tempo</ChartTitle>
            <ChartWrapper>
              <Line {...lineConfig} height={220} />
            </ChartWrapper>
          </ChartCard>
        </Col>

        {/* Gráfico de Barras - Vendas */}
        <Col xs={24} lg={12}>
          <ChartCard>
            <ChartTitle>Vendas vs Meta Mensal</ChartTitle>
            <ChartWrapper>
              <Column {...columnConfig} height={220} />
            </ChartWrapper>
          </ChartCard>
        </Col>

        {/* Gráfico de Pizza - Status */}
        <Col xs={24} lg={12}>
          <ChartCard>
            <ChartTitle>Distribuição de Status</ChartTitle>
            <ChartWrapper>
              <Pie {...pieConfig} height={220} />
            </ChartWrapper>
          </ChartCard>
        </Col>

        {/* Tabela de Agendamentos Recentes */}
        <Col xs={24} lg={12}>
          <TableCard>
            <ChartTitle>Agendamentos Recentes</ChartTitle>
            <Table
              dataSource={recentAppointments}
              columns={columns}
              pagination={false}
              size="small"
              style={{ marginTop: '12px' }}
            />
          </TableCard>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

export default Dashboard;
