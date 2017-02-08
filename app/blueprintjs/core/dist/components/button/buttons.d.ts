import * as React from "react";
import { IActionProps } from "../../common/props";
export interface IButtonProps extends IActionProps {
    /** A ref handler that receives the native HTML element backing this component. */
    elementRef?: (ref: HTMLElement) => any;
    /** Name of icon (the part after `pt-icon-`) to add to button. */
    rightIconName?: string;
}
export declare class Button extends React.Component<React.HTMLProps<HTMLButtonElement> & IButtonProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const ButtonFactory: React.ComponentFactory<React.HTMLProps<HTMLButtonElement> & IButtonProps & {
    children?: React.ReactNode;
}, Button>;
export declare class AnchorButton extends React.Component<React.HTMLProps<HTMLAnchorElement> & IButtonProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const AnchorButtonFactory: React.ComponentFactory<React.HTMLProps<HTMLAnchorElement> & IButtonProps & {
    children?: React.ReactNode;
}, AnchorButton>;
