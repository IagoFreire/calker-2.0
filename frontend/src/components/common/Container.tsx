import styled from 'styled-components';

export const Container = styled.div<{ maxWidth?: string; padding?: string }>`
  width: 100%;
  max-width: ${({ maxWidth = '100%' }) => maxWidth};
  padding: ${({ padding = '0' }) => padding};
  margin: 0 auto;
`;

export const FlexContainer = styled.div<{ 
  direction?: 'row' | 'column';
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap = '0' }) => gap};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  flex-wrap: ${({ wrap = false }) => (wrap ? 'wrap' : 'nowrap')};
`;
