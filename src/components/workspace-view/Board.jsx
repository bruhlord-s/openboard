import "./styles/board.css";
import MenuIcon from "../../assets/menu.svg";
import BoardMenu from "./modals/BoardMenu";
import { useState } from "react";
import EditBoardModal from "./modals/EditBoardModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function Board({ data, fetchWorkspace }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="board">
      <div
        className="board__color"
        style={{ backgroundColor: data?.color }}
      ></div>
      <div className="board__inner">
        <div className="board__header">
          <h2 className="board__title">{data.name}</h2>
          <div className="board__right">
            <div className="board__counter">{data?.tasks.length}</div>
            <BoardMenu
              className="board__menu"
              setShowEditModal={setShowEditModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          </div>
        </div>
        <div className="board__body">
          <div className="board__tasks">
            {data?.tasks.length < 1 && (
              <p className="board__no-tasks">No tasks =/</p>
            )}
            {data?.tasks.map((task) => (
              <Task data={task} key={task.id} />
            ))}
          </div>
        </div>
      </div>

      <EditBoardModal
        open={showEditModal}
        setOpen={setShowEditModal}
        boardId={data.id}
        fetchWorkspace={fetchWorkspace}
        values={{ name: data.name, color: data.color }}
      />
      <ConfirmDeleteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        data={data}
        endpoint={`/board/${data.id}`}
        update={fetchWorkspace}
      />
    </div>
  );
}
