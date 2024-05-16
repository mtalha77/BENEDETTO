const colors = {
  background: '#1c1c1c',
  description: '#C6C6C6',
  red: '#ED1C24',
} as const;

const fontFamily = {
  Inter: {
    thin: 'Inter-Thin',
    ExtraLight: 'Inter-ExtraLight',
    light: 'Inter-Light',
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    extraBold: 'Inter-ExtraBold',
    Black: 'Inter-Black',
  },
} as const;

const ButtonOpacity = 0.8;

export const Theme = Object.freeze({
  colors,
  fontFamily,
  ButtonOpacity,
} as const);
