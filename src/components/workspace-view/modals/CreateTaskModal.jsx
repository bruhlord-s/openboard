import { useMemo } from "react";
import Select from "react-select";
import Popup from "reactjs-popup";
import useWorkspaceBoards from "../../../hooks/useWorkspaceBoards";
import useWorkspaceMembers from "../../../hooks/useWorkspaceMembers";
import "../styles/task-modal.css";

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

export default function CreateTaskModal({ open, setOpen, workspace, update }) {
  const [boards, isBoardsLoading] = useWorkspaceBoards(workspace?.id);
  const [members, isMembersLoading] = useWorkspaceMembers(workspace?.id);

  const boardsOptions = useMemo(() => {
    if (!boards) return;

    return boards.map((board) => {
      return {
        value: board.id,
        label: board.name,
        color: board.color,
      };
    });
  }, [boards]);

  const membersOptions = useMemo(() => {
    let options = [{ label: "No assignee", value: null }];

    if (!members) return options;

    members.forEach((member) => {
      options.push({
        value: member.id,
        label: member.name,
      });
    });

    return options;
  }, [members]);

  return (
    <Popup className="task-modal" open={open} onClose={() => setOpen(false)}>
      <div className="task-modal">
        <h2 className="task-modal__title">
          Create new task in
          <span className="task-modal__workspace-name">
            {" "}
            {workspace?.name}{" "}
          </span>
          workspace?
        </h2>
        <div className="task-modal__task-name">
          <Select
            styles={boardsStyles}
            options={boardsOptions}
            defaultValue={boardsOptions[0]}
          />
          <span className="task-modal__task-name-divider">/</span>
          <input
            type="text"
            className="task-modal__task-name-input"
            placeholder="Task name"
          />
        </div>
        <textarea
          className="task-modal__desc-input"
          rows="10"
          placeholder="Task description"
        ></textarea>
        <div className="task-modal__input-row">
          <div className="task-modal__input-group">
            <p className="task-modal__input-name">Assignee</p>
            <Select
              styles={membersStyles}
              options={membersOptions}
              defaultValue={membersOptions[0]}
            />
          </div>
          <div className="task-modal__input-group">
            <p className="task-modal__input-name">Time estimated</p>
            <input
              type="text"
              className="task-modal__input"
              placeholder="2h 30m 10s"
            />
          </div>
        </div>
        <div className="task-modal__footer">
          <div className="task-modal__btn">Create</div>
        </div>
      </div>
    </Popup>
  );
}
