import React from 'react';
import {browserHistory} from 'react-router';
import {Position, Tooltip} from "@blueprintjs/core";


// creates a button with tooltip, destination (onClick) can be string for push to loacation
// or command to execute

export default function tooltipButton(tip, icon, destination) {
    let clickCommand;
    if (typeof destination == 'string') {
        clickCommand = () => browserHistory.push(destination);
    } else {
        clickCommand = destination;
    }

    return (
        <Tooltip position={Position.BOTTOM}
                 hoverOpenDelay={1000}
                 content={tip}><a className={`pt-button ${icon}`}
                                  onClick={clickCommand}  role="button"></a>
        </Tooltip>
    )
}

