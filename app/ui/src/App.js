import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"

import { useEffect, useState } from 'react';
import Overlay from './pages/overlay';
import Ctl from './pages/ctl';

function App() {

  return (
    <div className="App">
      {window.location.search=="?page=overlay"?<Overlay/>:<Ctl/>}
    </div>
  );
}

export default App;
