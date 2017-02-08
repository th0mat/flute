import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IProps } from "../../common/props";
import { IBackdropProps, IOverlayableProps } from "../overlay/overlay";
export interface IDialogProps extends IOverlayableProps, IBackdropProps, IProps {
    /**
     * Toggles the visibility of the overlay and its children.
     * This prop is required because the component is controlled.
     */
    isOpen: boolean;
    /**
     * Name of icon (the part after `pt-icon-`) to appear in the dialog's header.
     * Note that the header will only be rendered if `title` is provided.
     */
    iconName?: string;
    /**
     * Whether to show the close "X" button in the dialog's header.
     * Note that the header will only be rendered if `title` is provided.
     * @default true
     */
    isCloseButtonShown?: boolean;
    /**
     * CSS Styles to apply to the .pt-dialog element.
     * @default {}
     */
    style?: React.CSSProperties;
    /**
     * Title of dialog.
     * If provided, a `.pt-dialog-header` element will be rendered inside the dialog
     * before any children elements.
     * In version 3.0, this prop will be required.
     */
    title?: string | JSX.Element;
}
export declare class Dialog extends AbstractComponent<IDialogProps, {}> {
    static defaultProps: IDialogProps;
    displayName: string;
    render(): JSX.Element;
    protected validateProps(props: IDialogProps): void;
    private maybeRenderCloseButton();
    private maybeRenderHeader();
}
export declare const DialogFactory: React.ComponentFactory<IDialogProps & {
    children?: React.ReactNode;
}, Dialog>;
