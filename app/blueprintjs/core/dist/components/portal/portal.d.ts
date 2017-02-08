import * as React from "react";
import { IProps } from "../../common/props";
export interface IPortalProps extends IProps, React.HTMLProps<HTMLDivElement> {
    /**
     * A React `ref` handler callback for the detached container root element.
     * As this component renders its contents into a separate container, the result of the `ref`
     * prop is not backed by a DOM node. Hence this callback is necessary to get the real DOM node.
     */
    containerRef?: (ref: HTMLDivElement) => void;
    /**
     * Callback invoked when the children of this `Portal` have been added to the DOM.
     */
    onChildrenMount?: () => void;
}
/**
 * This component detaches its contents and re-attaches them to document.body.
 * Use it when you need to circumvent DOM z-stacking (for dialogs, popovers, etc.).
 * Any class names passed to this element will be propagated to the new container element on document.body.
 */
export declare class Portal extends React.Component<IPortalProps, {}> {
    displayName: string;
    private targetElement;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
