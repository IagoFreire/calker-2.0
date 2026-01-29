import { useState } from 'react';
import { Form, message } from 'antd';
import { UserOutlined, LockOutlined, CalendarOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LoginContainer,
  LoginWrapper,
  ImageSection,
  ImageContent,
  ImageLogo,
  ImageLogoIcon,
  ImageTitle,
  ImageDescription,
  ImageDecoration,
  DecorationCircle,
  FormSection,
  LoginContent,
  LoginCard,
  MobileWelcomeContent,
  MobileLogo,
  MobileTitle,
  MobileDescription,
  LoginHeader,
  LoginTitle,
  LoginSubtitle,
  LoginInput,
  LoginPasswordInput,
  InputIcon,
  LoginButtonItem,
} from './Login.styled';
import { Button } from '../../components/common/Button';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Login realizado com sucesso!');
      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <ImageSection>
          <ImageDecoration>
            <DecorationCircle $size={350} $top="-80px" $left="-80px" $delay="0.8s" />
            <DecorationCircle $size={250} $bottom="-40px" $right="-40px" $delay="1s" />
            <DecorationCircle $size={180} $top="45%" $right="8%" $delay="1.2s" />
          </ImageDecoration>
          <ImageContent>
            <ImageLogo>
              <ImageLogoIcon>
                <CalendarOutlined />
              </ImageLogoIcon>
            </ImageLogo>
            <ImageTitle>Bem-vindo ao Calker</ImageTitle>
            <ImageDescription>
              Gerencie seus agendamentos de forma simples e eficiente
            </ImageDescription>
          </ImageContent>
        </ImageSection>
        <FormSection>
          <ImageDecoration className="mobile-decoration">
            <DecorationCircle $size={350} $top="-80px" $left="-80px" $delay="0.8s" />
            <DecorationCircle $size={250} $bottom="-40px" $right="-40px" $delay="1s" />
            <DecorationCircle $size={180} $top="45%" $right="8%" $delay="1.2s" />
          </ImageDecoration>
          <LoginContent>
            <LoginCard bordered={false}>
              <MobileWelcomeContent>
                <MobileLogo>
                  <ImageLogoIcon>
                    <CalendarOutlined />
                  </ImageLogoIcon>
                </MobileLogo>
                <MobileTitle>Bem-vindo ao Calker</MobileTitle>
                <MobileDescription>
                  Gerencie seus agendamentos de forma simples e eficiente
                </MobileDescription>
              </MobileWelcomeContent>
              <LoginHeader>
                <LoginTitle>Entrar</LoginTitle>
                <LoginSubtitle>Bem-vindo de volta! Faça login para continuar.</LoginSubtitle>
              </LoginHeader>
              <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                size="large"
                style={{ marginTop: '8px' }}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor, insira seu email!' },
                    { type: 'email', message: 'Email inválido!' },
                  ]}
                >
                  <LoginInput
                    prefix={<InputIcon><UserOutlined /></InputIcon>}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                >
                  <LoginPasswordInput
                    prefix={<InputIcon><LockOutlined /></InputIcon>}
                    placeholder="Senha"
                  />
                </Form.Item>

                <LoginButtonItem>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    block 
                    loading={loading}
                  >
                    Entrar
                  </Button>
                </LoginButtonItem>
              </Form>
            </LoginCard>
          </LoginContent>
        </FormSection>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
