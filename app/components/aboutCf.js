import React from 'react';
import {connect} from 'react-redux';
import {shell} from 'electron';

const props = (store) => {
    return {
        appDir: store.appState.appDir
    };
};


class AboutCf extends React.Component {


    render() {
        return (
            <div className="flContentFrame">

                <div className="flContent">

                    <br/>


                    <h4>How to get started?</h4>
                    <p>Watch the <span className="flAboutLink"
                           onClick={()=>{shell.openExternal("https://www.packetmozart.com/how-to-videos/")}}>
                        videos</span>. MagicFlute is so easy to use, you will not need a manual.</p>

                    <h4>What is MagicFlute good for?</h4>
                    <p>Watch the YouTube videos. It will give you some ideas. Mothers use it to monitor
                    what their kids are doing. Engineers use it as a tool to better understand which devices
                    consume
                    the available wifi bandwidth. Security applications make use of the presence detection and
                    recording functionality of MagicFlute.</p>

                    <h4>What is MagicFlute not good for?</h4>
                    <p>MagicFlute cannot be used to see which websites someone visits. It can also not be used
                    to read email messages, see pictures or decode any other content going over wifi.
                    MagicFlute only notes that
                    communication takes place and how much of it. It feeds exclusively on meta data.</p>

                    <h4>How does it work?</h4>
                    <p>Mainly magic but putting the wifi card in monitor mode helps too. Want to know more?
                     I recommend reading 'Monitor mode' on Wikipedia. By the way, did you know
                    that many phones emit wifi signals even when wifi is turned off? </p>

                    <h4>Can this be legal?</h4>
                    <p>No idea. Big companies sell similar software for all sorts of debatable
                    applications, so the correct answer is probably 'it depends'. If you find out that it
                    is illegal where you are, delete MagicFlute immediately and never mention my name. If you use
                    MagicFlute at home to check if your daughter is watching videos online or doing
                    her homework, you are probably ok. MagicFlute does not analyze the
                    payload of wifi traffic or store any of the wifi packets it observes - it just
                    counts them. So how can you know that the kids are still watching YouTube at midnight?
                    It is explained in the videos linked to above.</p>

                    <h4>Black dot in the wifi symbol</h4>
                    <p><img src={this.props.appDir + 'assets/img/monitorMode.png'} alt=""/> The
                    black dot in the wifi symbol on your title bar indicates that the wifi adapter
                    in your computer is in monitor mode. You can turn monitor mode off on the MagicFlute
                    dashboard by turning off the logging system. Reversely, when you don't see that black dot,
                    you know that your logging system is off and not recording traffic data. When you look
                    up the history of a device later, this period will be shown as 'system down'.</p>

                    <h4>Internet connection lost</h4>
                    <p>It happens. A bit of an annoyance is that you cannot connect again while the
                    logging system is running. To make this easy and to not forget to turn on the
                    logging system again after you reconnected to the Internet, there is a button on
                    the dashboard to turn the logging system off for 60 seconds and then turn it
                    on again automatically. If 60 seconds are not long enough you are too slow.</p>

                    <h4>Quitting MagicFlute</h4>
                    <p>MagicFlute will continue to record all traffic after you quit if you want it to.
                    The logging system does that if you configure it accordingly. Go to settings
                    and configure it the way you like.</p>

                    <h4>Stopping the logging system</h4>
                    <p>The logging system is an independent program running in the background. What to
                    do if you closed MagicFlute and the logging system is still running and you want
                    to stop it? Easy. Open MagicFlute again and turn the logging system off via the
                    dashboard. Then quit MagicFlute. Too bad you can't read this when MagicFlute is closed.
                    </p>

                    <h4>Notifications</h4>
                    <p>Notifications only work when MagicFlute is running and the logging system is
                    turned on. Email notifications only work if the internet connection is working.</p>

                    <h4>Still unclear?</h4>
                    <p>Think of it this way. There are two programs. One, that's Papageno, records all
                    traffic data in a little database. The other program, that's MagicFlute, provides a
                    user interface. It is a little confusing at first. If you have a question,
                    send it to <span onClick={()=>{shell.openExternal("https://www.packetmozart.com/contact/")}}
                                     className="flAboutLink">th.natter@gmail.com</span> and I will try to help.</p>

                    <h4>How to uninstall</h4>
                    <p>Just delete the MagicFlute app in the Applications folder. Your user data is kept
                    in the MagicFlute directory of the Library folder, in case you want to make
                    back-ups or delete your own data too.</p>

                    <h4>Pricing</h4>
                    <p>Relax, it's free. I might charge indecent amounts for later versions but for
                    now I keep my day job. If you want to help me in my quest to build something useful,&nbsp;
                        <span onClick={()=>{shell.openExternal("https://www.packetmozart.com/contact/")}}
                          className="flAboutLink">let me know</span>&nbsp;what does not work as it should.
                          Oh yes, that would be very helpful.</p>

                    <h4>What is PacketMozart?</h4>
                    <p>It's just a silly domain name that was available. MagicFlute wasn't.
                    That domain should belong to Mozart, who wrote an opera with that name, but someone
                    else was faster. Did I mention that the logging
                    system which does the wifi packet catching in the background is named Papageno? The Papageno
                    character in Mozart's opera plays the flute to catch birds. If you write software,
                    you can give it silly names too.</p>

                    <p>Servus</p>


                </div>
            </div>
        )
    }

};


export default connect(props)(AboutCf)