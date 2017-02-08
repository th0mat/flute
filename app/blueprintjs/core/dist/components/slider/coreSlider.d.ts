import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IProps } from "../../common/props";
export interface ICoreSliderProps extends IProps {
    /**
     * Whether the slider is non-interactive.
     * @default false
     */
    disabled?: boolean;
    /**
     * Increment between successive labels.
     * @default 1
     */
    labelStepSize?: number;
    /**
     * Maximum value of the slider.
     * @default 10
     */
    max?: number;
    /**
     * Minimum value of the slider.
     * @default 0
     */
    min?: number;
    /**
     * Whether a solid bar should be rendered on the track between current and initial values,
     * or between handles for `RangeSlider`.
     * @default true
     */
    showTrackFill?: boolean;
    /**
     * Increment between successive values; amount by which the handle moves.
     * @default 1
     */
    stepSize?: number;
    /**
     * Callback to render a single label. Useful for formatting numbers as currency or percentages.
     * If `true`, labels will use number value. If `false`, labels will not be shown.
     * @default true
     */
    renderLabel?: ((value: number) => string | JSX.Element) | boolean;
}
export interface ISliderState {
    /** the client size, in pixels, of one tick */
    tickSize?: number;
}
export declare abstract class CoreSlider<P extends ICoreSliderProps> extends AbstractComponent<P, ISliderState> {
    state: ISliderState;
    className: string;
    private trackElement;
    private refHandlers;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    protected abstract renderHandles(): JSX.Element | JSX.Element[];
    protected abstract renderFill(): JSX.Element;
    /** An event listener invoked when the user clicks on the track outside a handle */
    protected abstract handleTrackClick(event: React.MouseEvent<HTMLElement>): void;
    protected abstract handleTrackTouch(event: React.TouchEvent<HTMLElement>): void;
    protected formatLabel(value: number): React.ReactChild;
    private maybeRenderAxis();
    private maybeRenderFill();
    private maybeHandleTrackClick;
    private maybeHandleTrackTouch;
    private canHandleTrackEvent;
    private updateTickSize();
}
