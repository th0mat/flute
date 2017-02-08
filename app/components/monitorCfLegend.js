/**
 * Created by thomasnatter on 8/25/16.
 */

import React from 'react';


// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
const palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
    "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();


export default class LegendLive extends React.Component {


    render() {


        return (
            <div className="flLegend">
                <div style={{width: "auto"}}>
                    <span style={{float: 'left'}}><small>less&nbsp;&nbsp;</small></span>
                    <div className="flLegendColor" style={{background: palette[0]}}></div>
                    <div className="flLegendColor" style={{background: palette[1]}}></div>
                    <div className="flLegendColor" style={{background: palette[2]}}></div>
                    <div className="flLegendColor" style={{background: palette[4]}}></div>
                    <div className="flLegendColor" style={{background: palette[5]}}></div>
                    <span style={{float: 'left'}}><small>&nbsp;&nbsp;more&nbsp;</small></span>
                </div>
            </div>

        );
    }
};

