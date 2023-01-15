import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import AddQuestion from './components/examPage/addQuestion/addQuestion';
import Navbar from './components/navbar/navbar';
import ExamResult from './components/examPage/examResult/examResult';
import NoMatch from './components/noMatch/noMatch';
import ExamPage from './components/examPage/examPage';
import ExamsPage from './components/examsPage/examsPage';
import HomePage from './components/homePage/homePage';
import AddExam from './components/addExam/addExam';
import Users from './components/users/users';
import EditUser from './components/users/editUser/editUser';
import Profile from './components/profile/profile';
import { AuthProvider } from './components/auth/auth';
import Login from './components/auth/login';
import RequireAuth from './components/auth/requireAuth';
import EditQuestion from './components/examPage/editQuestion/editQuestion';
import useToken from './components/auth/useToken';
const LazyAbout = React.lazy(() => import('./components/aboutPage/about'));

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

export default function App() {
  const { token, setToken } = useToken();

  /* if(!token) {
    return <Login setToken={setToken} />
  } */

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='about'
          element={
            <React.Suspense fallback='Loading...'>
              <LazyAbout />
            </React.Suspense>
          } />

        <Route path='exams' element={<ExamsPage />}>
          {/* <Route index element={< />} />
          <Route path='featured' element={<FeaturedExams />} />
          <Route path='new' element={<NewExams />} /> */}
        </Route>

        <Route path='exams/:id' element={<ExamPage />} >
          {/* <Route path='exams/:id/result' element={<ExamResult key={Math.random()}/>} /> */}
        </Route>

        <Route path='exams/:id/result' element={<ExamResult key={Math.random()}/>} />
        <Route path='exams/:id/add-question' element={<RequireAuth><AddQuestion /></RequireAuth>}/>
        <Route path='exams/:id/edit-question/:qid' element={<EditQuestion />}/>

        <Route path='add-exam' element={<RequireAuth><AddExam /></RequireAuth>} />

        <Route path='users' element={<RequireAuth><Users /></RequireAuth>} />
        <Route path='users/:id' element={<RequireAuth><EditUser /></RequireAuth>} />

        <Route path='profile' element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path='login' element={<Login />} />

        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}
