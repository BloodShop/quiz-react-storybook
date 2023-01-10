import logo from './logo.svg';
import './App.css';
import QuestionList from './components/questionList/questionList';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return (
    <div className="App">
      <h1>Exam</h1>
      <QuestionList />
    </div>
  );
}
