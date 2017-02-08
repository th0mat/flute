/**
 * Created by thomasnatter on 8/25/16.
 */

import React from 'react';


const gone = '#F8F8F8';
const sysDown = '#fcd276';
const notYet = 'skyBlue';


export default class LegendHistory extends React.Component {


    render() {

        return (
            <div className="flLegendHistory">
                <div style={{width: "auto"}}>
                    <div className="flLegendColor" style={{background: sysDown}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;system down&nbsp;&nbsp;</small></span>
                    <div className="flLegendColor" style={{background: gone}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;device gone&nbsp;&nbsp;</small></span>
                    <div className="flLegendColor" style={{background: notYet}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;not yet&nbsp;</small></span>
                </div>
                <br/>
            </div>

        );
    }
};

