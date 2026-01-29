import styled, { keyframes } from 'styled-components';
import { Card, Input, Button } from 'antd';

const { Password } = Input;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const logoFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const logoPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }
`;

const iconFadeIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-10deg);
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
  }
`;

const titleFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const descriptionFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 0.95;
    transform: translateY(0);
  }
`;

const circleFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const circleFloat = keyframes`
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -25px) scale(1.05);
  }
  50% {
    transform: translate(-15px, 15px) scale(0.98);
  }
  75% {
    transform: translate(25px, 10px) scale(1.02);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const LoginContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutrals.bgLight};
  
  @media (max-width: 480px) {
    background: ${({ theme }) => theme.colors.gradients.ocean};
    background-size: 200% 200%;
    animation: ${gradientShift} 15s ease infinite;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background: ${({ theme }) => theme.colors.gradients.ocean};
      background-size: 200% 200%;
      animation: ${gradientShift} 15s ease infinite;
    }
  }
`;

export const LoginWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  
  @media (max-width: 480px) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.colors.gradients.ocean};
  background-size: 200% 200%;
  animation: ${gradientShift} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    min-height: 300px;
    padding: 40px 20px;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

export const ImageContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 500px;
`;

export const ImageLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${logoFadeIn} 0.8s ease-out 0.2s both, ${logoPulse} 4s ease-in-out 1s infinite;
  
  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }
`;

export const ImageLogoIcon = styled.div`
  font-size: 50px;
  color: white;
  animation: ${iconFadeIn} 0.6s ease-out 0.4s both;
  
  @media (max-width: 1024px) {
    font-size: 40px;
  }
`;

export const ImageTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 16px 0;
  letter-spacing: -1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${titleFadeIn} 0.8s ease-out 0.4s both;
  
  @media (max-width: 1024px) {
    font-size: 32px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const ImageDescription = styled.p`
  font-size: 18px;
  margin: 0;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 300;
  animation: ${descriptionFadeIn} 0.8s ease-out 0.6s both;
  
  @media (max-width: 1024px) {
    font-size: 16px;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ImageDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

export const DecorationCircle = styled.div<{ $size: number; $top?: string; $bottom?: string; $left?: string; $right?: string; $delay?: string }>`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  opacity: 0;
  animation: ${circleFadeIn} 1s ease-out both, ${circleFloat} 25s infinite ease-in-out;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  top: ${({ $top }) => $top || 'auto'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  left: ${({ $left }) => $left || 'auto'};
  right: ${({ $right }) => $right || 'auto'};
  animation-delay: ${({ $delay }) => $delay || '0s'}, 1.5s;
  
  @media (max-width: 480px) {
    opacity: 1;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: ${({ theme }) => theme.colors.neutrals.bgLight};
  position: relative;
  
  .mobile-decoration {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    align-items: center;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex: 1;
    padding: 24px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: transparent;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background: ${({ theme }) => theme.colors.gradients.ocean};
      background-size: 200% 200%;
      animation: ${gradientShift} 15s ease infinite;
    }
    
    .mobile-decoration {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      overflow: hidden;
      display: block;
      
      ${DecorationCircle} {
        opacity: 1;
      }
    }
  }
`;

export const LoginContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  padding: 20px;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    padding: 0;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
    z-index: 2;
  }
`;

export const LoginCard = styled(Card)`
  width: 100%;
  max-width: 440px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.colors.shadows.lg};
  background: ${({ theme }) => theme.colors.neutrals.white};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.colors.shadows.xl};
  }
  
  .ant-card-body {
    padding: 32px;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 auto;
    
    .ant-card-body {
      padding: 24px;
    }
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
    
    .ant-card-body {
      padding: 28px;
    }
  }
`;

export const MobileWelcomeContent = styled.div`
  display: none;
  
  @media (max-width: 480px) {
    display: block;
    text-align: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals.bgSoft};
  }
`;

export const MobileLogo = styled(ImageLogo)`
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    margin: 0 auto 20px;
    background: rgba(0, 105, 148, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 105, 148, 0.2);
    animation: none;
    
    ${ImageLogoIcon} {
      font-size: 35px;
      color: ${({ theme }) => theme.colors.ocean.primary};
      animation: none;
    }
  }
`;

export const MobileTitle = styled(ImageTitle)`
  @media (max-width: 480px) {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: 8px;
    text-shadow: none;
    animation: none;
  }
`;

export const MobileDescription = styled(ImageDescription)`
  @media (max-width: 480px) {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text.muted};
    opacity: 1;
    margin: 0;
    animation: none;
  }
`;

export const LoginHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

export const LoginTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

export const LoginSubtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin: 0;
  font-weight: 400;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const LoginFormWrapper = styled.div`
  margin-top: 8px;
  
  .ant-form-item {
    margin-bottom: 20px;
  }
`;

const inputBorderColor = '#e5f4f8';
const inputHoverBorderColor = '#0088a3';
const inputFocusBorderColor = '#006994';

export const LoginInput = styled(Input)`
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 15px;
  border: 2px solid ${inputBorderColor};
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  overflow: hidden;
  
  .ant-input {
    height: 48px;
    padding: 0 16px;
    font-size: 15px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    line-height: 48px;
    display: flex;
    align-items: center;
    background-color: transparent !important;
    box-shadow: none !important;
    
    &::placeholder {
      line-height: normal;
      display: flex;
      align-items: center;
    }
    
    /* Prevenir estilos de autocomplete do navegador */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text.primary} !important;
      box-shadow: 0 0 0 30px white inset !important;
      transition: background-color 5000s ease-in-out 0s;
      border-radius: ${({ theme }) => theme.borderRadius.md};
    }
  }
  
  .ant-input-prefix {
    display: flex;
    align-items: center;
    margin-right: 8px;
    height: 100%;
  }
  
  &:hover {
    border-color: ${inputHoverBorderColor};
  }
  
  &:focus,
  &.ant-input-focused,
  &.ant-input-affix-wrapper-focused {
    border-color: ${inputFocusBorderColor};
    box-shadow: 0 0 0 3px rgba(0, 105, 148, 0.1);
  }
  
  @media (max-width: 480px) {
    height: 44px;
    
    .ant-input {
      height: 44px;
      font-size: 16px;
      padding: 0 14px;
      line-height: 44px;
      
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
        box-shadow: 0 0 0 30px white inset !important;
      }
    }
  }
`;

export const LoginPasswordInput = styled(Password)`
  height: 48px;
  display: flex;
  align-items: center;
  border: 2px solid ${inputBorderColor};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
  overflow: hidden;
  
  .ant-input {
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: 0 16px;
    font-size: 15px;
    border: none;
    line-height: 48px;
    display: flex;
    align-items: center;
    background-color: transparent !important;
    box-shadow: none !important;
    
    &::placeholder {
      line-height: normal;
      display: flex;
      align-items: center;
    }
    
    /* Prevenir estilos de autocomplete do navegador */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text.primary} !important;
      box-shadow: 0 0 0 30px white inset !important;
      transition: background-color 5000s ease-in-out 0s;
      border-radius: ${({ theme }) => theme.borderRadius.md};
    }
  }
  
  .ant-input-prefix {
    display: flex;
    align-items: center;
    margin-right: 8px;
    height: 100%;
  }
  
  .ant-input-suffix {
    display: flex;
    align-items: center;
    height: 100%;
  }
  
  .ant-input-password-icon {
    color: ${({ theme }) => theme.colors.text.light};
    margin-left: 8px;
    display: flex;
    align-items: center;
    
    &:hover {
      color: ${({ theme }) => theme.colors.ocean.primary};
    }
  }
  
  &:hover {
    border-color: ${inputHoverBorderColor};
  }
  
  &.ant-input-affix-wrapper-focused {
    border-color: ${inputFocusBorderColor};
    box-shadow: 0 0 0 3px rgba(0, 105, 148, 0.1);
  }
  
  @media (max-width: 480px) {
    height: 44px;
    
    .ant-input {
      height: 44px;
      font-size: 16px;
      padding: 0 14px;
      line-height: 44px;
      
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
        box-shadow: 0 0 0 30px white inset !important;
      }
    }
  }
`;

export const InputIcon = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 16px;
`;

export const LoginButtonItem = styled.div`
  margin-top: 24px;
  margin-bottom: 0 !important;
  
  .ant-form-item-control {
    margin-bottom: 0 !important;
  }
  
  .ant-row {
    margin-bottom: 0 !important;
  }
`;

export const LoginButton = styled(Button)`
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 16px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.gradients.ocean};
  border: none;
  box-shadow: 0 4px 15px rgba(0, 105, 148, 0.3);
  transition: ${({ theme }) => theme.transitions.default};
  margin-bottom: 0 !important;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 105, 148, 0.4);
    background: ${({ theme }) => theme.colors.gradients.oceanLight};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.ant-btn-loading {
    opacity: 0.8;
  }
  
  @media (max-width: 480px) {
    height: 44px;
    font-size: 15px;
  }
`;
