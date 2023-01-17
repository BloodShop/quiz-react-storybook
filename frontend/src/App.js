import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import AddQuestion from './components/examPage/addQuestion/addQuestion';
import ExamResult from './components/examPage/examResult/examResult';
import NoMatch from './components/noMatch/noMatch';
import Exam from './pages/Exam';
import ExamsArchive from './pages/ExamsArchive';
import Home from './pages/Home';
import EditUser from './components/editUser/editUser';
import { AuthProvider } from './components/auth/auth';
import RequireAuth from './components/auth/requireAuth';
import EditQuestion from './components/examPage/editQuestion/editQuestion';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddExam from './pages/AddExam';
import Users from './pages/Users';
const LazyAbout = React.lazy(() => import('./pages/About'));

export default function App() {
  /* const { token, setToken } = useToken(); */

  /* if(!token) {
    return <Login setToken={setToken} />
  } */

  return (
    <AuthProvider>
      <div className='container'>
        <Header />
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='about'
            element={
              <React.Suspense fallback='Loading...'>
                <LazyAbout />
              </React.Suspense>
            } />

          <Route path='exams' element={<ExamsArchive />}>
            {/* <Route index element={< />} />
            <Route path='featured' element={<FeaturedExams />} />
            <Route path='new' element={<NewExams />} /> */}
          </Route>

          <Route path='exams/:id' element={<Exam />} />

          <Route path='exams/:id/result' element={<ExamResult key={Math.random()}/>} />
          <Route path='exams/:id/add-question' element={<AddQuestion />}/>
          <Route path='exams/:id/edit-question/:qid' element={<EditQuestion />}/>

          <Route path='add-exam' element={<AddExam />} />

          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<EditUser />} />

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
      <ToastContainer />
    </AuthProvider>
  );
}
