import React from 'react';
import Main from "../routes/Main";
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import "./App.css";

function App() {
  return (
    <div className="App">
        <Header />
        <Main className="main" />
        <Footer />
    </div>
  );
}

export default App;