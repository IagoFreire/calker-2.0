import { useState, useEffect } from 'react';
import { Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  DashboardOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import {
  AppLayout,
  Sidebar,
  SidebarContent,
  SidebarTop,
  SidebarBottom,
  Logo,
  StyledMenu,
  AppHeader,
  TriggerButton,
  UserMenuContainer,
  UserEmail,
  AppContent,
  MobileDrawer,
  DrawerCloseIcon,
  CloseButton,
} from './Layout.styled';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/agenda',
      icon: <CalendarOutlined />,
      label: 'Agenda',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'user-info',
      label: (
        <div style={{ padding: '8px 0' }}>
          <div style={{ fontWeight: 'bold' }}>{user?.email}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {user?.role === 'super_admin' ? 'Super Admin' : 
             user?.role === 'store_admin' ? 'Admin da Loja' : 'Usuário'}
          </div>
        </div>
      ),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sair',
      onClick: handleLogout,
    },
  ];

  const menuContent = (
    <SidebarContent>
      {isMobile && (
        <CloseButton onClick={() => setMobileMenuOpen(false)}>
          <LeftOutlined />
        </CloseButton>
      )}
      <SidebarTop>
        <Logo $collapsed={isMobile ? false : collapsed}>
          {isMobile ? 'Calker' : (collapsed ? 'C' : 'Calker')}
        </Logo>
        <StyledMenu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </SidebarTop>
      <SidebarBottom>
        <StyledMenu
          theme="dark"
          mode="inline"
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Sair',
              onClick: handleLogout,
            },
          ]}
        />
      </SidebarBottom>
    </SidebarContent>
  );

  return (
    <AppLayout>
      {isMobile ? (
        <MobileDrawer
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          width={280}
          closeIcon={<DrawerCloseIcon><LeftOutlined /></DrawerCloseIcon>}
          title={null}
        >
          {menuContent}
        </MobileDrawer>
      ) : (
        <Sidebar
          trigger={null}
          collapsible
          collapsed={collapsed}
          $isMobile={isMobile}
          width={280}
          collapsedWidth={80}
        >
          {menuContent}
        </Sidebar>
      )}
      <AppLayout>
        <AppHeader $collapsed={collapsed} $isMobile={isMobile}>
          <TriggerButton
            type="text"
            icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            onClick={() => isMobile ? setMobileMenuOpen(true) : setCollapsed(!collapsed)}
          />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <UserMenuContainer>
              <Avatar icon={<UserOutlined />} />
              {(!collapsed || isMobile) && <UserEmail>{user?.email}</UserEmail>}
            </UserMenuContainer>
          </Dropdown>
        </AppHeader>
        <AppContent $collapsed={collapsed} $isMobile={isMobile}>
          <Outlet />
        </AppContent>
      </AppLayout>
    </AppLayout>
  );
};

export default Layout;
