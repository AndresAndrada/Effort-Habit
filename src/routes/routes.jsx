import * as React from 'react'
import { lazy } from 'react'
import { Loader } from '../module/core/Loader'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import Navbar from '../module/core/components/Navbar'
import { SignIn } from '../screens/SignIn'
// import { useEffect } from 'react'
// import { useUserStore } from '../stores'

const Home = lazy(() => import('../screens/Home'))


export default function NavigatorRouter() {
  return (
    <React.Suspense fallback={
      <div className="h-screen w-full grid place-content-center">
        <Loader className="h-[4rem] w-[4rem]" />
      </div>
    }>
      <RouterRoutes>
        <Route>
          <Route path={'/'} element={<Navbar />} />
          <Route path={'/sign-in'} element={<SignIn />} />
          <Route path={'/'} element={<Home />} />
        </Route>
      </RouterRoutes>
    </React.Suspense>
  )
}
