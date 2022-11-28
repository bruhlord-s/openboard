import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Button from "../../Button";
import "reactjs-popup/dist/index.css";
import "../styles/modal.css";
import axios from "axios";

export default function InviteToGroupModal({
  open,
  setOpen,
  group,
  fetchUserData,
}) {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (emailInput.length < 1) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [emailInput]);

  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .post(
        `/group/invite/${group.id}`,
        {
          user_email: emailInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        fetchUserData();
        setOpen(false);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(
            Object.values(err.response.data?.errors).map((error) => error[0])
          );
        } else {
          setErrors(["Something went wrong"]);
        }
        setIsLoading(false);
      });
  };

  return (
    <Popup open={open} onClose={() => setOpen(false)} position="right center">
      <h2 className="modal__title">
        Invite user to <span className="modal__accent">{group.name}</span> group
      </h2>
      {errors.length > 0 && <div className="modal__errors">{errors}</div>}
      <input
        className="modal__input"
        type="text"
        placeholder="Enter email"
        onInput={(e) => setEmailInput(e.target.value)}
        disabled={isLoading}
      />
      <Button
        className="modal__submit"
        title="Invite"
        disabled={isLoading || disableSubmit}
        onClick={() => handleSubmit()}
      />
    </Popup>
  );
}
