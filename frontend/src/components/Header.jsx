import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Primary, Success } from './examPage/button/button.stories'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  debugger

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>EzQuizy</Link>
      </div>
      {user ? <>
        <div className='logo'>
          <Link to='/exams'>Exams</Link>
        </div>
        {user.role !== 'student' ? <><div className='logo'>
          <Link to='/add-exam'>Add Exam</Link>
        </div>
        <div className='logo'>
          <Link to='/users'>Users</Link>
        </div></> : null}
      </> : null}
      <div className='logo'>
        <Link to='/about'>About</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button onClick={onLogout} className='btn btn-block'>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}