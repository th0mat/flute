import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import fs from 'fs';
import tooltipButton from '../utils/tooltipButton';
import {store} from '../index';
import {ContextMenu, MenuFactory, MenuItemFactory, Intent} from '@blueprintjs/core';

import * as actions from '../actions/appState';
import {moveTo, backOne} from '../utils/nav';
import titleCase from '../utils/titleCaseOui';
import {remote} from 'electron';

const logger = remote.getGlobal('sharedObj').logger;


const props = (store) => {
    return {
        userDir: store.appState.userDir,
        targets: store.appState.targets,
        oui: store.appState.oui,
        imageBank: store.appState.imageBank,
    };
};


class ProfileCf extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.targets.indexOf(this.props.targets.find(x => x.macHex === this.props.mac)) === -1) {
            this.index = this.props.targets.length; // one after the last current target
            this.target = {
                macHex: this.props.mac,
                dname: 'Incognito',
                avatar: 'img/Incognito.jpg',
                notifyBack: false,
                notifyGone: false,
                onMonitor: true,
                onLogs: true,
            };
            this.state = {
                targetIndex: this.index, target: this.target, file: null, fileMsg: ''
            }
        } else {
            this.state = {
                targetIndex: this.props.targets.indexOf(this.props.targets.find(x => x.macHex === this.props.mac)),
                target: JSON.parse(JSON.stringify(this.props.targets.find(x => x.macHex === this.props.mac))),
                file: null, fileMsg: ''
            };
        }
        this.saveChanges = this.saveChanges.bind(this);
        this.removeTarget = this.removeTarget.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMacChange = this.handleMacChange.bind(this);
        this.validateMac = this.validateMac.bind(this);
        this.previewFile = this.previewFile.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.handleCheckboxes = this.handleCheckboxes.bind(this);
        this.swapImg = this.swapImg.bind(this);

    }


    cancelChanges() {
        backOne();
    }


    swapImg(e) {
        let target;
        try {
            target = JSON.parse(JSON.stringify(this.state.target));
        } catch (e) {
            logger.error("*** parsing error at swapImg/profileCf: ", e)
        }
        target.avatar = 'img/' + e.target.name;
        this.setState({target: target});
        this.setState({file: null});
    }

    handleChange(e) {
        let updated = this.state.target;
        updated[e.target.name] = e.target.value;
        this.setState({target: updated});
    }

    removeTarget() {
        if (this.state.targetIndex === this.props.targets.length) {
            // not in the target list yet anyhow, so nothing to do
        } else {
            let targets;
            try {
                targets = JSON.parse(JSON.stringify(this.props.targets));
            } catch (e) {
                logger.error("*** parse error at removeTarget/profileCf: ", e)
            }
            targets.splice(this.state.targetIndex, 1);
            this.props.dispatch(actions.postTargetChanges(targets))
        }
        browserHistory.go(-1);
    }

    previewFile() {
        this.setState({fileMsg: ''}); // remove msg from previous try
        const MAX_FILE_SIZE = 500000;
        const preview = document.querySelector('.flProfilePix');
        const file = document.querySelector('input[type=file]').files[0];
        if (!file.type.match('image.*')) {
            const msg = file.name + ' is not an image file';
            this.setState({fileMsg: msg, file: null}); // ensure file is not saved
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            const msg = file.name + ' is larger than 500kb';
            this.setState({fileMsg: msg, file: null}); // ensure fle is not saved
            return;
        }
        const reader = new FileReader();
        const that = this;
        reader.addEventListener("load", function () {
            preview.src = reader.result;
            that.setState({file: file});
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }


    saveChanges() {

        if (!this.validateMac(this.state.target.macHex)) {
            Toaster.show({intent: Intent.WARNING, message: "enter a valid mac address"});
            return;
        }
        let updated;
        try {
            updated = JSON.parse(JSON.stringify(this.props.targets));
        } catch (e) {
            logger.error("*** parse error at saveChanges/profileCf: ", e)
        }
        // wait with router change until store has updated
        updated[this.state.targetIndex] = this.state.target;
        const unsubscribe = store.subscribe(()=>{
            const current = store.getState().appState.targets;
            if (current === updated) {
            unsubscribe();
            browserHistory.go(-1)
            }
        })

        // upload image and post target changes
        if (this.state.file !== null) {  // avatar has changed
            this.props.dispatch(actions.uploadProfileImage(this.state.file, this.state.targetIndex, updated));
            this.props.dispatch(actions.loadImgBank());
        } else {
            // target changes only
            this.props.dispatch(actions.postTargetChanges(updated));
        }
        // setTimeout(browserHistory.go.bind(this, -1), 200);
    }

    goHistoryHandler(route, mac) {
        moveTo(route, mac, 'profile/' + mac)

    }

    handleCheckboxes(e) {
        let reformed = {...this.state.target};
        reformed[e.target.value] = !reformed[e.target.value];
        this.setState({target: reformed});
    }

    // remove image from folder and replace remaining links to that picture with links to Incognito.jpg
    // Incognito.jpg cannot be deleted => it is filtered out from the image bank
    deleteImg(imgPath) {
        logger.info("*** we are going to delete: ", imgPath)
        fs.unlink(imgPath, (err) => {
            if (err) {
                logger.error("*** error deleting image: ", err);
                return;
            }
            let imgName = 'img' + imgPath.substr(imgPath.lastIndexOf('/'));
            let dirty = false;
            let newTargets = this.props.targets.map(x => {
                if (imgName == x.avatar) {
                    x.avatar = 'img/Incognito.jpg';
                    dirty = true;
                }
                return x;
            });
            // update currently displayed profile if pix happens to be the one being deleted
            if (this.state.target.avatar === imgName) {
                let updated = {...this.state.target};
                updated.avatar = 'img/Incognito.jpg';
                this.setState({target: updated});
            }
            if (dirty) this.props.dispatch(actions.postTargetChanges(newTargets));
            this.props.dispatch(actions.loadImgBank());
        });
    }

    handleMacChange(e) {
        let updated = this.state.target;
        updated[e.target.name] = this.strip(e.target.value);
        this.setState({target: updated});
    }



    strip(mac){
        const small = mac.toLowerCase();
        const arr = small.split("");
        const filtered = arr.filter((x)=>{
            return (x >= 'a' && x <= 'f') || (x >= 0 && x <= 9 );
        });
        return filtered.join('');
    }


    validateMac(mac) {
        if (~mac.search(/[^a-f0-9A-F\.:-]/)) return false;
        return this.strip(mac).length === 12;
    }



    render() {


        // var found = this.target();
        return (
            <div className="flContentFrame">

                <div className="flContentFrozenTop">
                    <img onClick={this.cancelChanges} src={this.props.userDir + this.state.target.avatar}
                         className="flProfilePix"/>
                    <div>
                        <input className="pt-text-muted" style={{fontSize: 'x-large', fontWeight: 'bold',
                        display: 'block', width: "200px"}}
                               name="dname" value={this.state.target.dname} type="text"
                               onChange={this.handleChange}/>
                        <br/>
                        <input name="macHex" value={this.state.target.macHex} type="text"
                               onChange={this.handleMacChange}/><br/>
                        <p>
                            <small>{this.validateMac(this.state.target.macHex)
                                ? titleCase(this.props.oui[this.state.target.macHex.substr(0, 6)])
                               : <span style={{color: "orange"}}>invalid mac address</span>}</small>
                        </p>


                        <div style={{marginTop: "20px", clear: "left"}}>
                            <table>
                                <tbody>


                                <tr>
                                    <td style={{verticalAlign: "top"}}>
                                        <input type="checkbox" value="onMonitor" onChange={this.handleCheckboxes}
                                               checked={this.state.target.onMonitor}/>
                                    </td>
                                    <td><span className="pt-icon pt-icon-people"/> profile appears on monitor view</td>
                                </tr>

                                <tr>
                                    <td style={{verticalAlign: "top"}}>
                                        <input type="checkbox" value="onLogs" onChange={this.handleCheckboxes}
                                               checked={this.state.target.onLogs}/>
                                    </td>
                                    <td><span className="pt-icon pt-icon-sort"/> profile is included in activity logs</td>
                                </tr>

                                <tr>
                                    <td style={{verticalAlign: "top"}}>
                                        <input type="checkbox" value="notifyBack" onChange={this.handleCheckboxes}
                                               checked={this.state.target.notifyBack}/>
                                    </td>
                                    <td><span className="pt-icon pt-icon-notifications"/> a notification is triggered when this profile appears
                                    again after an absence
                                    </td>
                                </tr>

                                <tr>
                                    <td style={{verticalAlign: "top"}}>
                                        <input type="checkbox" value="notifyGone" onChange={this.handleCheckboxes}
                                               checked={this.state.target.notifyGone}/>
                                    </td>
                                    <td><span className="pt-icon pt-icon-notifications"/> a notification is triggered if no traffic has been
                                    observed for this profile for a set period
                                    </td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div style={{marginTop: "20px"}}>

                        {tooltipButton("history", "pt-icon-history", "/history/" + this.props.mac)}

                        <span>&nbsp;&nbsp;</span>
                        {tooltipButton("undo changes", "pt-icon-undo", this.cancelChanges)}

                        <span>&nbsp;&nbsp;</span>
                        {tooltipButton("remove profile", "pt-icon-trash", this.removeTarget.bind(this))}

                        <span>&nbsp;&nbsp;</span>
                        {tooltipButton("save changes", "pt-icon-floppy-disk", this.saveChanges)}

                    </div>
                    <br/>
                    <h4>Upload new picture or select below</h4>


                    <input type="file" onChange={this.previewFile}/>
                    <br/>
                    <span style={{color: 'red'}}>{this.state.fileMsg}</span>
                </div>

                <div className="flContent">
                    {this.props.imageBank
                        .filter(x => x != 'Incognito.jpg')
                        .filter(x => x != 'MagicFlute.jpg')
                        .map(x => {
                            return (
                                <img src={this.props.userDir + "img/" + x} key={x} className="flBankPix" name={x}
                                     onClick={this.swapImg} onContextMenu={(rightClick)=>{
                    rightClick.preventDefault();
                    let imgPath = rightClick.target.getAttribute('src');
                    {/*let that = this;*/}
                    ContextMenu.show(MenuFactory({
                        children: [

                            MenuItemFactory({ key: 'b', onClick: (j)=>{this.deleteImg(imgPath)}, text: "Delete picture" })
                        ]}),
                         { left: rightClick.clientX, top: rightClick.clientY},
                          ()=>{} );
                    this.setState({isContextMenuOpen: true});
                }}/>
                            )

                        })}


                </div>
                <br/>

            </div>
        )
    }

}
;

const menu = MenuFactory({
    children: [
        MenuItemFactory({
            key: 'a', onClick: (e) => {
                logger.info("*** click save: ", e.target)
            }, text: "Select"
        }),
        MenuItemFactory({
            key: 'b', onClick: () => {
            }, text: "Delete"
        }),
    ]
});


export default connect(props)(ProfileCf);