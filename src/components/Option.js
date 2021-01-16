import React from 'react'

export default function Option({placement, setCurrentPlacement}) {
    function handleClick(){
        setCurrentPlacement(placement)
    }
    return (
        <button className="Option" onClick={handleClick}>{placement}</button>
    )
}
