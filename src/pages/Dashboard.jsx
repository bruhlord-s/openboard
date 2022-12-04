import Sidebar from "../components/dashboard-sidebar";
import "../assets/styles/dashboard.css";
import { useState } from "react";
import NoWorkspace from "../components/workspace-view/NoWorkspace";
import WorkspaceView from "../components/workspace-view";

export default function Dashboard() {
  const [workspaceId, setWorkspaceId] = useState();

  return (
    <div className="dashboard">
      <Sidebar setWorkspaceId={setWorkspaceId} />
      {!workspaceId && <NoWorkspace />}
      {workspaceId && <WorkspaceView workspaceId={workspaceId} />}
    </div>
  );
}