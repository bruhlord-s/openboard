import axios from "axios";
import Popup from "reactjs-popup";
import MenuIcon from "../../../assets/menu.svg";
import "../styles/menu.css";

export default function GroupMenu({
  setShowEditGroupModal,
  setShowInviteModal,
  setShowConfirmDeleteModal
}) {
  return (
    <Popup
      trigger={<img className="group__menu" src={MenuIcon} alt="menu" />}
      position="right top"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: "6px 8px", border: "none" }}
      arrow={true}
    >
      <div className="menu__item" onClick={() => setShowInviteModal(true)}>
        <p>Invite User</p>
      </div>
      <div className="menu__item" onClick={() => setShowEditGroupModal(true)}>
        <p>Edit</p>
      </div>
      <div className="menu__item menu__item--danger" onClick={() => setShowConfirmDeleteModal(true)}>
        <p>Delete</p>
      </div>
    </Popup>
  );
}
