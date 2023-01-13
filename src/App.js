import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import AddQuestion from './components/examPage/addQuestion/addQuestion';
import Navbar from './components/navbar/navbar';
import ExamResult from './components/examResult/examResult';
import NoMatch from './components/noMatch/noMatch';
import ExamPage from './components/examPage/examPage';
import ExamsPage from './components/examsPage/examsPage';
import { FeaturedExams } from './components/examsPage/featuredExams';
import { NewExams } from './components/examsPage/newExams';
import HomePage from './components/homePage/homePage';
import AddExam from './components/addExam/addExam';
import Users from './components/users/users';
import EditUser from './components/users/editUser/editUser';
import Profile from './components/profile/profile';
import { AuthProvider } from './components/auth/auth';
import Login from './components/auth/login';
import RequireAuth from './components/auth/requireAuth';
const LazyAbout = React.lazy(() => import('./components/aboutPage/about'));

export default function App() {
  /* const [exams, setExams] = useState([
    {
      id: 1,
      title: 'exam1 - Dodge Game',
      releasedDate: Date.now(),
      description: 'LoL Dodge Game is a training tool for famous moba games like League of Legends you can improve your mechanics or just warmup by playing one of our Games.',
      questions: [
      {
          id: 1,
          title: 'Just the first question',
          description: 'What`s your favorite way to spend a day off?',
          answers: [
              { txt: 'Football', selected: false },
              { txt: 'Learn c#', selected: false },
              { txt: 'play cs-go', selected: false },
              { txt: 'sleep', selected: false }
          ],
          correctAnswer: 'play cs-go'
      },
      {
          id: 2,
          title: 'Just the second question',
          description: 'What type of music are you into?',
          answers: [
              { txt: 'Rap', selected: false },
              { txt: 'Rock Metal', selected: false },
              { txt: 'Just Metal', selected: false },
              { txt: 'Proper Metal', selected: false }
          ],
          correctAnswer: 'Rap'
      },
      {
          id: 3,
          title: 'What was the last thing you`ve done?',
          description: 'you had wasted time on something before your shitty work, what would it be?',
          answers: [
              { txt: 'Kill myself', selected: false },
              { txt: 'Dream of a better friend', selected: false },
              { txt: 'Send nudes to my crush', selected: false },
              { txt: 'I would think of how could I encourage my friends go to educate at Sela College', selected: false }
          ],
          correctAnswer: 'Send nudes to my crush'
      }]
    },
    {
      id: 2,
      title: 'Boxing and Unboxing',
      description: 'Boxing is the process of converting a value type to the type object or to any interface type implemented by this value type. When the common language runtime (CLR) boxes a value type, it wraps the value inside a System.Object instance and stores it on the managed heap. Unboxing extracts the value type from the object. Boxing is implicit; unboxing is explicit. The concept of boxing and unboxing underlies the C# unified view of the type system in which a value of any type can be treated as an object.',
      releasedDate: Date.now(),
      questions: [
      {
          id: 1,
          title: 'Just the first question',
          description: 'What`s your favorite way to spend a day off?',
          answers: [
              { txt: 'Football', selected: false },
              { txt: 'Learn c#', selected: false },
              { txt: 'play cs-go', selected: false },
              { txt: 'sleep', selected: false }
          ],
          correctAnswer: 'play cs-go'
      },
      {
          id: 2,
          title: 'Just the second question',
          description: 'What type of music are you into?',
          answers: [
              { txt: 'Rap', selected: false },
              { txt: 'Rock Metal', selected: false },
              { txt: 'Just Metal', selected: false },
              { txt: 'Proper Metal', selected: false }
          ],
          correctAnswer: 'Rap'
      },
      {
          id: 3,
          title: 'What was the last thing you`ve done?',
          description: 'you had wasted time on something before your shitty work, what would it be?',
          answers: [
              { txt: 'Kill myself', selected: false },
              { txt: 'Dream of a better friend', selected: false },
              { txt: 'Send nudes to my crush', selected: false },
              { txt: 'I would think of how could I encourage my friends go to educate at Sela College', selected: false }
          ],
          correctAnswer: 'Send nudes to my crush'
      }]
    },
]); */

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
          {/* <Route index element={<ExamResult />} /> */}
          <Route path='featured' element={<FeaturedExams />} />
          <Route path='new' element={<NewExams />} />
        </Route>

        <Route path='exams/:id' element={<ExamPage />} >
          <Route path='result' element={<ExamResult />} />
        </Route>
        <Route path='exams/:id/add-question' element={<RequireAuth><AddQuestion /></RequireAuth>}/>
        {/* <Route path='exams/:id/result' element={<ExamResult />} /> */}

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
