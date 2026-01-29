import styled from 'styled-components';

export const AgendaContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
`;

export const AgendaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: 16px;
`;

export const HeaderContent = styled.div`
  flex: 1 1 auto;
  min-width: 200px;
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  min-height: 0;
  max-height: 700px;
  background: ${({ theme }) => theme.colors.neutrals.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .rbc-calendar {
    height: 100%;
    flex: 1;
    min-height: 0;
    max-height: 100%;
  }
  
  .rbc-header {
    padding: 12px 8px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
    text-align: center;
    vertical-align: middle;
  }
  
  /* Estilos específicos para visualização semanal */
  .rbc-time-view {
    .rbc-header {
      border-right: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
      padding: 12px 8px;
      
      &:last-child {
        border-right: none;
      }
    }
    
    .rbc-header + .rbc-header {
      border-left: none;
    }
  }
  
  .rbc-time-header {
    border-bottom: 2px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  }
  
  .rbc-time-header-content {
    border-left: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  }
  
  .rbc-today {
    background-color: ${({ theme }) => theme.colors.neutrals.bgLighter};
  }
  
  .rbc-header.rbc-today {
    background-color: ${({ theme }) => theme.colors.neutrals.bgLighter};
    font-weight: 700;
  }
  
  .rbc-off-range-bg {
    background: ${({ theme }) => theme.colors.neutrals.bgLight};
  }
  
  .rbc-toolbar {
    margin-bottom: 16px;
    
    button {
      border-radius: ${({ theme }) => theme.borderRadius.md};
      border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
      color: ${({ theme }) => theme.colors.text.primary};
      
      &:hover {
        background: ${({ theme }) => theme.colors.neutrals.bgSoft};
        border-color: ${({ theme }) => theme.colors.ocean.primary};
      }
      
      &.rbc-active {
        background: ${({ theme }) => theme.colors.ocean.primary};
        color: white;
        border-color: ${({ theme }) => theme.colors.ocean.primary};
      }
    }
  }
  
  .rbc-event {
    border-radius: 4px;
    padding: 2px 4px;
    cursor: pointer;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  .rbc-time-slot {
    border-top: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  }
  
  .rbc-time-content {
    border-top: 2px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  }
  
  .rbc-day-slot .rbc-time-slot {
    border-top: 1px solid ${({ theme }) => theme.colors.neutrals.bgLight};
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    
    .rbc-toolbar {
      flex-direction: column;
      gap: 8px;
      
      .rbc-toolbar-label {
        order: -1;
      }
    }
  }
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px 0;
`;

export const EventTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EventTime = styled.div`
  font-size: 11px;
  opacity: 0.9;
  line-height: 1.2;
`;

export const EventClient = styled.div`
  font-size: 11px;
  opacity: 0.85;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Estilos globais para o Modal de agendamento
export const ModalStyles = `
  .ant-modal {
    max-height: 90vh;
  }
  
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow: hidden;
  }
  
  .ant-modal-body {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(90vh - 120px);
  }
  
  @media (max-width: 768px) {
    .ant-modal {
      max-height: 95vh;
    }
    
    .ant-modal-body {
      max-height: calc(95vh - 120px);
    }
  }
`;
