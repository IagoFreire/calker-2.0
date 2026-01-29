import styled from 'styled-components';
import { Card } from 'antd';
import { StatCardContainer, StatIconWrapper, StatValue, StatTitle } from '../../components/common/StatCard';

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const StatCard = styled(StatCardContainer)`
  /* Herda estilos do StatCard base */
`;

export const StatIcon = styled(StatIconWrapper)`
  /* Herda estilos do StatIconWrapper base */
`;

export const StatValueStyled = styled(StatValue)`
  /* Herda estilos do StatValue base */
`;

export const StatTitleStyled = styled(StatTitle)`
  /* Herda estilos do StatTitle base */
`;

export const ChartCard = styled(Card)`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  height: 100%;
  
  .ant-card-body {
    padding: 14px;
  }
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 220px;
  min-height: 220px;
  
  > div {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const ChartTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 10px;
  font-size: clamp(14px, 3.5vw, 16px);
  font-weight: 600;
  margin-top: 0;
`;

export const TableCard = styled(Card)`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  height: 100%;
  
  .ant-card-body {
    padding: 16px;
  }
  
  .ant-table {
    font-size: 13px;
  }
  
  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.colors.neutrals.bgSoft};
    font-weight: 600;
    padding: 8px;
  }
  
  .ant-table-tbody > tr > td {
    padding: 8px;
  }
`;

export const SummaryCard = styled(Card)`
  margin-top: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  
  .ant-card-body {
    padding: clamp(16px, 4vw, 24px);
  }
`;

export const SummaryTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 12px;
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 600;
  margin-top: 0;
`;

export const SummaryDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: clamp(13px, 3vw, 14px);
  margin: 0;
`;
