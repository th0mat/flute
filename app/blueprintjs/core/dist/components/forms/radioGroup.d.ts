import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IOptionProps, IProps } from "../../common/props";
export interface IRadioGroupProps extends IProps {
    /**
     * Whether the group and _all_ its radios are disabled.
     * Individual radios can be disabled using their `disabled` prop.
     */
    disabled?: boolean;
    /** Optional label text to display above the radio buttons. */
    label?: string;
    /**
     * Name of the group, used to link radio buttons together in HTML.
     * If omitted, a unique name will be generated internally.
     */
    name?: string;
    /**
     * Callback invoked when the currently selected radio changes.
     * This prop is required because this component currently supports only controlled usage.
     */
    onChange: (event: React.FormEvent<HTMLElement>) => void;
    /**
     * Array of options to render in the group.
     * This prop is mutually exclusive with `children`: either provide an array of `IOptionProps`
     * objects or provide `<Radio>` children elements.
     */
    options?: IOptionProps[];
    /** Value of the selected radio. The child with this value will be `:checked`. */
    selectedValue?: string;
}
export declare class RadioGroup extends AbstractComponent<IRadioGroupProps, {}> {
    static displayName: string;
    private autoGroupName;
    render(): JSX.Element;
    protected validateProps(): void;
    private renderChildren();
    private renderOptions();
    private getRadioProps(optionProps);
}
