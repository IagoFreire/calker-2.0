import styled from 'styled-components';
import { Card, Collapse } from 'antd';

export const ConfiguracoesContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const StoreCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  
  .ant-card-head {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  }
  
  .ant-card-body {
    padding: 16px;
  }
`;

export const StyledCollapse = styled(Collapse)`
  background: transparent;
  border: none;
  
  .ant-collapse-item {
    border: none;
    margin-bottom: 16px;
  }
  
  .ant-collapse-header {
    background: ${({ theme }) => theme.colors.neutrals.bgSoft};
    border-radius: ${({ theme }) => theme.borderRadius.md} !important;
    padding: 16px !important;
  }
  
  .ant-collapse-content {
    border: none;
    background: transparent;
  }
  
  .ant-collapse-content-box {
    padding: 16px 0 0 0;
  }
`;

export const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StoreInfo = styled.div`
  flex: 1;
`;

export const StoreName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const StoreMeta = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const StoreActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const UsersTableContainer = styled.div`
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.neutrals.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  overflow: hidden;
  
  .ant-table {
    font-size: 14px;
    background: transparent;
    
    .ant-table-container {
      border: none;
    }
    
    .ant-table-thead > tr > th {
      background: ${({ theme }) => theme.colors.neutrals.bgSoft};
      border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text.primary};
      padding: 14px 16px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &:first-child {
        border-top-left-radius: ${({ theme }) => theme.borderRadius.lg};
        padding-left: 20px;
      }
      
      &:last-child {
        border-top-right-radius: ${({ theme }) => theme.borderRadius.lg};
        padding-right: 20px;
      }
    }
    
    .ant-table-tbody > tr {
      transition: ${({ theme }) => theme.transitions.default};
      
      &:hover {
        background: ${({ theme }) => theme.colors.neutrals.bgLight};
        transform: scale(1.001);
      }
      
      > td {
        padding: 14px 16px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
        color: ${({ theme }) => theme.colors.text.secondary};
        
        &:first-child {
          font-weight: 500;
          color: ${({ theme }) => theme.colors.text.primary};
          padding-left: 20px;
        }
        
        &:last-child {
          padding-right: 20px;
        }
      }
      
      &:last-child > td {
        border-bottom: none;
      }
    }
    
    .ant-table-tbody > tr.ant-table-row-selected > td {
      background: ${({ theme }) => theme.colors.neutrals.bgLight};
    }
    
    .ant-empty {
      margin: 40px 0;
      padding: 20px;
      
      .ant-empty-description {
        color: ${({ theme }) => theme.colors.text.muted};
        font-size: 14px;
      }
    }
    
    .ant-pagination {
      margin: 16px 20px;
      padding: 0;
    }
  }
  
  .ant-table-wrapper {
    .ant-table-pagination {
      margin: 16px 20px;
    }
  }
  
  // Estilizar botões de ação dentro da tabela
  .ant-btn-link {
    padding: 0 8px;
    height: auto;
    font-size: 14px;
    
    &:hover {
      color: ${({ theme }) => theme.colors.ocean.primary};
    }
  }
  
  // Estilizar tags
  .ant-tag {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 500;
    border: none;
  }
`;
