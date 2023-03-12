import "./styles/task.css";
import UserIcon from "../../assets/user.svg";
import TimeIcon from "../../assets/time.svg";
import EditTaskModal from "./modals/EditTaskModal";
import { useState } from "react";

const parseSeconds = (seconds) => {
  let hours = Math.floor(seconds / (60 * 60));

  let divisorForMinutes = seconds % (60 * 60);
  let minutes = Math.floor(divisorForMinutes / 60);

  return `${hours ? `${hours}h` : ""}${minutes ? ` ${minutes}m` : ""}`;
};

export default function Task({ data, workspace, update }) {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  return (
    <div className="task" onClick={() => setShowEditTaskModal(true)}>
      <p className="task__title">{data.name}</p>
      <div className="task__info">
        {data.time_estimated && (
          <div className="task__estimated">
            <img src={TimeIcon} alt="icon" />
            <p>{parseSeconds(data.time_estimated)}</p>
          </div>
        )}
        {data.user && (
          <div className="task__assignee">
            <img src={UserIcon} alt="user" />
            <p>{data.user?.name}</p>
          </div>
        )}
      </div>

      <EditTaskModal
        open={showEditTaskModal}
        setOpen={setShowEditTaskModal}
        workspace={workspace}
        task={data}
        update={update}
      />
    </div>
  );
}
