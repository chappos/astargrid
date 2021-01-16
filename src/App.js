import React, { useState } from 'react'
import './App.css';
import Grid from './components/Grid.js'

function App() {
  const gridSize = 10
  const [gridData, setGridData] = useState(generateGridData())

  function generateGridData(){
    var output = []
    for(var i = 0; i < gridSize; i++){
      var row = []
      output.push(row)
      for(var j = 0; j < gridSize; j++){
        output[i].push({
          'x': i,
          'y': j,
          'f': null,
          'g': null,
          'h': null,
          'parent': null
        })
      }
    }
    return output
  }


  return (
    <div className="App">
        <Grid
          gridData={gridData}
        ></Grid>
    </div>
  );
}

export default App;
