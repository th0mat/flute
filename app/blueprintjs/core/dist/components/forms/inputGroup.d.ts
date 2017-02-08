import * as React from "react";
import { HTMLInputProps, IControlledProps, IIntentProps, IProps } from "../../common/props";
export interface IInputGroupProps extends IControlledProps, IIntentProps, IProps {
    /**
     * Whether the input is non-interactive.
     * Note that `rightElement` must be disabled separately; this prop will not affect it.
     * @default false
     */
    disabled?: boolean;
    /** Ref handler that receives HTML `<input>` element backing this component. */
    inputRef?: (ref: HTMLInputElement) => any;
    /** Name of icon (the part after `pt-icon-`) to render on left side of input. */
    leftIconName?: string;
    /** Placeholder text in the absence of any value. */
    placeholder?: string;
    /**
     * Element to render on right side of input.
     * For best results, use a minimal button or a tag.
     */
    rightElement?: JSX.Element;
    /**
     * HTML `input` type attribute.
     * @default "text"
     */
    type?: string;
}
export interface IInputGroupState {
    rightElementWidth?: number;
}
export declare class InputGroup extends React.Component<HTMLInputProps & IInputGroupProps, IInputGroupState> {
    static displayName: string;
    state: IInputGroupState;
    private rightElement;
    private refHandlers;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private maybeRenderRightElement();
    private updateInputWidth();
}
export declare const InputGroupFactory: React.ComponentFactory<React.HTMLProps<HTMLInputElement> & IInputGroupProps & {
    children?: React.ReactNode;
}, InputGroup>;
