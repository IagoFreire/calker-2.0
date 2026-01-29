import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { ThemeProvider } from 'styled-components';
import ptBR from 'antd/locale/pt_BR';
import Login from './pages/Login';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Agenda from './pages/Agenda';
import Configuracoes from './pages/Configuracoes';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { theme as styledTheme } from './styles/theme';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'var(--ocean-bg-light)'
      }}>
        <div style={{ 
          fontSize: '18px', 
          color: 'var(--ocean-primary)',
          fontWeight: 500
        }}>
          Carregando...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agenda" element={<Agenda />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  );
}

function App() {
  const { defaultAlgorithm } = theme;

  return (
    <ThemeProvider theme={styledTheme}>
      <ConfigProvider 
        locale={ptBR}
        theme={{
          algorithm: defaultAlgorithm,
          token: {
            colorPrimary: '#006994',
            colorSuccess: '#4ecdc4',
            colorWarning: '#ffa726',
            colorError: '#ef5350',
            colorInfo: '#00a8cc',
            borderRadius: 8,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          },
          components: {
            Button: {
              borderRadius: 12,
              fontWeight: 600,
              controlHeight: 48,
              fontSize: 16,
            },
            Input: {
              borderRadius: 8,
              controlHeight: 48,
            },
            DatePicker: {
              controlHeight: 48,
              borderRadius: 8,
              colorBorder: '#e5f4f8',
              colorPrimaryBorderHover: '#006994',
              activeBorderColor: '#006994',
            },
            Select: {
              controlHeight: 48,
              optionHeight: 48,
              optionPadding: '12px 16px',
              optionFontSize: 16,
            },
            Card: {
              borderRadius: 12,
            },
          },
        }}
      >
        <AntApp>
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </AntApp>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
