import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Home from './components/Home';

const App=()=> {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
