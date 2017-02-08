import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IProps } from "../../common/props";
export interface ITabsProps extends IProps {
    /**
     * The index of the initially selected tab when this component renders.
     * This prop has no effect if `selectedTabIndex` is also provided.
     * @default 0
     */
    initialSelectedTabIndex?: number;
    /**
     * The index of the currently selected tab.
     * Use this prop if you want to explicitly control the currently displayed panel
     * yourself with the `onChange` event handler.
     * If this prop is left undefined, the component changes tab panels automatically
     * when tabs are clicked.
     */
    selectedTabIndex?: number;
    /**
     * A callback function that is invoked when tabs in the tab list are clicked.
     */
    onChange?(selectedTabIndex: number, prevSelectedTabIndex: number): void;
}
export interface ITabsState {
    /**
     * The list of CSS rules to use on the indicator wrapper of the tab list.
     */
    indicatorWrapperStyle?: React.CSSProperties;
    /**
     * The index of the currently selected tab.
     * If a prop with the same name is set, this bit of state simply aliases the prop.
     */
    selectedTabIndex?: number;
}
export declare class Tabs extends AbstractComponent<ITabsProps, ITabsState> {
    static defaultProps: ITabsProps;
    displayName: string;
    state: ITabsState;
    private panelIds;
    private tabIds;
    constructor(props?: ITabsProps, context?: any);
    render(): JSX.Element;
    componentWillReceiveProps(newProps: ITabsProps): void;
    componentDidMount(): void;
    componentDidUpdate(_: ITabsProps, prevState: ITabsState): void;
    protected validateProps(props: ITabsProps & {
        children?: React.ReactNode;
    }): void;
    private handleClick;
    private handleKeyPress;
    private handleKeyDown;
    private handleTabSelectingEvent;
    /**
     * Calculate the new height, width, and position of the tab indicator.
     * Store the CSS values so the transition animation can start.
     */
    private moveIndicator({clientHeight, clientWidth, offsetLeft, offsetTop});
    /**
     * Most of the component logic lives here. We clone the children provided by the user to set up refs,
     * accessibility attributes, and selection props correctly.
     */
    private getChildren();
    private cloneTabList(child);
    private cloneTabPanel(child, tabIndex);
    private focusTab(index);
    private getFocusedTabIndex();
    private getTabs();
    private getTabsCount();
    private getPanelsCount();
    private getStateFromProps(props);
    private isTabDisabled(index);
    private isValidTabIndex(index);
    /**
     * Updates the component's state if uncontrolled and calls onChange.
     */
    private setSelectedTabIndex(index);
}
export declare const TabsFactory: React.ComponentFactory<ITabsProps & {
    children?: React.ReactNode;
}, Tabs>;
