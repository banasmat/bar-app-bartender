import React from 'react';
import OrderList from "./OrderList";
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <div className="App">
        <Typography
            component="h2"
            variant="body2"
            color="textPrimary"
        >Zamówienia</Typography>
      <OrderList/>
    </div>
  );
}

export default App;
