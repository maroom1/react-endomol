import React, {useState, useEffect} from 'react';
import Recipe from './Recipe'
import Dashboard from './components/Dashboard';
import About from './components/About';
import Home from './components/Home';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

const App = () => {
  const APP_ID = "3f219d73";
  const APP_KEY = "b9c1a003cbe0ce443984e9b2f211940b";
  const [receipes, setReceipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
  const getReceipes = async () => {
    const result = await fetch(exampleReq);
    const data = await result.json();
    setReceipes(data.hits);
    console.log(receipes)
  }
  useEffect(() =>{
    getReceipes();
  },[query]);

 
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Dashboard />
          </Route>
          <Route path="/">
            <>
            <Home />
            <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">submit</button>
      </form>
      {receipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories}
        image={recipe.recipe.image}/>        
      ))}
                  

      </>
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App

