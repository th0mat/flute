import * as React from "react";
import { IProps } from "../../common/props";
export interface IMenuProps extends IProps {
}
export declare class Menu extends React.Component<IMenuProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const MenuFactory: React.ComponentFactory<IMenuProps & {
    children?: React.ReactNode;
}, Menu>;
