import "./styles/board.css";
import MenuIcon from "../../assets/menu.svg";

export default function Board({ data }) {
  return (
    <div className="board">
      <div className="board__color" style={{ backgroundColor: data?.color }}></div>
      <div className="board__inner">
        <div className="board__header">
          <h2 className="board__title">{data.name}</h2>
          <div className="board__right">
            <div className="board__counter">3</div>
            <img src={MenuIcon} alt="settings" />
          </div>
        </div>
      </div>
    </div>
  );
}