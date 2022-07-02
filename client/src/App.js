import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          {/* <Route exact path='/' component={Home} /> */}
          {/* <Route path='/login' component={Login} /> */}
          {/* <Route path='/profile' component={Profile} /> */}
          {/* <Route path='/search' component={Search} /> */}
          {/* <Route path='/product' component={Product} /> */}
          {/* <Route path='/about' component={About} /> */}

          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
