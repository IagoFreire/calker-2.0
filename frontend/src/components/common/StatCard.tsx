import styled from 'styled-components';

export const StatCardContainer = styled.div<{ color?: string }>`
  background: ${({ theme }) => theme.colors.neutrals.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  padding: clamp(12px, 3vw, 16px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: auto;
`;

export const StatIconWrapper = styled.div<{ color?: string }>`
  padding: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ color, theme }) => (color ? `${color}15` : theme.colors.neutrals.bgSoft)};
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  flex-shrink: 0;
  
  svg {
    font-size: 20px;
  }
`;

export const StatValue = styled.div<{ color?: string }>`
  color: ${({ color, theme }) => color || theme.colors.ocean.primary};
  font-size: clamp(18px, 4vw, 24px);
  font-weight: 700;
  margin-bottom: 2px;
`;

export const StatTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: clamp(12px, 3vw, 14px);
`;
