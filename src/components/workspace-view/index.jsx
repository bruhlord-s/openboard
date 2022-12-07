import "./styles/index.css";
import WorkspaceViewHeader from "./WorkspaceViewHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateBoardModal from "./modals/CreateBoardModal";
import Board from "./Board";
import CreateTaskModal from "./modals/CreateTaskModal";

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
      <div className="workspace-view__boards">
        {workspace?.boards.map((board) => (
          <Board data={board} fetchWorkspace={fetchWorkspace} key={board.id} />
        ))}
      </div>
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
