import styled from 'styled-components';

export const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 15px;
  border: 2px solid ${({ theme, hasError }) => (hasError ? '#ef5350' : theme.colors.neutrals.bgSoft)};
  transition: ${({ theme }) => theme.transitions.default};
  background: ${({ theme }) => theme.colors.neutrals.white};
  color: ${({ theme }) => theme.colors.text.primary};
  
  &:hover {
    border-color: ${({ theme, hasError }) => (hasError ? '#ef5350' : theme.colors.ocean.primaryLight)};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) => 
      hasError ? '#ef5350' : theme.colors.ocean.primary
    };
    box-shadow: 0 0 0 3px ${({ hasError }) => 
      hasError ? 'rgba(239, 83, 80, 0.1)' : 'rgba(0, 105, 148, 0.1)'
    };
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.text.light};
    font-size: 16px;
    pointer-events: none;
  }
  
  ${StyledInput} {
    padding-left: 44px;
  }
`;
