import React from 'react';
import { PropTypes } from 'prop-types';
import { css, keyframes, ThemeProvider } from 'styled-components';

export const theme = {
  flavors: {
    primary: '#586994',
    primaryHover: '#2e3c61',
    secondary: 'palevioletred',
    secondaryHover: 'rgba(219, 112, 147, 0.7)',
    background: 'white',
    success: '#386C0B',
    error: '#EF6F6C',
    toastBlue: '#54457F',
  },
  borderRadius: '.25em',
  button: {
    transitionTiming: '.2s',
    defaultStyling: css`
      height: 40px;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      text-align: center;
      font-weight: bold;
      padding: .25em 1em;
      position: relative;
      border-width: 2px;
      border-style: solid;
    `,
  },
  toast: {
    width: '250px',
  },
  text: {
    contentText: css`
      font-size: 1em;
    `,
    titleText: css`
      font-size: 24px;
      font-weight: bold;
    `,
    emphasizedText: css`
      font-size: 18px;
      font-weight: bold;
    `,
  },
  animations: {
    styledtoast: keyframes`
      0% {
        transform: translateY(20px)
      }
      100% {
        transform: translateY(0px)
      }
    `,
    cancelled: keyframes`
      0% {
        transform: translateX(0px);
      }
      90% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(300px);
      }
    `,
    immediatecancel: keyframes`
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(300px);
      }
    `,
  },
  mixins: {
    transition: (...args) => css`
        transition: ${args.map(([property, timing, transition]) => `${property} ${timing} ${transition}`).join(', ')};
    `,
    buttonBoxShadow: (color) => css`
      box-shadow: 0px 0px 2px 2px ${color};
    `,
  },
};

export const PottyThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);
PottyThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PottyThemeProvider;