import styled from 'styled-components';
import { Button as AntButton } from 'antd';
import { theme as defaultTheme } from '../../styles/theme';

export const Button = styled(AntButton)`
  height: 48px;
  border-radius: ${({ theme }) => theme?.borderRadius?.md || defaultTheme.borderRadius.md};
  font-size: 16px;
  font-weight: 600;
  background: ${({ theme }) => theme?.colors?.gradients?.ocean || defaultTheme.colors.gradients.ocean};
  border: none;
  box-shadow: 0 4px 15px rgba(0, 105, 148, 0.3);
  transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  
  .ant-btn-icon {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }
  
  span {
    display: inline-flex;
    align-items: center;
    line-height: 1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 105, 148, 0.4);
    background: ${({ theme }) => theme?.colors?.gradients?.oceanLight || defaultTheme.colors.gradients.oceanLight};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.ant-btn-loading {
    opacity: 0.8;
  }
  
  @media (max-width: 480px) {
    height: 44px;
    font-size: 15px;
  }
`;

// Mantido para compatibilidade, mas agora usa o Button acima
export const StyledButton = Button;
