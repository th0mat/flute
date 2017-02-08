import * as React from "react";
import { IIntentProps, IProps } from "../../common/props";
export interface IProgressBarProps extends IProps, IIntentProps {
    /**
     * A value between 0 and 1 (inclusive) representing how far along the operation is.
     * Values below 0 or above 1 will be interpreted as 0 or 1, respectively.
     * Omitting this prop will result in an "indeterminate" progress meter that fills the entire bar.
     */
    value?: number;
}
export declare class ProgressBar extends React.Component<IProgressBarProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const ProgressBarFactory: React.ComponentFactory<IProgressBarProps & {
    children?: React.ReactNode;
}, ProgressBar>;
