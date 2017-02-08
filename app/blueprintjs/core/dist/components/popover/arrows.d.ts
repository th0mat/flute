import { CSSProperties } from "react";
import { Position } from "../../common/position";
export declare const MIN_ARROW_SPACING: number;
export interface IDimensions {
    height: number;
    width: number;
}
export interface IArrowPositionStyles {
    arrow?: CSSProperties;
    container?: CSSProperties;
}
export declare function computeArrowOffset(sideLength: number, arrowSize: number, minimum?: number): number;
export declare function getPopoverTransformOrigin(position: Position, arrowSize: number, targetDimensions: IDimensions): string;
export declare function getArrowPositionStyles(position: Position, arrowSize: number, ignoreTargetDimensions: boolean, targetDimensions: IDimensions, inline: boolean): IArrowPositionStyles;
