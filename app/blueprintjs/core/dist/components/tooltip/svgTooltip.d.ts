import * as React from "react";
import { ITooltipProps } from "./tooltip";
export declare class SVGTooltip extends React.Component<ITooltipProps, {}> {
    render(): JSX.Element;
}
export declare const SVGTooltipFactory: React.ComponentFactory<ITooltipProps & {
    children?: React.ReactNode;
}, SVGTooltip>;
