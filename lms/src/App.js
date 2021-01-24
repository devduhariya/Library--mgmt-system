
import './App.css';
// import React, {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Category from './components/admin/category/Categoy';
import Books from './components/Books';
import AdminBooks from './components/admin/Book/Books';
import cart from './components/cart';
import Admin from './components/admin/Admin';
import Layout from './components/Layout';
import Users from './components/admin/Users';
// const MongoClient = require('mongodb').MongoClient

function App() {
  return(
  <Layout>
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Registration} />
          <Route exact path='/admin/category/add-update' component={Category} />
          <Route exact path='/Books/:id' component={Books} />
          <Route exact path='/admin/books' component={AdminBooks} />
          <Route exact path='/cart' component={cart} />
          <Route exact path='/Admin' component={Admin} />
          <Route exact path='/Admin/users-list' component={Users} />
        </Switch>
      </div>

    </Router>
  </Layout>
  );
}

export default App;
