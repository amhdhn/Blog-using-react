import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderSection from './components/headerSection';
import Home from './components/home';
import { useState, useEffect } from 'react';
import Login from './components/login';
import Blog from './components/blog';
import User from './components/user';
import getCookie from './components/getCookie';

function App() {
  const [nightMode, setNightMode] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUserName] = useState(null);

  const activeNight = () => {
    setNightMode(true);
    document.body.style.background = '#1b2330 ';
    let time = new Date();
    time.setTime(time.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + time.toUTCString();
    let ck = document.cookie = 'nightMode=1;' + expires + '; path=/;';
  }
  const deactiveNight = () => {
    setNightMode(false);
    document.body.style.background = '#e7ebf1';
    let time = new Date();
    time.setFullYear(2000);
    let expires = "expires=" + time.toUTCString();
    let ck = document.cookie = 'nightMode=0;' + expires + ';path=/';

  }

  const handleChangeLogged = (username) => {
    setUserName(username);
    setLogged(true);
  }
  const handleLogOut = () => {
    setUserName(null);
    setLogged(false);
  }
  useEffect(() => {
    let ck = getCookie('usn');
    if (ck) {
      // setUserName(ck.slice(0, ck.indexOf('@')));
      setUserName(ck);
      setLogged(true);
    }
    let night = getCookie('nightMode');
    if (night) {
      activeNight();
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <HeaderSection nightMode={nightMode} activeNight={activeNight} deactiveNight={deactiveNight} username={username} logged={logged} />
        <Switch>
          <Route exact path='/'>
            <Home nightMode={nightMode} />
          </Route>
          <Route path='/login'>
            <Login usernam={username} nightMode={nightMode} handleChangeLogged={handleChangeLogged} logged={logged} />
          </Route>
          <Route path='/blog/:id'>
            <Blog nightMode={nightMode} />
          </Route>
          <Route path='/user'>
            <User nightMode={nightMode} handleLogOut={handleLogOut} username={username} logged={logged} />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;