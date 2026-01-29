import styled from 'styled-components';
import { Card } from 'antd';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const FeatureCard = styled(Card)`
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadows.md};
  }
  
  .ant-card-body {
    padding: clamp(16px, 4vw, 24px);
    text-align: center;
  }
`;

export const FeatureIcon = styled.div`
  margin-bottom: 12px;
  
  svg {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.ocean.primary};
  }
`;

export const FeatureTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 600;
  margin-top: 0;
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
  font-size: clamp(13px, 3vw, 14px);
`;
