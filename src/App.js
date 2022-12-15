import './App.css';
import Add from './Components/Add';
import List from './Components/List';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Edit from './Components/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Navigate to="/add" />} />
        <Route path="/add" element={<Add />}/>
        <Route path="/list" element={<List />}/>
        <Route path="/edit" element={<Edit />}/>
      </Routes>
    </Router>
  );
}

export default App;
