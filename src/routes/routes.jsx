import * as React from 'react';
import { lazy } from 'react';
import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom';
import { Loader } from '../module/core/Loader';
import { Layout } from '../module/core/ui/Layout'
import { ProtectedRoute, PublicRoute, AdminRoute, TeacherRoute, TrainerRoute } from './guards';

const Home = lazy(() => import('../screens/Home'));
const SignIn = lazy(() => import('../screens/SignIn'));
const SignUp = lazy(() => import('../screens/SignUp'));
const Dashboard = lazy(() => import('../screens/Dashboard'));
const Users = lazy(() => import('../screens/Users'));
const Exercise = lazy(() => import('../screens/Exercise'));
const DetailUser = lazy(() => import('../screens/DetailUser'));
const DetailUserAdmin = lazy(() => import('../screens/DetailUserAdmin'));
const DetailSesion = lazy(() => import('../screens/DetailSesion'));

const MySessions = lazy(() => import('../screens/trainer/MySessions'));
const SessionDetail = lazy(() => import('../screens/trainer/SessionDetail'));
const TrainerProgress = lazy(() => import('../screens/trainer/Progress'));
const MyTrainers = lazy(() => import('../screens/teacher/MyTrainers'));
const TrainerSessions = lazy(() => import('../screens/teacher/TrainerSessions'));
const SessionBuilder = lazy(() => import('../screens/teacher/SessionBuilder'));

export default function NavigatorRouter() {
  return (
    <React.Suspense fallback={
      <div className="h-screen w-screen grid place-content-center">
        <Loader className="h-[4rem] w-[4rem]" />
      </div>
    }>
      <RouterRoutes>
        {/* Rutas públicas SIN Layout (pantallas de auth) */}
        <Route element={<PublicRoute />}>
          <Route path={'/sign-in'} element={<SignIn />} />
          <Route path={'/sign-up'} element={<SignUp />} />
        </Route>

        {/* Rutas CON Layout */}
        <Route element={<Layout />}>
          {/* Home - accesible siempre (sin guard) */}
          <Route path={'/'} element={<Home />} />

          {/* Rutas autenticadas */}
          <Route element={<ProtectedRoute />}>
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/profile'} element={<DetailUser />} />

            <Route element={<AdminRoute />}>
              <Route path={'/users'} element={<Users />} />
              <Route path={'/admin/profile/:id'} element={<DetailUserAdmin />} />
            </Route>

            <Route element={<TeacherRoute />}>
              <Route path={'/exercises'} element={<Exercise />} />
              <Route path={'/sessions'} element={<SessionBuilder />} />
              <Route path={'/sessions/create'} element={<SessionBuilder />} />
              <Route path={'/sessions/:id/edit'} element={<SessionBuilder />} />
              <Route path={'/trainers'} element={<MyTrainers />} />
              <Route path={'/trainer/:trainerId/sessions'} element={<TrainerSessions />} />
            </Route>

            <Route element={<TrainerRoute />}>
              <Route path={'/my-sessions'} element={<MySessions />} />
              <Route path={'/session/:id'} element={<SessionDetail />} />
              <Route path={'/progress'} element={<TrainerProgress />} />
              <Route path={'/detail-sesion/:id'} element={<DetailSesion />} />
            </Route>

            <Route path={'/detail-user/:id'} element={<DetailUser />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </RouterRoutes>
    </React.Suspense>
  );
}