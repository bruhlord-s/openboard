import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Button from "../../Button";
import "reactjs-popup/dist/index.css";
import "../../dashboard-sidebar/styles/modal.css";
import axios from "axios";

export default function EditBoardModal({
  open,
  setOpen,
  boardId,
  fetchWorkspace,
  values,
}) {
  const [nameInput, setNameInput] = useState(values.name);
  const [colorInput, setColorInput] = useState(values.color);
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
        `/board/${boardId}`,
        {
          name: nameInput,
          color: colorInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        fetchWorkspace();
        setOpen(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  return (
    <Popup open={open} onClose={() => setOpen(false)} position="right center">
      <h2 className="modal__title">Create new board</h2>
      <div className="modal__input-row">
        <input
          type="color"
          onInput={(e) => setColorInput(e.currentTarget.value)}
          disabled={isLoading}
          value={colorInput}
        />
        <input
          className="modal__input"
          type="text"
          placeholder="Enter a name"
          onInput={(e) => setNameInput(e.target.value)}
          disabled={isLoading}
          value={nameInput}
        />
      </div>

      <Button
        className="modal__submit"
        title="Edit"
        disabled={isLoading || disableSubmit}
        onClick={() => handleSubmit()}
      />
    </Popup>
  );
}
