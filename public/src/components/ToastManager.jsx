import React, {
  useState, useRef, useContext, useCallback, useMemo,
} from 'react';
// import * as React from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faExclamationTriangle, faTimes,
} from '@fortawesome/free-solid-svg-icons';

const getCSSForFlavor = (flavor) => {
  const flavors = {
    success: css`
      background-color: #386C0B;
    `,
    error: css`
      background-color: #EF6F6C;
    `,
  };
  return flavors[flavor];
};

export const ToastContext = React.createContext();
const ToastRack = styled.div`
  z-index: 1;
  position: fixed;
  right: 0;
  ${({ theme }) => css`
    width: ${theme.toast.width};
  `}
  bottom: 0;
  padding: 1em;
`;

const StyledToastBanner = styled.div`
  margin-left: -1px;
  border-radius: .25em 0 0 .25em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  & path {
    fill: white;
  }
  padding: .25em .5em;
  ${(props) => getCSSForFlavor(props.flavor)}
`;
const StyledToastContent = styled.div`
  padding: .5em 1em;
  flex: 1;
`;
const StyledToastCancel = styled.div`
  display: flex;
  padding: .25em .5em;
  & path {
    fill: #54457F;
  }
  align-items: center;
`;
const StyledToast = styled.div`
  @keyframes styledtoast {
    0% {
      transform: translateY(20px)
    }
    100% {
      transform: translateY(0px)
    }
  }
  @keyframes cancelled {
    0% {
      transform: translateX(0px);
    }
    90% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(300px);
    }
  }
    @keyframes immediatecancel {
    0% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(300px);
    }
  }
  display: flex;
  border: 1px solid #54457F;
  width: 100%;
  cursor: pointer;
  animation: styledtoast .3s ease-out, cancelled 4.5s ease-out .3s;
  animation-fill-mode: forwards;  
  border-radius: .25em;
  background-color: white;
  box-shadow: 0px 4px 3px 3px rgba(0,0,0, .1);
  & + & {
    margin-top: 1em;
  }
  ${({ cancel }) => css`
    ${cancel ? css`animation: immediatecancel .35s ease-out;` : ''}
  `}
`;

export const ToastAlert = ({ children, flavor, id }) => {
  const { manuallyCancel, flavors } = useContext(ToastContext);
  const internalFlavors = useMemo(() => ({
    [flavors.success]: <FontAwesomeIcon icon={faCheckCircle} />,
    [flavors.error]: <FontAwesomeIcon icon={faExclamationTriangle} />,
  }), [flavors]);
  const [cancel, setCancel] = useState(false);
  const handleClick = () => {
    setCancel(true);
    manuallyCancel(id);
  };
  return (
    <StyledToast
      ariaLive="polite"
      cancel={cancel}
      onClick={handleClick}
    >
      <StyledToastBanner flavor={flavor}>
        {internalFlavors[flavor]}
      </StyledToastBanner>
      <StyledToastContent>
        {children}
      </StyledToastContent>
      <StyledToastCancel>
        <FontAwesomeIcon icon={faTimes} />
      </StyledToastCancel>
    </StyledToast>
  );
};

ToastAlert.propTypes = {
  children: PropTypes.node.isRequired,
  flavor: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export const ToastManager = ({ children, defaultTime }) => {
  const toasts = useRef([]);
  const [availableToastId, setAvailableToastId] = useState(0);
  const [forceRerender, setForceRerender] = useState(0);

  const contextData = {
    flavors: {
      success: 'success',
      error: 'error',
    },
    toast(message, flavor, time) {
      const usedId = availableToastId;
      toasts.current = [...toasts.current, {
        message, flavor, time, id: usedId,
      }];

      setAvailableToastId(availableToastId + 1);
      setTimeout(() => {
        toasts.current.splice(0, 1);
        setForceRerender(toasts.current.length);
      }, time ?? defaultTime);
    },
    manuallyCancel(id) {
      setTimeout(
        () => {
          toasts.current = toasts.current.filter((toast) => toast.id !== id);
          setForceRerender(toasts.current.length);
        },
        300,
      );
    },
  };
  return (
    <ToastContext.Provider value={contextData}>
      {children}
      <ToastRack>
        {
          toasts.current.map((toast) => (
            <ToastAlert key={toast.id} id={toast.id} flavor={toast.flavor}>
              {toast.message}
            </ToastAlert>
          ))
        }
      </ToastRack>
    </ToastContext.Provider>
  );
};

ToastManager.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTime: PropTypes.number,
};
ToastManager.defaultProps = {
  defaultTime: 5000,
};

export default ToastManager;
