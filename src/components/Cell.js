import React from 'react'

export default function Cell({x, y, key}) {
    return (
        <button className="Cell">
            {x + "," + y}
        </button>
    )
}
