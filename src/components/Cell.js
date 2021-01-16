import React from 'react'

export default function Cell({x, y, key, setClicked, state}) {
    function handleClick(){
        setClicked(x + "" + y)
    }

    return (
        <button
            className={"Cell" + " " + state}
            onClick={handleClick}
        >
            {x + "," + y}
        </button>
    )
}
