import * as React from "react";
import { CoreSlider, ICoreSliderProps } from "./coreSlider";
export interface ISliderProps extends ICoreSliderProps {
    /**
     * Initial value of the slider, determines where the fill starts from.
     * @default 0
     */
    initialValue?: number;
    /**
     * Value of slider.
     * @default 0
     */
    value?: number;
    /** Callback invoked when the value changes. */
    onChange?(value: number): void;
    /** Callback invoked when the handle is released. */
    onRelease?(value: number): void;
}
export declare class Slider extends CoreSlider<ISliderProps> {
    static defaultProps: ISliderProps;
    displayName: "Blueprint.Slider";
    private handle;
    protected renderFill(): JSX.Element;
    protected renderHandles(): JSX.Element;
    protected handleTrackClick(event: React.MouseEvent<HTMLElement>): void;
    protected handleTrackTouch(event: React.TouchEvent<HTMLElement>): void;
    private handleHandleRef;
}
export declare const SliderFactory: React.ComponentFactory<ISliderProps & {
    children?: React.ReactNode;
}, Slider>;
