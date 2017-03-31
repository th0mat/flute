import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {shell} from 'electron';
import AddMac from './addMac';
import * as actions from '../actions/appState';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';


const SortableItem = SortableElement(({value}) =>
    <li style={{listStyleType: 'none'}}>{value}</li>
);


const SortableList = SortableContainer(({items}) => {
    return (
        <ul id="flProfilesList">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
        </ul>
    )
});


const props = (store) => {
    return {
        targets: store.appState.targets,
        appDir: store.appState.appDir,
        userDir: store.appState.userDir
    };
};

class ProfileSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.initialItemList(),
            targets: this.props.targets
        };
    }

    componentWillUnmount() {
    };


    onSortEnd = ({oldIndex, newIndex}) => {
        let sorted = arrayMove(this.state.targets, oldIndex, newIndex);
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
            targets: sorted
        });
        this.props.dispatch(actions.postTargetChanges(sorted));
    }


    initialItemList() {
        const check = <span style={{color: "grey"}} className="pt-icon pt-icon-small-tick"></span>;
        let items = this.props.targets.map(x => {
            return (
                <div className="flProfilesItem" onClick={()=>browserHistory.push('/profile/' + x.macHex)}>
                    <img
                        className="flProfilesPix"
                        src={this.props.userDir + x.avatar}
                        alt={x.dname}/>
                    <div className="flPIName">{x.dname}</div>
                    <div className="flPIMac" style={{fontFamily: "monospace"}}>{x.macHex}</div>
                    <div className="flPIFlags">{x.onMonitor ?
                        <span className="pt-icon pt-icon-people"></span> : ""}</div>
                    <div className="flPIFlags">{x.onLogs ?
                        <span className="pt-icon pt-icon-sort"></span> : ""}</div>
                    <div className="flPIFlags">{x.notifyGone || x.notifyBack ?
                        <span className="pt-icon pt-icon-notifications"></span> : ""}</div>
                </div>
            )
        })
        return items;
    }


    noTargetsMsg() {
        return <div style={{paddingRight: '10px'}}><br/><h4>No profiles to display yet</h4><p>Learn how to add,
        change or remove profiles:</p>
            <p style={{cursor: 'pointer', color: 'blue'}}
               onClick={()=>shell.openExternal("https://packetmozart.com/how-to-videos/")}>
                how-to videos</p>
            <br/><br/>
            <img src={this.props.appDir + '/assets/img/noteBirds.png'}
                 style={{height: '50px', width: '50px', margin: 'auto', display: 'block'}} alt=""/>
        </div>
    }

    render() {
        const targets = this.props.targets;
        const check = <span style={{color: "grey"}} className="pt-icon pt-icon-small-tick"></span>;

        return (
            <div className="flContentFrame">

                <div className="flContentFrozenTop" style={{maxWidth: '500px'}}>
                    <h3 id="title">Edit Profiles</h3>
                    <p>Profiles make it easier to recognize known devices. They are required for life
                            monitoring and only registered profiles appear in logs.
                    </p>

                    <div>
                        <AddMac buttonName='add device' destination="/profile/" invalidMsg="invalid mac address"/>
                        <br/><br/>
                    </div>

                <p>Drag and drop profiles to change the sorting order. Click on a profile to change its
                settings or delete it.</p>

                </div>


                <div className="flContent">

                <div id="flPILegend">
                    <span className="pt-icon pt-icon-people"> live monitor&nbsp;&nbsp;&nbsp;</span>
                    <span className="pt-icon pt-icon-sort"> activity log&nbsp;&nbsp;&nbsp;</span>
                    <span className="pt-icon pt-icon-notifications"> notifications</span>
                </div>

                    {this.props.targets.length == 0
                        ? this.noTargetsMsg()
                        : <SortableList items={this.state.items}
                                        onSortEnd={this.onSortEnd}
                                        useWindowAsScrollContainer={true}
                                        pressDelay={150}/>
                    }

                 </div>

            </div>
        )
    }

}



export default connect(props)(ProfileSelect);