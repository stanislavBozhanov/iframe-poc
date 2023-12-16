import React, { useEffect } from 'react';

function App() {
  const scriptToRun = `fetch('http://localhost:3000/sensitive', {
      method: 'POST',
      body: 'Hello from the iframe!',
      credentials: "include"
    });
    try {
      console.log("local storage from iframe", localStorage.getItem("thekey"));
    } catch (e) {
      console.log("unable to read local storage from iframe");
    }
    `;

  const iframeContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Iframe Content</title>
    </head>
    <body>
        <h1>Hello from the Iframe!</h1>
        <p>This iframe has a different origin.</p>
        <script>
            ${scriptToRun}
        </script>
        <button onclick="sendMessage()">Send Message to Parent</button>
    </body>
    </html>
  `;

  useEffect(() => {
    // Listen for messages from the iframe
    window.addEventListener('message', (event) => {
      console.log('Received message:', event.data);
    });
    localStorage.setItem('thekey', 'thevalue');
    console.log('local storage from self', localStorage.getItem('thekey'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello World!</p>
        <p>IFRame</p>
        <iframe
          title="my-iframe"
          srcDoc={iframeContent}
          style={{ width: '300px', height: '200px' }}
          sandbox="allow-scripts"
        />
      </header>
    </div>
  );
}

export default App;
