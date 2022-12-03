import './styles/user.css'
import Profile from '../../assets/profile.svg'

export default function User({ data }) {
  return (
    <div className='user'>
      <div className='user__icon'></div>
      <div className="user__info">
        <p className='user__name'>{data?.name}</p>
        <p className='user__email'>{data?.email}</p>
      </div>
    </div>
  )
}
