import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import EditableTable from './pages/Pay';
import History from './pages/History';
import Main from './pages/Main';


function App() {
  return (
    <>
      <Router>
        <div className='App'>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/pay' element={<EditableTable />} />
            <Route exact path='/history' element={<History />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
