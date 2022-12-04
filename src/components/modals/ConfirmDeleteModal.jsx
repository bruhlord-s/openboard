import axios from "axios";
import { useState } from "react";
import Popup from "reactjs-popup";
import Button from "../Button";
import "../dashboard-sidebar/styles/modal.css";

export default function ConfirmDeleteModal({
  open,
  setOpen,
  data,
  endpoint,
  update,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);

    axios
      .delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then(() => {
        setIsLoading(false);
        update();
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
        Are you sure you want to delete{" "}
        <span className="modal__accent">{data.name}</span>?
      </h2>
      <div className="modal__footer">
        <Button
          title="Confirm"
          className="modal__submit"
          onClick={() => handleConfirm()}
        />
      </div>
    </Popup>
  );
}
