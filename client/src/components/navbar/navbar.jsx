import { NavLink } from 'react-router-dom'
import './navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import cloud from '../../assets/img/cloud.png'
import { logout } from '../../store/userReducer'



export const Navbar = () =>{
	const isAuth = useSelector(state => state.user.isAuth)
	const dispatch = useDispatch()
	return (
		<div className="navbar">
			<div className="navbar_container">
				<div className="logo">
					<img src={cloud} alt="" className='navbar_img'/>
					<p className="navbar_header">Mern cloud</p>
				</div>
				<div className="navbar_auth">
					{!isAuth && <div className="navbar__ligin"><NavLink to='/login'>войти</NavLink></div>}
					{!isAuth && <div className="navbara__registration"><NavLink to='/registration'>Регистрация</NavLink></div>}
					{isAuth && <div className="navbara__registration" onClick={()=> dispatch(logout())}>Выход</div>}
				</div>
			</div>
		</div>
	)
}