import * as React from "react";
import { IProps } from "../../common/props";
export interface ITabProps extends IProps {
    /**
     * Whether the tab is disabled.
     * @default false
     */
    isDisabled?: boolean;
}
export declare class Tab extends React.Component<ITabProps, {}> {
    static defaultProps: ITabProps;
    displayName: string;
    render(): JSX.Element;
}
export declare const TabFactory: React.ComponentFactory<ITabProps & {
    children?: React.ReactNode;
}, Tab>;
