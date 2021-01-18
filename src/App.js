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
  const [blockedCells, setBlocked] = useState([])

  //useEffect for changing lastClickedCell
  //updates startCell/endCell in the case they are overridden
  useEffect(()=>{
    if(!lastClickedCell){
      return
    }
    var x = parseInt(lastClickedCell.charAt(0))
    var y = parseInt(lastClickedCell.charAt(1))
    switch(currentPlacement){
      //We're trying to place a new START
      case placements.START:
        if(startCell){
          clearState(startCell)
        }
        setStart(lastClickedCell)
        break
      //We're trying to place a new END
      case placements.END:
        if(endCell){
          clearState(endCell)
        }
        setEnd(lastClickedCell)
        break
      //We're clearing or blocking
      default:
        switch(gridData[x][y].state){
          case placements.START:
            clearState(startCell)
            setStart(null)
            break
          case placements.END:
            clearState(endCell)
            setEnd(null)
            break
          default:
            break
        }
        break
    }
    gridData[x][y].state = currentPlacement
  }, [lastClickedCell])

  //useEffect for startCell
  useEffect(()=>{
    if(!startCell){
      return
    }
    //Check that start hasn't been set to the end cell
    if(startCell === endCell){
      clearState(endCell)
      setEnd(null)
    }
    console.log(startCell)
  }, [startCell])

  //useEffect for endCell
  useEffect(()=>{
    if(!endCell){
      return
    }
    //Check that end hasn't been set to the start cell
    if(endCell === startCell){
      clearState(startCell)
      setStart(null)
    }
    console.log(endCell)
  },[endCell])


  function clearState(cell){
    if(!cell){
      return
    }
    var x = parseInt(cell.charAt(0))
    var y = parseInt(cell.charAt(1))
    gridData[x][y].state = placements.CLEAR
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
