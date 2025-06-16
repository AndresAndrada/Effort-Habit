// import NavItem from '../ui/navigation/NavItem'
// import NotificationDropdown from '../ui/dropdown/notificationDropdown'
// import UserDropdown from '../ui/UserDropdown'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../auth/hooks/useLogout';
import useLogIn from '../../auth/hooks/useLogin';
import { useUiStore, useUserStore } from '../../../stores'
import SideBar from './SideBar';
// import { useEffect } from 'react'
// import { getLocalStorage } from '@/modules/auth/utils/getLocalStorage'

export default function Navbar() {
  const { Authenticated } = useUserStore();
  const { DarkMode, setDarkMode } = useUiStore();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { logIn } = useLogIn();

  const handlerSision = () => {
    Authenticated
      ? navigate('/sign-in')
      : logout()
  }

  // const { itemsInCart, setItemsInCart } =
  //   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  //   useBoundStore((state) => state)

  // // biome-ignore lint/correctness/useExhaustiveDependencies: <suppressions/parse>
  // useEffect(() => {
  //   const itemsStorage = getLocalStorage('shoppingCard')

  //   if (itemsStorage) {
  //     setItemsInCart(itemsStorage.length)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <div className={`navbar ${DarkMode ? "bg-primary" : "bg-secondary"} drop-shadow-md transition-bg`}>
      {/* Sidebar solo visible en móvil */}
      <div className="flex-none">
        <SideBar />
      </div>
      {/* Logo y nombre */}
      <div className="flex-1">
        <a className={`btn btn-ghost text-2xl md:text-3xl ${DarkMode ? "text-black" : "text-stone-300"} transition-bg`} onClick={() => navigate('/')}>Effort&Habit</a>
      </div>
      {/* Menú horizontal solo visible en desktop */}
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className={`${DarkMode ? "text-black" : "text-stone-300"} transition-bg`}><a className='text-xl'>Link</a></li>
          <li className={`${DarkMode ? "text-black" : "text-stone-300"} transition-bg`}><a className='text-xl'>Contacto</a></li>
        </ul>
      </div>
      {/* Iconos y usuario siempre visibles */}
      <div className='flex items-center gap-2'>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="synthwave" onChange={() => setDarkMode(!DarkMode)} />
          <svg className="swap-off h-10 w-10" fill={DarkMode ? "#142d4c" : "#ececec"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg className="swap-on h-10 w-10" fill={DarkMode ? "#142d4c" : "#ececec"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {Authenticated
              ? <>
                <li>
                  <a className="justify-between" onClick={() => navigate('/profile')}>
                    Perfil
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handlerSision}><a>Logout</a></li>
              </>
              : <li onClick={() => logIn()}><a>Login</a></li>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}