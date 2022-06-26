import logo from './logo.svg';
import './App.css';
import Main from './components/views/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import OneAuthor from './components/OneAuthor';
import Update from './components/Update';
import AuthorForm from '../src/components/AuthorForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/"></Route>
          <Route element={<AuthorForm />} path="/authors/new"></Route>
          <Route element={<OneAuthor/>} path="/authors/:id"></Route>
          <Route element={<Update />} path="/author/edit/:id"></Route>
        </Routes>
        </BrowserRouter>

        
      </header>
    </div>
  );
}

export default App;
