import LogoImage from '../assets/openboard.svg'

export default function Logo({ className }) {
    return <img src={LogoImage} alt="OpenBoard" className={`${className}`} />
}