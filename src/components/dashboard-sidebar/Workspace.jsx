import "./styles/workspace.css";
import WorkspaceMenu from "./modals/WorkspaceMenu";
import EditWorkspaceModal from "./modals/EditWorkspaceModal";
import { useState } from "react";
import ConfirmDeleteWorkspaceModal from "./modals/ConfirmDeleteWorkspaceModal";

export default function Workspace({ data, fetchUserData, setWorkspaceId }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="workspace" key={data.id}>
      <p className="workspace__title"
         onClick={() => setWorkspaceId(data.id)}>
        {data.name}
      </p>
      <WorkspaceMenu setShowEditModal={setShowEditModal} setShowConfirmDeleteModal={setShowDeleteModal} />

      <EditWorkspaceModal
        open={showEditModal}
        setOpen={setShowEditModal}
        workspace={data}
        fetchUserData={fetchUserData}
      />
      <ConfirmDeleteWorkspaceModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        workspace={data}
        fetchUserData={fetchUserData}
      />
    </div>
  );
}
