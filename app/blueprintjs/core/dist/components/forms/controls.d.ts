import * as React from "react";
import { IProps } from "../../common/props";
export interface IControlProps extends IProps {
    /** Whether the control is checked. */
    checked?: boolean;
    /** Whether the control is initially checked (uncontrolled) */
    defaultChecked?: boolean;
    /** Ref handler that receives HTML `<input>` element backing this component. */
    inputRef?: (ref: HTMLInputElement) => any;
    /** Text label for control. */
    label?: string;
    /** Event handler invoked when input value is changed */
    onChange?: React.FormEventHandler<HTMLInputElement>;
}
/** Base Component class for all Controls */
export declare class Control<P extends IControlProps> extends React.Component<React.HTMLProps<HTMLInputElement> & P, {}> {
    protected renderControl(type: "checkbox" | "radio", typeClassName: string, inputRef?: (ref: HTMLInputElement) => any): JSX.Element;
}
export interface ICheckboxProps extends IControlProps {
    /** Whether this checkbox is initially indeterminate (uncontrolled) */
    defaultIndeterminate?: boolean;
    /** Whether this checkbox is indeterminate */
    indeterminate?: boolean;
}
export declare class Checkbox extends Control<ICheckboxProps> {
    static displayName: string;
    private input;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private updateIndeterminate();
    private handleInputRef;
}
export interface ISwitchProps extends IControlProps {
}
export declare class Switch extends Control<ISwitchProps> {
    static displayName: string;
    render(): JSX.Element;
}
export interface IRadioProps extends IControlProps {
}
export declare class Radio extends Control<IRadioProps> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const CheckboxFactory: React.ComponentFactory<React.HTMLProps<HTMLInputElement> & ICheckboxProps & {
    children?: React.ReactNode;
}, Checkbox>;
export declare const SwitchFactory: React.ComponentFactory<React.HTMLProps<HTMLInputElement> & ISwitchProps & {
    children?: React.ReactNode;
}, Switch>;
export declare const RadioFactory: React.ComponentFactory<React.HTMLProps<HTMLInputElement> & IRadioProps & {
    children?: React.ReactNode;
}, Radio>;
