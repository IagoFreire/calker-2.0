import { Input as AntInput, Select as AntSelect, DatePicker as AntDatePicker } from 'antd';
import styled from 'styled-components';
import { theme as defaultTheme } from '../../styles/theme';

const { TextArea: AntTextArea } = AntInput;
const { Option: AntSelectOption } = AntSelect;

// Exportar Option para uso com FormSelect
export const FormSelectOption = AntSelectOption;

export const FormInput = styled(AntInput)`
  height: 48px;
  border-radius: ${({ theme }) => theme?.borderRadius?.md || defaultTheme.borderRadius.md};
  font-size: 16px;
  font-weight: 400;
  border: 2px solid ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft};
  transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default};
  
  &:hover {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primaryLight || defaultTheme.colors.ocean.primaryLight};
  }
  
  &:focus,
  &.ant-input-focused {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => 
      theme?.colors?.ocean?.primary ? `rgba(0, 105, 148, 0.1)` : 'rgba(0, 105, 148, 0.1)'
    };
  }
  
  &::placeholder {
    color: ${({ theme }) => theme?.colors?.text?.light || defaultTheme.colors.text.light};
  }
  
  &.ant-input-status-error {
    border-color: #ef5350;
    
    &:focus,
    &.ant-input-focused {
      box-shadow: 0 0 0 3px rgba(239, 83, 80, 0.1);
    }
  }
  
  @media (max-width: 480px) {
    height: 44px;
    font-size: 15px;
  }
`;

export const FormTextArea = styled(AntTextArea)`
  border-radius: ${({ theme }) => theme?.borderRadius?.md || defaultTheme.borderRadius.md};
  font-size: 16px;
  font-weight: 400;
  border: 2px solid ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft};
  transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default};
  min-height: 100px;
  
  &:hover {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primaryLight || defaultTheme.colors.ocean.primaryLight};
  }
  
  &:focus,
  &.ant-input-focused {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => 
      theme?.colors?.ocean?.primary ? `rgba(0, 105, 148, 0.1)` : 'rgba(0, 105, 148, 0.1)'
    };
  }
  
  &::placeholder {
    color: ${({ theme }) => theme?.colors?.text?.light || defaultTheme.colors.text.light};
  }
  
  &.ant-input-status-error {
    border-color: #ef5350;
    
    &:focus,
    &.ant-input-focused {
      box-shadow: 0 0 0 3px rgba(239, 83, 80, 0.1);
    }
  }
`;

export const FormSelect = styled(AntSelect)`
  width: 100%;
  height: 48px !important;
  
  .ant-select-selector {
    height: 48px !important;
    min-height: 48px !important;
    border-radius: ${({ theme }) => theme?.borderRadius?.md || defaultTheme.borderRadius.md} !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    border: 2px solid ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft} !important;
    transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default} !important;
    padding: 0 11px !important;
    display: flex !important;
    align-items: center !important;
    
    .ant-select-selection-wrap {
      display: flex !important;
      align-items: center !important;
      height: 100% !important;
      min-height: 48px !important;
    }
    
    .ant-select-selection-item {
      line-height: 48px !important;
      display: flex !important;
      align-items: center !important;
      height: 48px !important;
      padding: 0 !important;
    }
    
    .ant-select-selection-placeholder {
      line-height: 48px !important;
      color: ${({ theme }) => theme?.colors?.text?.light || defaultTheme.colors.text.light} !important;
      display: flex !important;
      align-items: center !important;
      height: 48px !important;
      padding: 0 !important;
    }
    
    .ant-select-selection-search {
      display: flex !important;
      align-items: center !important;
      height: 48px !important;
      line-height: 48px !important;
      
      .ant-select-selection-search-input {
        display: flex !important;
        align-items: center !important;
        height: 48px !important;
        line-height: 48px !important;
      }
    }
  }
  
  .ant-select-arrow {
    right: 11px !important;
    top: 50% !important;
    margin-top: 0 !important;
    transform: translateY(-50%) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 14px !important;
    width: 14px !important;
    line-height: 1 !important;
    
    .anticon {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      line-height: 1 !important;
      
      svg {
        display: block !important;
        vertical-align: middle !important;
      }
    }
  }
  
  
  @media (max-width: 480px) {
    height: 44px !important;
    
    .ant-select-selector {
      height: 44px !important;
      min-height: 44px !important;
      
      .ant-select-selection-wrap {
        min-height: 44px !important;
      }
      
      .ant-select-selection-item {
        line-height: 44px !important;
        height: 44px !important;
      }
      
      .ant-select-selection-placeholder {
        line-height: 44px !important;
        height: 44px !important;
      }
      
      .ant-select-selection-search {
        height: 44px !important;
        line-height: 44px !important;
        
        .ant-select-selection-search-input {
          height: 44px !important;
          line-height: 44px !important;
        }
      }
    }
  }
  
  &:hover .ant-select-selector {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primaryLight || defaultTheme.colors.ocean.primaryLight} !important;
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary} !important;
    box-shadow: 0 0 0 3px rgba(0, 105, 148, 0.1) !important;
  }
  
  &.ant-select-status-error .ant-select-selector {
    border-color: #ef5350 !important;
    
    &.ant-select-focused {
      box-shadow: 0 0 0 3px rgba(239, 83, 80, 0.1) !important;
    }
  }
  
  @media (max-width: 480px) {
    .ant-select-selector {
      height: 44px !important;
      font-size: 15px !important;
      
      .ant-select-selection-item {
        line-height: 42px !important;
      }
      
      .ant-select-selection-placeholder {
        line-height: 42px !important;
      }
    }
  }
`;

export const FormDatePicker = styled(AntDatePicker)`
  width: 100%;
  
  .ant-picker {
    height: 48px !important;
    border-radius: ${({ theme }) => theme?.borderRadius?.md || defaultTheme.borderRadius.md} !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    border: 2px solid ${({ theme }) => theme?.colors?.neutrals?.bgSoft || defaultTheme.colors.neutrals.bgSoft} !important;
    border-color: ${({ theme }) => theme?.colors?.neutrals?.bgSoft || '#e5f4f8'} !important;
    transition: ${({ theme }) => theme?.transitions?.default || defaultTheme.transitions.default} !important;
    padding: 0 16px !important;
    
    .ant-picker-input {
      > input {
        font-size: 16px;
        height: auto;
        line-height: 1.5715;
        padding: 0;
      }
    }
    
    .ant-picker-suffix {
      margin-left: 8px;
    }
  }
  
  &:hover .ant-picker {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primaryLight || defaultTheme.colors.ocean.primaryLight} !important;
  }
  
  &.ant-picker-focused .ant-picker,
  .ant-picker-focused {
    border-color: ${({ theme }) => theme?.colors?.ocean?.primary || defaultTheme.colors.ocean.primary} !important;
    box-shadow: 0 0 0 3px rgba(0, 105, 148, 0.1) !important;
  }
  
  &.ant-picker-status-error .ant-picker {
    border-color: #ef5350 !important;
  }
  
  &.ant-picker-status-error.ant-picker-focused .ant-picker,
  &.ant-picker-status-error .ant-picker-focused {
    border-color: #ef5350 !important;
    box-shadow: 0 0 0 3px rgba(239, 83, 80, 0.1) !important;
  }
  
  @media (max-width: 480px) {
    .ant-picker {
      height: 44px;
      font-size: 15px;
      padding: 0 14px;
      
      .ant-picker-input > input {
        font-size: 15px;
      }
    }
  }
`;
