import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/signup' element={<Signup />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/product' element={<Product />} />
          <Route path='/about' element={<AboutUs />} />

          <Route exact path='/search' element={<SearchBooks />} />
          <Route exact path='/saved' element={<SavedBooks />} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
