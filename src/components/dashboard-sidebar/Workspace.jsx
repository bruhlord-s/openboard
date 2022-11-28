import "./styles/workspace.css";
import WorkspaceMenu from "./modals/WorkspaceMenu";

export default function Workspace({ data }) {
  return (
    <div className="workspace" key={data.id}>
      <p className="workspace__title">{data.name}</p>
      <WorkspaceMenu />
    </div>
  );
}
