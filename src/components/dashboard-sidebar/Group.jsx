import { useState } from "react";
import "./styles/group.css";
import Workspace from "./Workspace";
import ChevronIcon from "../../assets/chevron.svg";
import PlusIcon from "../../assets/plus.svg";
import CreateWorkspaceModal from "./modals/CreateWorkspaceModal";
import GroupMenu from "./modals/GroupMenu";
import EditGroupModal from "./modals/EditGroupModal";
import InviteToGroupModal from "./modals/InviteToGroupModal";
import ConfirmDeleteGroupModal from "./modals/ConfirmDeleteGroupModal.jsx";

export default function Group({ data, fetchUserData, setWorkspaceId }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);

  return (
    <div className="group" key={data.id}>
      <div className="group__header">
        <div
          className="group__title"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <img className="group__open-list" src={ChevronIcon} alt="open" />
          ) : (
            <img
              className="group__collapse-list"
              src={ChevronIcon}
              alt="close"
            />
          )}{" "}
          <p className="group__name">{data.name}</p>
        </div>
        <div className="group__icons">
          <img
            className="group__add-workspace"
            src={PlusIcon}
            alt="add"
            onClick={() => setShowCreateWorkspaceModal(true)}
          />
          <GroupMenu
            setShowEditGroupModal={setShowEditGroupModal}
            setShowInviteModal={setShowInviteModal}
            setShowConfirmDeleteModal={setShowConfirmDeleteModal}
          />
        </div>
      </div>
      <div className="group__workspaces">
        {!isCollapsed && (
          <div>
            {data.workspaces.map((workspace) => (
              <Workspace
                data={workspace}
                key={workspace.id}
                fetchUserData={fetchUserData}
                setWorkspaceId={setWorkspaceId}
              />
            ))}
            {data.workspaces.length < 1 && (
              <p className="group__no-workspaces">
                No workspaces in the group =\
              </p>
            )}
          </div>
        )}
      </div>

      <CreateWorkspaceModal
        open={showCreateWorkspaceModal}
        setOpen={setShowCreateWorkspaceModal}
        group={data}
        fetchUserData={fetchUserData}
      />
      <EditGroupModal
        open={showEditGroupModal}
        setOpen={setShowEditGroupModal}
        group={data}
        fetchUserData={fetchUserData}
      />
      <InviteToGroupModal
        open={showInviteModal}
        setOpen={setShowInviteModal}
        group={data}
        fetchUserData={fetchUserData}
      />
      <ConfirmDeleteGroupModal
        open={showConfirmDeleteModal}
        setOpen={setShowConfirmDeleteModal}
        group={data}
        fetchUserData={fetchUserData}
      />
    </div>
  );
}
