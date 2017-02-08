import * as React from "react";
import { IProps } from "../../common/props";
export interface INonIdealStateProps extends IProps {
    action?: JSX.Element;
    /**
     * A longer description of the current non-ideal state.
     */
    description?: string | JSX.Element;
    /**
     * The title of the current non-ideal state.
     */
    title?: string;
    /**
     * A name of a Blueprint icon to display or a JSX Element (such as `<Spinner/>`).
     */
    visual?: string | JSX.Element;
}
export declare class NonIdealState extends React.Component<INonIdealStateProps, {}> {
    render(): JSX.Element;
    private maybeRenderAction();
    private maybeRenderDescription();
    private maybeRenderTitle();
    private maybeRenderVisual();
}
export declare const NonIdealStateFactory: React.ComponentFactory<INonIdealStateProps & {
    children?: React.ReactNode;
}, NonIdealState>;
