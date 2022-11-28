import { useNavigate } from 'react-router-dom'
import '../assets/styles/welcome.css'
import Button from '../components/Button'
import Logo from '../components/Logo'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className='container welcome'>
      <Logo className='welcome__logo' />
      <div className='welcome__text'>
        <h2 className='welcome__heading'>Добро пожаловать в OpenBoard</h2>
        <p className='welcome__desc'>
          Простой и удобный способ самоорганизации
        </p>
      </div>
      <Button
        className='welcome__btn'
        title={'Начать'}
        onClick={() => navigate('/register')}
      />
    </div>
  )
}
