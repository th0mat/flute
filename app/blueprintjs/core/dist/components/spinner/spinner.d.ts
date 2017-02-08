import * as React from "react";
import { IIntentProps, IProps } from "../../common/props";
export interface ISpinnerProps extends IProps, IIntentProps {
    /**
     * A value between 0 and 1 (inclusive) representing how far along the operation is.
     * Values below 0 or above 1 will be interpreted as 0 or 1 respectively.
     * Omitting this prop will result in an "indeterminate" spinner where the head spins indefinitely.
     */
    value?: number;
}
export declare class Spinner extends React.Component<ISpinnerProps, {}> {
    static displayName: string;
    render(): JSX.Element;
    protected renderContainer(classes: string, content: JSX.Element): JSX.Element;
}
export declare const SpinnerFactory: React.ComponentFactory<ISpinnerProps & {
    children?: React.ReactNode;
}, Spinner>;
