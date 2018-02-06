import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  render(){
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hello World from React Bootstrap!</h1>
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
