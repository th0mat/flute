import React from 'react';
import {ContextMenuTarget, Menu, MenuItem} from '@blueprintjs/core';


@ContextMenuTarget
export default class ProfileCfBankPix extends React.Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleDelete(){

    }
    handleSelect(){

    }

    renderContextMenu(e) {
        // return a single element, or nothing to use default browser behavior
        return
            <Menu>
                <MenuItem onClick={this.handleSelect} text="Select" />
                <MenuItem onClick={this.handleDelete} text="Delete" />
            </Menu>;
    }


    render() {

        return (
            <img src={this.props.avatar} className="flBankPix" name={this.props.avatar}
                 onClick={this.props.clickfunc}/>
        )
    }

};


