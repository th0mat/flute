import * as React from "react";
import { IPopoverProps } from "./popover";
export declare class SVGPopover extends React.Component<IPopoverProps, {}> {
    render(): JSX.Element;
}
export declare const SVGPopoverFactory: React.ComponentFactory<IPopoverProps & {
    children?: React.ReactNode;
}, SVGPopover>;
