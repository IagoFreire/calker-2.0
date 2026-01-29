import { Row, Col } from 'antd';
import { CalendarOutlined, DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import { PageHeaderContainer, PageTitle, PageSubtitle } from '../../components/common/PageHeader';
import { HomeContainer, FeatureCard, FeatureIcon, FeatureTitle, FeatureDescription } from './Home.styled';

const Home = () => {
  const features = [
    {
      icon: <CalendarOutlined />,
      title: 'Agenda Inteligente',
      description: 'Gerencie seus agendamentos de forma eficiente e nunca perca um compromisso.',
    },
    {
      icon: <DashboardOutlined />,
      title: 'Dashboard Completo',
      description: 'Visualize todas as métricas importantes do seu negócio em um só lugar.',
    },
    {
      icon: <TeamOutlined />,
      title: 'Gestão de Equipe',
      description: 'Organize sua equipe e otimize a produtividade da sua loja.',
    },
  ];

  return (
    <HomeContainer>
      <PageHeaderContainer>
        <PageTitle>Bem-vindo ao Calker</PageTitle>
        <PageSubtitle>Sistema de gestão de lojas de móveis planejados</PageSubtitle>
      </PageHeaderContainer>

      <Row gutter={[16, 16]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={24} md={8} key={index}>
            <FeatureCard hoverable>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          </Col>
        ))}
      </Row>
    </HomeContainer>
  );
};

export default Home;
