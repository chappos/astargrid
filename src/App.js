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
    BLOCKED: 'BLOCKED',
    SHORTEST: 'SHORTEST'
  }

  //Set up useStates
  const [gridData, setGridData] = useState(generateGridData())
  const [lastClickedCell, setClickedCell] = useState()
  const [currentPlacement, setCurrentPlacement] = useState(placements.START)
  const [startCell, setStart] = useState()
  const [endCell, setEnd] = useState()
  const [cellMap, setCellMap] = useState(new Map())
  const [result, setResult] = useState(new Map())

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

  useEffect(()=>{
    if(!gridData){
      return
    }
    if(startCell && endCell){
      var new_result = astarSearch()
      for(let i = 0; i < new_result.length; i++){
        if(new_result[i].state === placements.CLEAR){
          new_result[i].state = placements.SHORTEST
        }
      }
      setResult(new_result)
    }
  }, [gridData])

  function updateGrid(){
    var newGrid = generateGridData()
    var start = null 
    var end = null
    for(let [key, value] of cellMap){
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

  //A* SEARCH LOGIC

  function astarSearch(){
    var start = gridData[startCell.charAt(0)][startCell.charAt(1)]
    var end = gridData[endCell.charAt(0)][endCell.charAt(1)]

    var h = astarH(start, end)
    var open = []
    var closed = []
    open.push(gridData[start.x][start.y])
    while(open.length > 0){
        var lowestIndex = 0
        for(var i=0; i< open.length; i++){
            if(open[i].f < open[lowestIndex].f){
                lowestIndex = i
            }
        }
        var current = open[lowestIndex]

        //Found end
        if(current.x === end.x && current.y === end.y){
            var curr = current
            var ret = []
            while(curr.parent){
                ret.push(curr)
                curr = curr.parent
            }
            return ret.reverse()
        }

        //Normal case - close current and process neighbours
        open.splice(open.indexOf(current), 1)
        closed.push(current)
        var neighbours = getNeighbours(current)
        for(var ii=0; ii < neighbours.length; ii++){
            var neighbour = neighbours[ii]
            if(closed.includes(neighbour) || neighbour.state == "BLOCKED"){
                continue
            } else {
                var gScore = current.g + 1
                var gScoreIsBest = false

                if(!open.includes(neighbour)){
                    gScoreIsBest = true
                    neighbour.h = astarH([neighbour.x, neighbour.y], end)
                    open.push(neighbour)
                }
                else if(gScore < neighbour.g){
                    gScoreIsBest = true;
                }

                if(gScoreIsBest){
                    neighbour.parent = current
                    neighbour.g = gScore
                    neighbour.f = neighbour.g + neighbour.h 
                }
            }
        } 
    }
    return [];
}

function astarH(current, goal){
    return (Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y))
}
function getNeighbours(current){
    var output = []
    var x = current.x
    var y = current.y

    if(gridData[x-1] && gridData[x-1][y]){
        output.push(gridData[x-1][y])
    }
    if(gridData[x+1] && gridData[x+1][y]){
        output.push(gridData[x+1][y])
    }
    if(gridData[x][y-1]){
        output.push(gridData[x][y-1])
    }
    if(gridData[x][y+1]){
        output.push(gridData[x][y+1])
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
