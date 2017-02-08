import * as React from "react";
import { IIntentProps, IProps } from "../../common/props";
export interface ITagProps extends IProps, IIntentProps, React.HTMLProps<HTMLSpanElement> {
    /**
     * Click handler for remove button.
     * Button will only be rendered if this prop is defined.
     */
    onRemove?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
export declare class Tag extends React.Component<ITagProps, {}> {
    displayName: string;
    render(): JSX.Element;
}
export declare const TagFactory: React.ComponentFactory<ITagProps & {
    children?: React.ReactNode;
}, Tag>;
