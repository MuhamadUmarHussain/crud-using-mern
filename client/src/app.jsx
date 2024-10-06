import React from 'react';
import Table from "./components/Table.jsx"
import { Toaster } from "react-hot-toast";



 

function App() {

  const [initial, setInitial] = React.useState();


  function getId(id){
    setInitial(id);
 }
  
  return (
    <div>
        <Table updateClick={getId}   rowId={initial}/>
        <Toaster />
    </div>
  );
}

export default App;
