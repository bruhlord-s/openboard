import "./styles/index.css";
import WorkspaceViewHeader from "./WorkspaceViewHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateBoardModal from "./modals/CreateBoardModal";
import Board from "./Board";
import CreateTaskModal from "./modals/CreateTaskModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
});

export default function WorkspaceView({ workspaceId }) {
  const [workspace, setWorkspace] = useState();
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkspace = () => {
    setIsLoading(true);

    axios
      .get(`/workspace/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setWorkspace(res.data.data);
        console.log(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      workspace.boards,
      result.source.index,
      result.destination.index
    );

    const newWorkspace = workspace;
    newWorkspace.boards = items;

    setWorkspace(newWorkspace);
  };

  useEffect(() => {
    fetchWorkspace();
  }, [workspaceId]);

  return (
    <div className="workspace-view">
      <WorkspaceViewHeader
        data={workspace}
        setShowAddBoardModal={setShowAddBoardModal}
        setShowAddTaskModal={setShowAddTaskModal}
        isLoading={isLoading}
      />
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId="boards" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="workspace-view__boards"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {workspace?.boards.map((board, i) => (
                <Draggable
                  key={board.id}
                  draggableId={board.id.toString()}
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
                      <Board
                        data={board}
                        fetchWorkspace={fetchWorkspace}
                        setWorkspace={setWorkspace}
                        workspace={workspace}
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
      <CreateBoardModal
        open={showAddBoardModal}
        setOpen={setShowAddBoardModal}
        workspaceId={workspace?.id}
        fetchWorkspace={fetchWorkspace}
      />
      <CreateTaskModal
        open={showAddTaskModal}
        setOpen={setShowAddTaskModal}
        workspace={workspace}
        update={fetchWorkspace}
      />
    </div>
  );
}
