import React from 'react'

export default function Cell({x, y, key, setClicked}) {
    function handleClick(){
        setClicked(x + "" + y)
    }

    return (
        <button
            className="Cell"
            onClick={handleClick}
        >
            {x + "," + y}
        </button>
    )
}
