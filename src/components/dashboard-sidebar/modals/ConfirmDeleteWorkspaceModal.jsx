import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Button from "../../Button";
import "reactjs-popup/dist/index.css";
import "../styles/modal.css";
import axios from "axios";

export default function ConfirmDeleteWorkspaceModal({
                                                  open,
                                                  setOpen,
                                                  workspace,
                                                  fetchUserData,
                                                }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);

    axios
      .delete(
        `/workspace/${workspace.id}`,
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
        Are you sure you want to delete <span className="modal__accent">{workspace.name}</span> workspace?
      </h2>
      <div className="modal__footer">
        <Button title="Confirm" className="modal__button modal__button--danger" onClick={() => handleConfirm()} />
        <Button title="Cancel" className="modal__button" onClick={() => setOpen(false)} />
      </div>
    </Popup>
  );
}
