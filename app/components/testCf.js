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

// const DragHandle = SortableHandle(() => <span style={{cursor: 'grab'}}>:::::</span>); // This can be any component you want

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
            items: this.initialItemList()
            //items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
        };
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        console.log("*** oldIndex", oldIndex);
        console.log("*** newIndex", newIndex);
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    }

    initialItemList() {
        const check = <span style={{color: "grey"}} className="pt-icon pt-icon-small-tick"></span>;
        let items = this.props.targets.map(x => {
            return (
                <div className="flProfilesItem" onClick={()=>browserHistory.push('/profile/' + x.macHex)}>
                    <img
                        className="flProfilesPix"
                        src={this.props.userDir + x.avatar}
                        alt={x.dname}
                    />
                    <div style={{
                        display: 'inline'
                    }}>
                        <div className="flPIName">{x.dname}</div>
                        <div className="flPIMac" style={{fontFamily: "monospace"}}>{x.macHex}</div>
                        <div className="flPIFlags"><span>{x.onMonitor ? check : ""}</span>
                            <span>{x.onLogs ? check : ""}</span>
                            <span>{(x.notifyGone || x.notifyBack) ? check : ""}</span>
                        </div>
                    </div>
                </div>
            )
        })
        return items;
    }


    arrowClick(mac, direction) {
        // get targets
        const targets = this.props.targets;
        // find target
        const target = targets.find((x) => {
            return x.macHex === mac
        });
        // update sortOrder
        target.sortOrder += direction;
        // sort by sortOrder
        const sorted = targets.sort((x, y) => {
            return x.sortOrder - y.sortOrder
        });
        // update sortOrder field to index
        const updated = sorted.map((x, i) => {
            x.sortOrder = i;
            return x;
        });
        // dispatch targets
        this.props.dispatch(actions.postTargetChanges(updated));
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

                <div className="flContentFrozenTop">
                    <h3>Edit Profiles</h3>
                    <p>Profiles make it easier to recognize known devices. They are required for life
                            monitoring and only registered profiles appear in logs.
                    </p>

                    <div>
                        <AddMac buttonName='add device' destination="/profile/" invalidMsg="invalid mac address"/>
                        <br/>
                    </div>

                </div>


                <div className="flContent">

                    <SortableList items={this.state.items}
                                  onSortEnd={this.onSortEnd}
                                  useWindowAsScrollContainer={true}
                        //useDragHandle={true}
                                  pressDelay={200}
                    />

                </div>

            </div>
        )
    }

}
;


export default connect(props)(ProfileSelect);