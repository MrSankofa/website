import * as React from "react";
import {
  useRef,
  useEffect,
  useState,
  FunctionComponent,
  CSSProperties
} from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from "body-scroll-lock";
import { useSpring, animated } from "react-spring";

import { Typography, ModalOverlay, ModalBody, Button } from "../styles";
import { DeviceSizes, Colors } from "../constants";

export type ModalProps = {
  query: DeviceSizes;
  overlayColor: string;
  onClickClose?: () => any;
  visible: boolean;
  showBackButton?: boolean;
};

export const Modal: FunctionComponent<ModalProps> = ({
  query,
  children,
  overlayColor,
  onClickClose,
  visible = false,
  showBackButton = false
}) => {
  const button = useRef(null);
  const [isVisible, setIsVisible] = useState(visible);
  const [zIndex, setZIndex] = useState(-1);
  const [buttonFocused, setButtonFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState(Colors.blue);
  const modal = document.querySelector("#modal");

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (isVisible) {
      setZIndex(2);
      disableBodyScroll(modal);
    } else {
      setTimeout(() => setZIndex(-1), 300);
    }
    return clearAllBodyScrollLocks();
  }, [isVisible]);

  useEffect(() => {
    if (button.current) {
      if (buttonFocused) {
        button.current.focus();
        setButtonColor(Colors.blue2);
      } else {
        button.current.blur();
        setButtonColor(Colors.blue);
      }
    }
  }, [buttonFocused]);

  const fade = useSpring({ opacity: isVisible ? 1 : 0 });

  const clickClose = () => {
    setIsVisible(false);
    if (onClickClose) onClickClose();
    enableBodyScroll(modal);
  };

  return (
    <animated.div
      id="modal"
      style={
        {
          ...ModalOverlay[query],
          ...fade,
          zIndex
        } as CSSProperties
      }
    >
      <div
        onClick={clickClose}
        style={
          {
            ...ModalOverlay[query],
            backgroundColor: overlayColor
          } as CSSProperties
        }
      />
      <div
        style={
          {
            ...ModalBody[query],
            backgroundColor: Colors.offWhite
          } as CSSProperties
        }
      >
        <div
          onClick={clickClose}
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 16,
            right: 16,
            width: 32,
            height: 32
          }}
        >
          <img src={"/assets/images/close.svg"} />
        </div>
        {children}
        {showBackButton && (
          <button
            type="submit"
            onClick={() => setIsVisible(false)}
            ref={button}
            onFocus={() => setButtonFocused(true)}
            style={
              {
                flex: 2,
                padding: "0 40px",
                width: "calc(100% - 80px)",
                marginBottom: 48,
                marginTop: 8,
                ...Typography[query].button,
                ...Button[query],
                backgroundColor: buttonColor,
                color: Colors.offWhite
              } as CSSProperties
            }
          >
            Back to Home
          </button>
        )}
      </div>
    </animated.div>
  );
};
