import Popup from "reactjs-popup";
import "../styles/menu.css";
import DotsMenu from "../../../assets/dots-menu.svg"

export default function WorkspaceMenu({
                                    setShowEditGroupModal,
                                    setShowInviteModal,
                                    setShowConfirmDeleteModal
                                  }) {
  return (
    <Popup
      trigger={<img className="workspace__menu" src={DotsMenu} alt="menu" />}
      position="right top"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: "6px 8px", border: "none" }}
      arrow={true}
    >
      <div className="menu__item" onClick={() => setShowEditGroupModal(true)}>
        <p>Edit</p>
      </div>
      <div className="menu__item menu__item--danger" onClick={() => setShowConfirmDeleteModal(true)}>
        <p>Delete</p>
      </div>
    </Popup>
  );
}
