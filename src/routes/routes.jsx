import * as React from 'react'
import { lazy } from 'react'
import { Loader } from '../module/core/Loader'
import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { SignIn } from '../screens/SignIn'
import { Layout } from '../module/core/ui/Layout'

const DetailUserAdmin = lazy(() => import('../screens/DetailUserAdmin'))
const DetailUser = lazy(() => import('../screens/DetailUser'))
const Users = lazy(() => import('../screens/Users'))
const Home = lazy(() => import('../screens/Home'))

export default function NavigatorRouter() {
  return (
    <React.Suspense fallback={
      <div className="h-screen w-full grid place-content-center">
        <Loader className="h-[4rem] w-[4rem]" />
      </div>
    }>
      <RouterRoutes>
        <Route element={<Layout />}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/profile'} element={<DetailUserAdmin />} />
          <Route path={'/detail-user/:id'} element={<DetailUser />} />
          <Route path={'/users'} element={<Users />} />
        </Route>
        <Route path={'/sign-in'} element={<SignIn />} />
      </RouterRoutes>
    </React.Suspense>
  )
}
