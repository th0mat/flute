export declare enum Position {
    TOP_LEFT = 0,
    TOP = 1,
    TOP_RIGHT = 2,
    RIGHT_TOP = 3,
    RIGHT = 4,
    RIGHT_BOTTOM = 5,
    BOTTOM_RIGHT = 6,
    BOTTOM = 7,
    BOTTOM_LEFT = 8,
    LEFT_BOTTOM = 9,
    LEFT = 10,
    LEFT_TOP = 11,
}
export declare function isPositionHorizontal(position: Position): boolean;
export declare function isPositionVertical(position: Position): boolean;
