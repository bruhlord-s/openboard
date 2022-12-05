import "./styles/header.css";
import PlusIcon from "../../assets/plus.svg";
import "../dashboard-sidebar/styles/skeleton.css";

export default function WorkspaceViewHeader({
  data,
  setShowAddBoardModal,
  setShowAddTaskModal,
  isLoading,
}) {
  return (
    <div className="header">
      {isLoading && (
        <div className="skeleton__item skeleton__header-title"></div>
      )}
      {!isLoading && <div className="header__title">{data?.name}</div>}
      <div className="header__menu">
        <div
          className="header__button"
          onClick={() => setShowAddBoardModal(true)}
        >
          <p>Board</p>
          <img src={PlusIcon} alt="add" />
        </div>
        <div
          className="header__button"
          onClick={() => setShowAddTaskModal(true)}
        >
          <p>Task</p>
          <img src={PlusIcon} alt="add" />
        </div>
      </div>
    </div>
  );
}
