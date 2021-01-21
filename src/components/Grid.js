import React from 'react'
import Cell from "./Cell.js"
import {uuid} from 'uuidv4'

export default function Grid({gridData, setClicked}) {
    var gridSize = gridData.length
    var cells = generateCells()

    function generateCells(){
        var output = []
        for(var i=0; i < gridSize; i++){
            var row = []
            for(var j=0; j < gridSize; j++){
                row.push(
                    <Cell
                        x = {j}
                        y = {i}
                        key = {uuid()}
                        setClicked = {setClicked}
                        state = {gridData[j][i].state}
                    />
                )
            }
            output.push(<div className="GridRow" key={uuid()}>{row}</div>)
        }
        return output
    }
    


    return (
        <div className="Grid">
            {cells}
        </div>
    )
}
