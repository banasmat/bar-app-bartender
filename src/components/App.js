import React from 'react';
import OrderList from "./OrderList";
import Typography from "@material-ui/core/Typography";
import TopBar from "./TopBar";

function App() {
  return (
    <div className="App">
      <TopBar/>
      <OrderList/>
    </div>
  );
}

export default App;
