import axios from "axios";
import { useEffect } from "react";
import { useMemo, useState } from "react";
import Select from "react-select";
import Popup from "reactjs-popup";
import useWorkspaceBoards from "../../../hooks/useWorkspaceBoards";
import useWorkspaceMembers from "../../../hooks/useWorkspaceMembers";
import "../styles/task-modal.css";

const parseTime = (str) => {
  let seconds = 0;
  let months = str.match(/(\d+)\s*M/);
  let days = str.match(/(\d+)\s*D/);
  let hours = str.match(/(\d+)\s*h/);
  let minutes = str.match(/(\d+)\s*m/);
  let secs = str.match(/(\d+)\s*s/);
  console.log(str);
  if (months) {
    seconds += parseInt(months[1]) * 86400 * 30;
  }
  if (days) {
    seconds += parseInt(days[1]) * 86400;
  }
  if (hours) {
    seconds += parseInt(hours[1]) * 3600;
  }
  if (minutes) {
    seconds += parseInt(minutes[1]) * 60;
  }
  if (secs) {
    seconds += parseInt(secs[1]);
  }
  return seconds;
};

const secondsToTime = (estimatedSeconds) => {
  const hours = Math.floor(estimatedSeconds / 3600);
  const minutes = Math.floor((estimatedSeconds % 3600) / 60);
  const seconds = estimatedSeconds % 60;
  const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

  return formattedTime;
};

const boardsStyles = {
  control: (styles, { data }) => ({
    ...styles,
    background: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "6px",
    width: "170px",
  }),
  option: (styles, { data, isSelected }) => ({
    ...styles,
    ...dot(data?.color),
    backgroundColor: isSelected ? "#EDEDED" : undefined,
    color: isSelected ? "#000000" : undefined,
    cursor: "pointer",

    ":hover": {
      ...styles["hover"],
      backgroundColor: "#EDEDED",
    },
  }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const membersStyles = {
  option: (styles, { data, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#EDEDED" : undefined,
    cursor: "pointer",
    color: data.id ? "#00000080" : isSelected ? "#000000" : undefined,

    ":hover": {
      ...styles["hover"],
      backgroundColor: "#EDEDED",
    },
  }),
};

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export default function EditTaskModal({
  open,
  setOpen,
  workspace,
  update,
  task,
}) {
  const [boardId, setBoardId] = useState(task.board_id);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [userId, setUserId] = useState(task.user_id);
  const [timeEstimated, setTimeEstimated] = useState(task.time_estimated);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    console.log(workspace);
  }, []);

  const boardsOptions = useMemo(() => {
    return workspace.boards.map((board) => {
      return {
        value: board.id,
        label: board.name,
        color: board.color,
      };
    });
  }, [workspace.boards]);

  const membersOptions = useMemo(() => {
    let options = [{ label: "No assignee", value: null }];

    if (!workspace.group.users) return options;

    workspace.group.users.forEach((member) => {
      options.push({
        value: member.id,
        label: member.name,
      });
    });

    return options;
  }, [workspace.group.users]);

  useEffect(() => {
    if (name.length < 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name]);

  const handleDelete = () => {
    axios
      .delete(`/task/${task.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        update();
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = () => {
    const data = {
      board_id: boardId,
      name: name,
      description: description,
      user_id: userId,
      time_estimated: parseTime(timeEstimated),
    };

    axios
      .put(`/task/${task.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        update();
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Popup className="task-modal" open={open} onClose={() => setOpen(false)}>
      <div className="task-modal">
        <h2 className="task-modal__title">Edit task</h2>
        <div className="task-modal__task-name">
          <Select
            styles={boardsStyles}
            options={boardsOptions}
            defaultValue={boardsOptions.find(
              (board) => board.value === boardId
            )}
            onChange={(option) => setBoardId(option.value)}
          />
          <span className="task-modal__task-name-divider">/</span>
          <input
            type="text"
            className="task-modal__task-name-input"
            placeholder="Task name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </div>
        <textarea
          className="task-modal__desc-input"
          rows="10"
          placeholder="Task description"
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        ></textarea>
        <div className="task-modal__input-row">
          <div className="task-modal__input-group">
            <p className="task-modal__input-name">Assignee</p>
            <Select
              styles={membersStyles}
              options={membersOptions}
              defaultValue={membersOptions.find(
                (member) => member.value === userId
              )}
              onChange={(option) => setUserId(option.value)}
            />
          </div>
          <div className="task-modal__input-group">
            <p className="task-modal__input-name">Time estimated</p>
            <input
              type="text"
              className="task-modal__input"
              placeholder="2h 30m 10s"
              onChange={(e) => setTimeEstimated(e.currentTarget.value)}
              value={secondsToTime(timeEstimated)}
            />
          </div>
        </div>
        <div className="task-modal__footer">
          <button
            className="task-modal__btn"
            onClick={() => handleSubmit()}
            disabled={disabled}
          >
            Edit
          </button>
          <button
            className="task-modal__btn task-modal__btn--warning"
            onClick={() => handleDelete()}
            disabled={disabled}
          >
            Delete
          </button>
        </div>
      </div>
    </Popup>
  );
}
