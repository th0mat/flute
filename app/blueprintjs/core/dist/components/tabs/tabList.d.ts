import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IProps } from "../../common/props";
export interface ITabListProps extends IProps {
}
export interface ITabListState {
    /**
     * Whether the animation should be run when transform changes.
     */
    shouldAnimate?: boolean;
}
export declare class TabList extends AbstractComponent<ITabListProps, {}> {
    displayName: string;
    state: ITabListState;
    render(): JSX.Element;
    componentDidUpdate(prevProps: ITabListProps): void;
}
export declare const TabListFactory: React.ComponentFactory<ITabListProps & {
    children?: React.ReactNode;
}, TabList>;
