import styled from 'styled-components';

export const StyledCard = styled.div<{ hoverable?: boolean; padding?: string }>`
  background: ${({ theme }) => theme.colors.neutrals.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  box-shadow: ${({ theme }) => theme.colors.shadows.sm};
  padding: ${({ padding = '24px' }) => padding};
  transition: ${({ theme }) => theme.transitions.default};
  
  ${({ hoverable }) =>
    hoverable &&
    `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }: { theme: any }) => theme.colors.shadows.md};
    }
  `}
`;
