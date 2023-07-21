import Logo from './logo-no-background.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext.jsx';

export default function Header() {
  const {user} = useContext(UserContext);
    return(
        <header className="flex justify-between">
          <Link to={'/'} className="flex items-center gap-1">
          <img src = {Logo} alt="logo" className="w-20 h-20" />
          <span className="text-2xl font-bold text-secondary">TravelNest</span>
          </Link>
  
          <div className="flex gap-5 border border-gray-300 rounded-full py-6 px-4 shadow-md shadow-gray-300">
            <div>Anywhere</div>
            <div className="border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border-l border-gray-300"></div>
            <div>Any guests</div>
            <button className="bg-primary text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            </button>
          </div>
          <Link to={user?'/account':'/login'} className="flex items-center gap-4 border border-gray-300 rounded-full py-6 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
  
            <div className="bg-gray-500 text-white rounded-full border border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1 overflow-hidden">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
  
            </div>
            {!!user && (
              <div>
                {user.username}
              </div>
            )}
          </Link>
        </header>
    );
}