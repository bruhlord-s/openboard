import Popup from "reactjs-popup";
import MenuIcon from "../../../assets/menu.svg";

export default function BoardMenu({
  setShowEditModal,
  setShowDeleteModal,
  className,
}) {
  return (
    <Popup
      trigger={<img src={MenuIcon} alt="settings" className={className} />}
      position="right top"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: "6px 8px", border: "none" }}
      arrow={true}
    >
      <div className="menu__item" onClick={() => setShowEditModal(true)}>
        <p>Edit</p>
      </div>
      <div
        className="menu__item menu__item--danger"
        onClick={() => setShowDeleteModal(true)}
      >
        <p>Delete</p>
      </div>
    </Popup>
  );
}
