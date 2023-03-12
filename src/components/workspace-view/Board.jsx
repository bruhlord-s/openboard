import "./styles/board.css";
import MenuIcon from "../../assets/menu.svg";
import BoardMenu from "./modals/BoardMenu";
import { useState } from "react";
import EditBoardModal from "./modals/EditBoardModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import Task from "./Task";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import EditTaskModal from "./modals/EditTaskModal";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
});

export default function Board({
  data,
  fetchWorkspace,
  setWorkspace,
  workspace,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDragStart = (e) => {
    e.stopPropagination();
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      data.tasks,
      result.source.index,
      result.destination.index
    );

    const newWorkspace = workspace;
    newWorkspace.boards.find((board) => board.id === data.id).tasks = items;

    setWorkspace(newWorkspace);
  };

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
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              <Droppable droppableId="tasks" direction="vertical">
                {(provided) => (
                  <div
                    className="board__tasks"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {data?.tasks.map((task, i) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Task
                              data={task}
                              workspace={workspace}
                              update={fetchWorkspace}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
