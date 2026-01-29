import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(24px, 6vw, 48px);
  min-height: clamp(300px, 50vh, 400px);
`;

export const EmptyStateIcon = styled.div`
  padding: clamp(16px, 4vw, 24px);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.neutrals.bgSoft};
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyStateTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 600;
  margin-top: 0;
`;

export const EmptyStateDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: 20px;
  font-size: clamp(13px, 3vw, 14px);
  margin-top: 0;
`;
