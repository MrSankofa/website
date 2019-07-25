import * as React from "react";
import {
  useEffect,
  useState,
  useRef,
  FunctionComponent,
  CSSProperties,
  KeyboardEvent
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { API_ROOT, Colors } from "../constants";
import { Modal, ModalProps, FormError } from "./";
import { Typography, Input, Button } from "../styles";

export const EmailSignupModal: FunctionComponent<ModalProps> = props => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const button = useRef(null);
  const [nameInputFocused, setNameInputFocused] = useState(false);
  const [emailInputFocused, setEmailInputFocused] = useState(false);
  const [buttonFocused, setButtonFocused] = useState(false);
  const [buttonColor, setButtonColor] = useState(Colors.blue);
  const [subscribed, setSubscribed] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const keydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const submit = async () => {
    try {
      validate();
      if (inputValid && nameInput.current.value && emailInput.current.value) {
        setButtonColor(Colors.blue3);
        await axios.post(`${API_ROOT}/signup`, {
          name: nameInput.current.value,
          email: emailInput.current.value
        });
        setButtonColor(Colors.blue);
        setSubscribed(true);
      }
    } catch (err) {
      setFormErrorMessage("Sorry, an error occurred.");
      setInputValid(false);
    }
  };

  const validate = () => {
    const nameValid = !!nameInput.current.value.length;
    const emailValid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      emailInput.current.value
    );
    if (nameValid && emailValid) {
      setInputValid(true);
    } else {
      if (!emailValid)
        setFormErrorMessage("Please enter a valid email address.");
      if (!nameValid) setFormErrorMessage("Please enter a name.");
      setInputValid(false);
    }
  };

  useEffect(validate, [nameInputFocused, emailInputFocused]);

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
        src={"/assets/images/pattern-curves.svg"}
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
        {subscribed ? "Thanks much!" : "See u soon"}
      </h2>

      {subscribed ? (
        <p
          style={{
            flex: 1,
            maxHeight: 56,
            padding: "8px 40px 12px 40px",
            ...Typography[props.query].label,
            color: Colors.black
          }}
        >
          You're now part of the One Sunday family. Stay tuned!
        </p>
      ) : (
        <p
          style={{
            flex: 1,
            maxHeight: 56,
            padding: "8px 40px 12px 40px",
            ...Typography[props.query].label,
            color: Colors.black
          }}
        >
          Sign up for our newsletter for monthly style, tips, & the latest.
          We're{" "}
          <Link
            to="/opening"
            style={{ color: Colors.blue, textDecoration: "none" }}
          >
            opening our doors
          </Link>{" "}
          on July 28th, join us. ✨
        </p>
      )}
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
            padding: "0 16px",
            width: "calc(100% - 120px)",
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
            padding: "0 16px",
            width: "calc(100% - 120px)",
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
      {!inputValid && !nameInputFocused && !emailInputFocused && (
        <FormError query={props.query} message={formErrorMessage} />
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
