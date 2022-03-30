import React, { EventHandler, useState } from "react";
import logo from "./logo.svg";
import "./Registration.css";

type formData = {
  name: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
  state: string;
  message: string;
};

type formErrors = {
  name: boolean;
  email: boolean;
  mobile: boolean;
  country: boolean;
  city: boolean;
  state: boolean;
  message: boolean;
};

function Registration() {
  const [data, setData] = useState<formData>({
    name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    state: "",
    message: "",
  });

  const [errors, setErrors] = useState<formErrors>({
    name: false,
    email: false,
    mobile: false,
    country: false,
    city: false,
    state: false,
    message: false,
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const errorStyle: React.CSSProperties = {
    borderColor: "red",
    borderWidth: "5px",
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "name":
        setData({ ...data, name: e.target.value });
        e.target.name.length > 2 && setErrors({ ...errors, name: false });
        break;
      case "email":
        setData({ ...data, email: e.target.value });
        validateEmail(e.target.value)
          ? setErrors({ ...errors, email: false })
          : setErrors({ ...errors, email: true });
        break;
      case "mobile":
        // console.log(/[2-9]{2}\d{8}/.test(e.target.value), e.target.value);
        if (/^[0-9]*$/.test(e.target.value)) {
          setData({ ...data, mobile: e.target.value });
        }
        /[2-9]{2}\d{8}/.test(e.target.value)
          ? setErrors({ ...errors, mobile: false })
          : setErrors({ ...errors, mobile: true });

        break;
      case "country":
        setData({ ...data, country: e.target.value });
        break;
      case "state":
        setData({ ...data, state: e.target.value });
        break;
      case "city":
        setData({ ...data, city: e.target.value });
        break;
      case "message":
        setData({ ...data, message: e.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {submitMessage && <h4>{submitMessage}</h4>}
        <form onSubmit={(e) => e.preventDefault()} className="reg-form">
          <div className="column">
            <div>
              <label>Name</label>
              <input
                type={"text"}
                name={"name"}
                value={data?.name}
                onChange={handleInput}
                style={errors.name ? errorStyle : {}}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type={"text"}
                name={"email"}
                value={data?.email}
                onChange={handleInput}
                style={errors?.email ? errorStyle : {}}
              />
            </div>

            <div>
              <label>Mobile</label>
              <input
                type={"text"}
                name={"mobile"}
                value={data?.mobile}
                onChange={handleInput}
                // style={errors?.mobile ? errorStyle : {}}
              />
            </div>

            <div>
              <label>Country</label>
              <input
                type={"text"}
                name={"country"}
                value={data?.country}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="column">
            <div>
              <label>State</label>
              <input
                type={"text"}
                name={"state"}
                value={data?.state}
                onChange={handleInput}
              />
            </div>
            <div>
              <label>City</label>
              <input
                type={"text"}
                name={"city"}
                value={data?.city}
                onChange={handleInput}
              />
            </div>

            <div className={"reg-message"}>
              <label>Message</label>
              <textarea
                value={data?.message}
                name={"message"}
                onChange={handleInput}
              />
            </div>

            <div>
              <input
                type={"submit"}
                value={"Register"}
                className={"reg-button"}
                onClick={() => {
                  data?.name.length < 2 &&
                    setErrors((prev: any) => {
                      return { ...prev, name: true };
                    });
                  !data?.email &&
                    setErrors((prev: any) => {
                      return { ...prev, email: true };
                    });
                  if (
                    data.name === "" ||
                    data.email === "" ||
                    errors.email ||
                    errors.name
                  ) {
                    setSubmitMessage(
                      "Correct the highlighted fields and Submit Again!"
                    );
                  } else {
                    setSubmitMessage("Submit Sucessfull!");
                  }
                }}
              />
            </div>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Registration;
