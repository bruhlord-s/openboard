import "../styles/skeleton.css";

export default function SkeletonBody() {
  return (
    <div>
      <div className="skeleton__title skeleton__item"></div>
      <div className="skeleton__group">
        <div className="skeleton__group-title skeleton__item"></div>
        <div className="skeleton__workspaces">
          <div className="skeleton__workspace skeleton__item"></div>
        </div>
      </div>
      <div className="skeleton__group">
        <div className="skeleton__group-title skeleton__item"></div>
        <div className="skeleton__workspaces">
          <div className="skeleton__workspace skeleton__item"></div>
          <div className="skeleton__workspace skeleton__item"></div>
          <div className="skeleton__workspace skeleton__item"></div>
        </div>
      </div>
    </div>
  )
}