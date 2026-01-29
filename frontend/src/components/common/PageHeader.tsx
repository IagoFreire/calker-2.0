import styled from 'styled-components';

export const PageHeaderContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PageTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 700;
  margin-top: 0;
`;

export const PageSubtitle = styled.p`
  font-size: clamp(14px, 3vw, 16px);
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
`;
