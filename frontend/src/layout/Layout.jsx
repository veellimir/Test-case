import { Outlet } from "react-router-dom"
import React, { useState } from 'react';

import PrivateRoute from '../pages/authUser/PrivateRouter'
import Header from "../components/Main/HeaderComp"
import '../index.css';


const Layout = () => {
  const [setAuthToken] = useState(null);

  return (
    <>
    <div>
      <PrivateRoute>
        <Header />
      </PrivateRoute>
    </div>
    <Outlet setAuthToken={setAuthToken} />
    <div>
      <PrivateRoute>
        <footer>
              footer
          </footer>
      </PrivateRoute>
    </div>
    </>
  )
}

export default Layout