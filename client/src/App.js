import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import Signup from './pages/Signup'
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/signup' element={<Signup />}/>
          {/* <Route path='/profile' element={<Profile />} /> */}
          {/* <Route path='/search' element={<Search />} /> */}
          <Route path='/product' element={<Product />} />
          {/* <Route path='/about' element={<About />} /> */}

          <Route exact path='/search' element={<SearchBooks />} />
          <Route exact path='/saved' element={<SavedBooks />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
