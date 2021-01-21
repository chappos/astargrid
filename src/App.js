import React, { useState, useEffect } from 'react'
import './App.css';
import Grid from './components/Grid.js'
import OptionBar from './components/OptionBar.js'

function App() {
  const gridSize = 10
  const placements = {
    START: 'START',
    END: 'END',
    CLEAR: 'CLEAR',
    BLOCKED: 'BLOCKED'
  }

  //Set up useStates
  const [gridData, setGridData] = useState(generateGridData())
  const [lastClickedCell, setClickedCell] = useState()
  const [currentPlacement, setCurrentPlacement] = useState(placements.START)
  const [startCell, setStart] = useState()
  const [endCell, setEnd] = useState()
  const [cellMap, setCellMap] = useState(new Map())

  useEffect(()=>{
    if(!lastClickedCell){
      return
    }
    var x_int = parseInt(lastClickedCell.charAt(0))
    var y_int = parseInt(lastClickedCell.charAt(1))
    var newMap = cellMap

    if(currentPlacement === placements.START || currentPlacement === placements.END){
      for(let [key, value] of newMap){
        if(value.state === currentPlacement){
          value.state = placements.CLEAR
        }
      }
    }

    // We don't want to store CLEAR placements, just remove current entries
    if(newMap.has(lastClickedCell)){
      newMap.delete(lastClickedCell)
    }

    if(currentPlacement !== placements.CLEAR){ 
      newMap.set(lastClickedCell, {x: x_int, y: y_int, state: currentPlacement})
    }
    setCellMap(newMap)
    updateGrid()
  }, [lastClickedCell])


  function updateGrid(){
    var newGrid = generateGridData()
    for(let [key, value] of cellMap){
      var start = null 
      var end = null
      var x_int = key.charAt(0)
      var y_int = key.charAt(1)
      if(value.state === placements.START){
        start = key
      } else if(value.state === placements.END){
        end = key
      }
      newGrid[x_int][y_int].state = value.state
    }
    setStart(start)
    setEnd(end)
    setGridData(newGrid)
  }

  //Generates a "blank" grid dataset
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
          'parent': null,
          'state' : placements.CLEAR
        })
      }
    }
    return output
  }

  return (
    <div className="App">
      <OptionBar
        placements={placements}
        setCurrentPlacement={setCurrentPlacement}
      />
      <Grid
        gridData={gridData}
        setClicked={setClickedCell}
      />
    </div>
  );
}

export default App;
