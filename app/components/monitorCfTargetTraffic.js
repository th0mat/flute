import React from 'react';




// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
const palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
    "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();



export default React.createClass({

    render() {

        const traffic = this.props.traffic;
        const colors = traffic.map(x => {
            if (x === 0) return '#F8F8F8'; // same as navbar
            if (x <= 1000) return palette[1];
            if (x <= 10000) return palette[2];
            if (x <= 100000) return palette[3];
            if (x <= 500000) return palette[4];
            if (x <= 1000000) return palette[5];
            if (x <= 5000000) return palette[6];
            if (x <= 10000000) return palette[7];
            if (x <= 50000000) return palette[8];
            if (x <= 100000000) return palette[9];
            if (x <= 500000000) return palette[10];
            return palette[11];
        });



        return (
            <div className="flTargetTraffic">

                    <div className="flTargetSec" style={{background: colors[0]}} ></div>
                    <div className="flTargetSec" style={{background: colors[1]}} ></div>
                    <div className="flTargetSec" style={{background: colors[2]}} ></div>
                    <div className="flTargetSec" style={{background: colors[3]}} ></div>
                    <div className="flTargetSec" style={{background: colors[4]}} ></div>
                    <div className="flTargetSec" style={{background: colors[5]}} ></div>
                    <div className="flTargetSec" style={{background: colors[6]}} ></div>
                    <div className="flTargetSec" style={{background: colors[7]}} ></div>
                    <div className="flTargetSec" style={{background: colors[8]}} ></div>
                    <div className="flTargetSec" style={{background: colors[9]}} ></div>
                    <div className="flTargetSec" style={{background: colors[10]}} ></div>
                    <div className="flTargetSec" style={{background: colors[11]}} ></div>

            </div>

        );

    }
});

