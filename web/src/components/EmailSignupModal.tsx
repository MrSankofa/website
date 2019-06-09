import * as React from "react";
import {
  useEffect,
  useState,
  useRef,
  FunctionComponent,
  CSSProperties,
  KeyboardEvent,
  MouseEvent
} from "react";
import axios from "axios";

import { API_ROOT, DeviceSizes, Colors } from "../constants";
import { Modal, ModalProps } from "./Modal";
import Typography from "../styles/Typography";
import * as Input from "../styles/Input";
import * as Button from "../styles/Button";

const EmailSignupModal: FunctionComponent<ModalProps> = props => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const button = useRef(null);
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [emailInputFocused, setEmailInputFocused] = useState(false);
  const [buttonFocused, setButtonFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState(Colors.blue);
  const [subscribed, setSubscribed] = useState(false);

  const keydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = () => {
    if (nameInput.current.value && emailInput.current.value) {
      setButtonColor(Colors.blue3);
      axios
        .post(`${API_ROOT}/signup`, {
          name: nameInput.current.value,
          email: emailInput.current.value
        })
        .then(() => {
          setButtonColor(Colors.blue);
          setSubscribed(true);
        });
    }
  };

  useEffect(() => {
    if (nameInput.current) {
      if (nameInputFocused) {
        nameInput.current.focus();
        setEmailInputFocused(false);
        setButtonFocused(false);
      } else {
        nameInput.current.blur();
      }
    }
  }, [nameInputFocused]);

  useEffect(() => {
    if (emailInput.current) {
      if (emailInputFocused) {
        emailInput.current.focus();
        setNameInputFocused(false);
        setButtonFocused(false);
      } else {
        emailInput.current.blur();
      }
    }
  }, [emailInputFocused]);

  useEffect(() => {
    if (button.current) {
      if (buttonFocused) {
        button.current.focus();
        setButtonColor(Colors.blue2);
        setNameInputFocused(false);
        setEmailInputFocused(false);
      } else {
        button.current.blur();
        setButtonColor(Colors.blue);
      }
    }
  }, [buttonFocused]);

  return (
    <Modal
      query={props.query}
      overlayColor={props.overlayColor}
      onClickClose={props.onClickClose}
      showBackButton={subscribed}
      visible={props.visible}
    >
      <img
        style={{ flex: 1, marginTop: 24, maxHeight: 41 }}
        src={"/assets/images/storefront.svg"}
      />
      <h2
        style={
          {
            flex: 1,
            maxHeight: 14,
            ...Typography[props.query].h2,
            color: Colors.black
          } as CSSProperties
        }
      >
        {subscribed ? "Thanks much!" : "We're Opening Soon!"}
      </h2>
      <p
        style={{
          flex: 1,
          maxHeight: 56,
          padding: "8px 40px 0 40px",
          ...Typography[props.query].label,
          color: Colors.black
        }}
      >
        {subscribed
          ? "You're now part of the One Sunday family. Stay tuned!"
          : "Sign up to be the first to hear about our launch event & get exclusive deals."}
      </p>
      {!subscribed && (
        <label
          htmlFor={"name"}
          style={{
            flex: 1,
            alignSelf: "flex-start",
            padding: "8px 40px",
            maxHeight: 24,
            ...Typography[props.query].label,
            fontWeight: 800
          }}
        >
          Name
        </label>
      )}
      {!subscribed && (
        <input
          type="text"
          name="name"
          autoFocus
          ref={nameInput}
          onKeyDown={keydown}
          onFocus={() => setNameInputFocused(true)}
          placeholder={"Name"}
          style={{
            flex: 1,
            padding: "0 40px",
            width: "calc(100% - 160px)",
            marginTop: 8,
            marginBottom: 16,
            border: `1px solid ${
              nameInputFocused ? Colors.blue : Colors.gray2
            }`,
            ...Typography[props.query].label,
            ...Input[props.query]
          }}
        />
      )}
      {!subscribed && (
        <label
          htmlFor={"email"}
          style={{
            flex: 1,
            alignSelf: "flex-start",
            padding: "8px 40px",
            maxHeight: 24,
            ...Typography[props.query].label,
            fontWeight: 800
          }}
        >
          Email
        </label>
      )}
      {!subscribed && (
        <input
          type="email"
          name="email"
          ref={emailInput}
          onKeyDown={keydown}
          onFocus={() => setEmailInputFocused(true)}
          placeholder={"Email"}
          style={{
            flex: 1,
            padding: "0 40px",
            width: "calc(100% - 160px)",
            marginTop: 8,
            marginBottom: 16,
            border: `1px solid ${
              emailInputFocused ? Colors.blue : Colors.gray2
            }`,
            ...Typography[props.query].label,
            ...Input[props.query]
          }}
        />
      )}
      {!subscribed && (
        <button
          type="submit"
          onClick={submit}
          ref={button}
          onFocus={() => setButtonFocused(true)}
          style={
            {
              flex: 2,
              padding: "0 40px",
              width: "calc(100% - 80px)",
              marginBottom: 48,
              marginTop: 8,
              ...Typography[props.query].button,
              ...Button[props.query],
              backgroundColor: buttonColor,
              color: Colors.offWhite
            } as CSSProperties
          }
        >
          Sign Up
        </button>
      )}
    </Modal>
  );
};

export default EmailSignupModal;
