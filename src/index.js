import React from 'react';
import { ApolloProvider } from "react-apollo-hooks";
import Client from './Apollo/Client';
import ReactDOM from 'react-dom';
import App from './Components/App';


ReactDOM.render(
  <ApolloProvider client={Client}>
  
    <App />
  
  </ApolloProvider>,
  document.getElementById('root')
);


