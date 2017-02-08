import { AbstractComponent } from "../../common/abstractComponent";
import { Position } from "../../common/position";
import { IProps } from "../../common/props";
import { IToastProps } from "./toast";
export declare type IToastOptions = IToastProps & {
    key?: string;
};
export interface IToaster {
    /** Show a new toast to the user. Returns the unique key of the new toast. */
    show(props: IToastProps): string;
    /**
     * Updates the toast with the given key to use the new props.
     * Updating a key that does not exist is effectively a no-op.
     */
    update(key: string, props: IToastProps): void;
    /** Dismiss the given toast instantly. */
    dismiss(key: string): void;
    /** Dismiss all toasts instantly. */
    clear(): void;
    /** Returns the props for all current toasts. */
    getToasts(): IToastOptions[];
}
export interface IToasterProps extends IProps {
    /**
     * Whether a toast should acquire application focus when it first opens.
     * This is disabled by default so that toasts do not interrupt the user's flow.
     * Note that `enforceFocus` is always disabled for `Toaster`s.
     * @default false
     */
    autoFocus?: boolean;
    /**
     * Whether pressing the `esc` key should clear all active toasts.
     * @default true
     */
    canEscapeKeyClear?: boolean;
    /**
     * Whether the toaster should be rendered inline or into a new element on `document.body`.
     * If `true`, then positioning will be relative to the parent element.
     * @default false
     */
    inline?: boolean;
    /**
     * Position of `Toaster` within its container. Note that `LEFT` and `RIGHT` are disallowed
     * because Toaster only supports the top and bottom edges.
     * @default Position.TOP
     */
    position?: Position;
}
export interface IToasterState {
    toasts: IToastOptions[];
}
export declare class Toaster extends AbstractComponent<IToasterProps, IToasterState> implements IToaster {
    static defaultProps: IToasterProps;
    /**
     * Create a new `Toaster` instance that can be shared around your application.
     * The `Toaster` will be rendered into a new element appended to the given container.
     */
    static create(props?: IToasterProps, container?: HTMLElement): IToaster;
    state: {
        toasts: IToastOptions[];
    };
    private toastId;
    show(props: IToastProps): string;
    update(key: string, props: IToastProps): void;
    dismiss(key: string, timeoutExpired?: boolean): void;
    clear(): void;
    getToasts(): IToastOptions[];
    render(): JSX.Element;
    protected validateProps(props: IToasterProps): void;
    private renderToast(toast);
    private getPositionClasses();
    private getDismissHandler;
    private handleClose;
}
