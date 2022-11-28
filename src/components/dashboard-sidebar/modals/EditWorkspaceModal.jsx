import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Button from "../../Button";
import "reactjs-popup/dist/index.css";
import "../styles/modal.css";
import axios from "axios";

export default function EditWorkspaceModal({
                                         open,
                                         setOpen,
                                         workspace,
                                         fetchUserData,
                                       }) {
  const [nameInput, setNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (nameInput.length < 1) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [nameInput]);

  const handleSubmit = () => {
    setIsLoading(true);

    axios
      .put(
        `/workspace/${group.id}`,
        {
          name: nameInput,
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
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <Popup open={open} onClose={() => setOpen(false)} position="right center">
      <h2 className="modal__title">
        Edit <span className="modal__accent">{group.name}</span> group
      </h2>
      <input
        className="modal__input"
        type="text"
        placeholder="Enter a name"
        onInput={(e) => setNameInput(e.target.value)}
        disabled={isLoading}
      />
      <Button
        className="modal__submit"
        title="Edit"
        disabled={isLoading || disableSubmit}
        onClick={() => handleSubmit()}
      />
    </Popup>
  );
}
