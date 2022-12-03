import Sidebar from "../components/dashboard-sidebar";
import "../assets/styles/dashboard.css";
import { useState } from "react";
import NoWorkspace from "../components/workspace-view/NoWorkspace";

export default function Dashboard() {
  const [workspaceId, setWorkspaceId] = useState();

  return (
    <div className="dashboard">
      <Sidebar />
      {!workspaceId && <NoWorkspace />}
    </div>
  );
}