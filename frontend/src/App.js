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
import EditQuestion from './components/examPage/editQuestion/editQuestion';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddExam from './pages/AddExam';
import Users from './pages/Users';
import io from 'socket.io-client';
import Spinner from './components/Spinner';
const LazyAbout = React.lazy(() => import('./pages/About'));

const socket = io.connect('/');

export default function App() {

  return (
    <>
      <div className='container'>
        <Header />
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='about'
            element={
              <React.Suspense fallback={<Spinner />}>
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
          <Route path='chat' element={<Chat socket={socket} />} />

          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}
