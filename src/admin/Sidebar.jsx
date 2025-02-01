import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import { Assignment, CategoryRounded, Home, MonetizationOn } from '@mui/icons-material';

const Sidebar = () => {






  return (


    <>
      <div className="flex flex-col h-screen p-3 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-center pl-2 pt-4">Dashboard</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  {/* <Home className='h-6 w-6' /> */}
                  <span>Home</span>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link
                  to="/admin/properties"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >

                  {/* <Assignment className='h-6 w-6' /> */}

                  <span>Properties</span>
                </Link>
              </li>
         
           




            </ul>
          </div>
        </div>
      </div>
    </>




  );
}

export default Sidebar