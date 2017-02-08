import * as React from "react";
import { IProps } from "../../common/props";
export interface IMenuDividerProps extends IProps {
    /** Optional header title */
    title?: string;
}
export declare class MenuDivider extends React.Component<IMenuDividerProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const MenuDividerFactory: React.ComponentFactory<IMenuDividerProps & {
    children?: React.ReactNode;
}, MenuDivider>;
