import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IActionProps, IIntentProps, IProps } from "../../common/props";
export interface IToastProps extends IProps, IIntentProps {
    /**
     * Action to display in a minimal button. The toast is dismissed automatically when the
     * user clicks the action button. Note that the `intent` prop is ignored (the action button
     * cannot have its own intent color that might conflict with the toast's intent). Omit this
     * prop to omit the action button.
     */
    action?: IActionProps;
    /** Name of icon to appear before message. Specify only the part of the name after `pt-icon-`. */
    iconName?: string;
    /** Message to display in the body of the toast. */
    message: string | JSX.Element;
    /**
     * Callback invoked when the toast is dismissed, either by the user or by the timeout.
     * The value of the argument indicates whether the toast was closed because the timeout expired.
     */
    onDismiss?: (didTimeoutExpire: boolean) => void;
    /**
     * Milliseconds to wait before automatically dismissing toast.
     * Providing a value <= 0 will disable the timeout (this is discouraged).
     * @default 5000
     */
    timeout?: number;
}
export declare class Toast extends AbstractComponent<IToastProps, {}> {
    static defaultProps: IToastProps;
    displayName: string;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IToastProps): void;
    componentWillUnmount(): void;
    private maybeRenderActionButton();
    private maybeRenderIcon();
    private handleActionClick;
    private handleCloseClick;
    private triggerDismiss(didTimeoutExpire);
    private startTimeout;
}
export declare const ToastFactory: React.ComponentFactory<IToastProps & {
    children?: React.ReactNode;
}, Toast>;
