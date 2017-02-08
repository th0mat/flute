import * as React from "react";
import * as spinner from "./spinner";
export declare class SVGSpinner extends spinner.Spinner {
    protected renderContainer(classes: string, content: JSX.Element): JSX.Element;
}
export declare const SVGSpinnerFactory: React.ComponentFactory<spinner.ISpinnerProps & {
    children?: React.ReactNode;
}, SVGSpinner>;
