import React from 'react'
import Option from './Option.js'

export default function OptionBar({placements, setCurrentPlacement}) {
    return (
        <div className="OptionBar">
            <Option
                placement={placements.START}
                setCurrentPlacement={setCurrentPlacement}
            />
            <Option
                placement={placements.END}
                setCurrentPlacement={setCurrentPlacement}
            />
            <Option
                placement={placements.CLEAR}
                setCurrentPlacement={setCurrentPlacement}
            />
            <Option
                placement={placements.BLOCKED}
                setCurrentPlacement={setCurrentPlacement}
            />
        </div>
    )
}
