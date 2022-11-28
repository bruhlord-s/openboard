export default function SkeletonFooter() {
  return (
    <div className="skeleton__user-info">
      <div className="skeleton__item skeleton__avatar"></div>
      <div className="skeleton__text">
        <div className="skeleton__item skeleton__name"></div>
        <div className="skeleton__item skeleton__email"></div>
      </div>
    </div>
  )
}