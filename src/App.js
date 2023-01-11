import logo from './logo.svg';
import './App.css';
import QuestionList from './components/examPage/questionList/questionList';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import AddQuestion from './components/examPage/addQuestion/addQuestion';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<QuestionList />} />
      <Route path='/add' element={<AddQuestion />} />
    </Routes>
  );
}
