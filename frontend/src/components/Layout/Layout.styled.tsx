import styled from 'styled-components';
import { Layout as AntLayout, Menu, Button, Drawer } from 'antd';
import { theme as defaultTheme } from '../../styles/theme';

const { Header, Sider, Content } = AntLayout;

// Helper para garantir acesso ao tema (mantido para uso futuro se necessário)
// const getThemeValue = (theme: any, path: string, fallback: string) => {
//   if (!theme) return fallback;
//   const keys = path.split('.');
//   let value = theme;
//   for (const key of keys) {
//     value = value?.[key];
//     if (value === undefined) return fallback;
//   }
//   return value || fallback;
// };

export const AppLayout = styled(AntLayout)`
  min-height: 100vh;
  background: ${({ theme }) => theme?.colors?.neutrals?.bgLight || defaultTheme.colors.neutrals.bgLight};
`;

export const Sidebar = styled(Sider)<{ $isMobile?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary} !important;
  display: flex;
  flex-direction: column;
  
  ${({ $isMobile }) =>
    $isMobile &&
    `
    display: none !important;
  `}
  
  @media (max-width: 768px) {
    display: none !important;
  }
  
  &.ant-layout-sider-collapsed {
    .ant-menu-item {
      padding-left: 0 !important;
      padding-right: 0 !important;
      text-align: center !important;
      
      &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.15) !important;
      }
      
      .ant-menu-item-icon {
        margin-right: 0 !important;
        margin-left: 0 !important;
        font-size: 22px !important;
      }
      
      .ant-menu-title-content {
        display: none !important;
      }
    }
  }
`;

export const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const SidebarTop = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SidebarBottom = styled.div`
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 8px;
  padding-bottom: 8px;
  
  .ant-menu {
    padding: 0 !important;
  }
  
  .ant-menu-item {
    margin-bottom: 0 !important;
  }
`;

export const Logo = styled.div<{ $collapsed?: boolean }>`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};
  color: white;
  font-size: 22px;
  font-weight: 700;
  background: transparent;
  margin: 16px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme?.borderRadius?.md || defaultTheme.borderRadius.md};
  border: none;
  transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default};
  
  &:hover {
    transform: scale(1.02);
  }
  
  ${({ $collapsed }) =>
    $collapsed &&
    `
    width: 48px;
    height: 48px;
    margin: 16px auto;
    border-radius: 12px;
    font-size: 20px;
    padding: 0;
    justify-content: center;
  `}
  
  @media (max-width: 768px) {
    margin: 12px 16px !important;
    height: 56px !important;
    font-size: 20px !important;
    width: auto !important;
    max-width: calc(100% - 80px) !important;
    padding: 0 16px !important;
    justify-content: flex-start !important;
  }
`;

export const StyledMenu = styled(Menu)`
  background: ${({ theme }) => 
    theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary
  } !important;
  border-right: none !important;
  padding: 8px 0 !important;
  width: 100% !important;
  box-sizing: border-box !important;
  
  .ant-menu-inner {
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .ant-menu-ul {
    width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .ant-menu-item {
    height: 56px;
    line-height: 56px;
    font-size: 15px;
    padding-left: 20px !important;
    padding-right: 20px !important;
    margin: 0 8px 8px 8px !important;
    border-radius: ${({ theme }) => 
      theme?.borderRadius?.md || defaultTheme.borderRadius.md
    } !important;
    transition: ${({ theme }) => 
      theme?.transitions?.cubic || defaultTheme.transitions.cubic
    } !important;
    font-weight: 500 !important;
    letter-spacing: 0.3px !important;
    color: rgba(255, 255, 255, 0.85) !important;
    position: relative;
    overflow: hidden;
    box-sizing: border-box !important;
    width: calc(100% - 16px) !important;
    max-width: calc(100% - 16px) !important;
    
    &:hover {
      background: rgba(255, 255, 255, 0.12) !important;
      color: rgba(255, 255, 255, 1) !important;
      
      .ant-menu-item-icon {
        transform: scale(1.1);
        color: #4ecdc4;
      }
    }
    
    &.ant-menu-item-selected {
      background: rgba(255, 255, 255, 0.18) !important;
      color: rgba(255, 255, 255, 1) !important;
      font-weight: 600 !important;
      
      .ant-menu-item-icon {
        color: #4ecdc4;
        transform: scale(1.1);
      }
    }
    
    .ant-menu-item-icon {
      font-size: 20px;
      transition: ${({ theme }) => 
        theme?.transitions?.cubic || defaultTheme.transitions.cubic
      };
      margin-right: 12px !important;
    }
    
    .ant-menu-title-content {
      font-weight: inherit;
      transition: ${({ theme }) => 
        theme?.transitions?.cubic || defaultTheme.transitions.cubic
      };
    }
  }
  
  @media (max-width: 768px) {
    .ant-menu-item {
      height: 52px !important;
      line-height: 52px !important;
      font-size: 15px !important;
      padding-left: 18px !important;
      padding-right: 18px !important;
      margin: 0 8px 6px 8px !important;
      border-radius: 10px !important;
    }
    
    .ant-menu-item-icon {
      font-size: 19px !important;
      margin-right: 10px !important;
    }
  }
`;

export const AppHeader = styled(Header)<{ $collapsed?: boolean; $isMobile?: boolean }>`
  padding: 0 24px;
  background: ${({ theme }) => theme?.colors?.neutrals?.white || defaultTheme.colors.neutrals.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme?.colors?.shadows?.sm || defaultTheme.colors.shadows.sm};
  margin-left: ${({ $collapsed }) => ($collapsed ? '80px' : '280px')};
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft};
  transition: margin-left 0.2s ease;
  
  ${({ $isMobile }) =>
    $isMobile &&
    `
    margin-left: 0 !important;
    padding: 0 16px !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100% !important;
  `}
  
  @media (max-width: 768px) {
    margin-left: 0 !important;
    padding: 0 16px !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100% !important;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px !important;
  }
`;

export const TriggerButton = styled(Button)`
  font-size: 18px;
  color: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary};
  transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default};
  
  &:hover {
    color: ${({ theme }) => theme?.colors?.ocean?.primaryLight || defaultTheme.colors.ocean.primaryLight};
    transform: scale(1.1);
  }
`;

export const UserMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme?.borderRadius?.sm || defaultTheme.borderRadius.sm};
  transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default};
  min-width: 240px;
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft};
  }
  
  .ant-avatar {
    background: ${({ theme }) => theme?.colors?.gradients?.ocean || defaultTheme.colors.gradients.ocean};
    border: 2px solid ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft};
  }
  
  @media (max-width: 768px) {
    padding: 4px 8px !important;
    min-width: auto;
    
    .ant-avatar {
      width: 32px !important;
      height: 32px !important;
    }
  }
`;

export const UserEmail = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme?.colors?.text?.primary || defaultTheme.colors.text.primary};
  font-weight: 500;
  
  @media (max-width: 768px) {
    display: none !important;
  }
`;

export const AppContent = styled(Content)<{ $collapsed?: boolean; $isMobile?: boolean }>`
  margin: 0;
  margin-left: ${({ $collapsed }) => ($collapsed ? '80px' : '280px')};
  padding: 32px;
  background: ${({ theme }) => theme?.colors?.neutrals?.bgLight || defaultTheme.colors.neutrals.bgLight};
  min-height: calc(100vh - 64px);
  transition: margin-left 0.2s ease;
  width: calc(100% - ${({ $collapsed }) => ($collapsed ? '80px' : '280px')});
  box-sizing: border-box;
  
  ${({ $isMobile }) =>
    $isMobile &&
    `
    margin-left: 0 !important;
    margin-top: 64px !important;
    padding: 16px !important;
    width: 100% !important;
  `}
  
  @media (max-width: 768px) {
    margin-left: 0 !important;
    margin-top: 64px !important;
    padding: 16px !important;
    width: 100% !important;
  }
  
  @media (max-width: 480px) {
    padding: 12px !important;
  }
`;

export const MobileDrawer = styled(Drawer)`
  .ant-drawer-header {
    display: none !important;
  }
  
  .ant-drawer-body {
    padding: 0 !important;
    background: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary} !important;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .ant-drawer-close {
    position: absolute;
    top: 16px;
    right: 16px;
    color: white !important;
    font-size: 18px !important;
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    margin: 0 !important;
    line-height: 1 !important;
    z-index: 10;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
    }
  }
`;

export const DrawerTitle = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 700;
  padding: 8px 0;
`;

export const DrawerCloseIcon = styled.span`
  color: white;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  svg {
    font-size: 18px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  border: none !important;
  border-radius: 8px;
  color: white !important;
  font-size: 18px;
  cursor: pointer;
  z-index: 1001 !important;
  padding: 0;
  margin: 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    font-size: 18px;
    color: white !important;
  }
`;
