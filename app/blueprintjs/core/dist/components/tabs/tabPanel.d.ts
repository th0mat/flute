import * as React from "react";
import { IProps } from "../../common/props";
export interface ITabPanelProps extends IProps {
    /**
     * Element ID.
     */
    _id?: string;
    /**
     * The ID of the tab this panel corresponds to.
     */
    _tabId?: string;
}
export declare class TabPanel extends React.Component<ITabPanelProps, {}> {
    displayName: string;
    render(): JSX.Element;
}
export declare const TabPanelFactory: React.ComponentFactory<ITabPanelProps & {
    children?: React.ReactNode;
}, TabPanel>;
