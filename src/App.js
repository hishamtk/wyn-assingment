

import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {

  return (
    <>
    <Header />
    <main className="App">
        <div className="controls">
          <button>Get microphone input</button>
        </div>
      </main>

      <Footer />
      </>
  );
}

export default App;

