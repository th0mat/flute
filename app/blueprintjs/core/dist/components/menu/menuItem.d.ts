import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IActionProps, ILinkProps } from "../../common/props";
export interface IMenuItemProps extends IActionProps, ILinkProps {
    /** Item text, required for usability. */
    text: string;
    /**
     * Right-aligned label content, useful for hotkeys.
     */
    label?: string | JSX.Element;
    /**
     * Whether an enabled, non-submenu item should automatically close the
     * popover it is nested within when clicked.
     * @default true
     */
    shouldDismissPopover?: boolean;
    /**
     * Array of props objects for submenu items.
     * An alternative to providing `MenuItem` components as `children`.
     */
    submenu?: IMenuItemProps[];
    /**
     * Width of "margin" from left or right edge of viewport. Submenus will
     * flip to the other side if they come within this distance of that edge.
     * This has no effect if omitted or if `useSmartPositioning={false}`.
     * Note that these values are not CSS properties; they are used in
     * internal math to determine when to flip sides.
     */
    submenuViewportMargin?: {
        left?: number;
        right?: number;
    };
    /**
     * Whether a submenu popover will try to reposition itself
     * if there isn't room for it in its current position.
     * The popover opens right by default, but will try to flip
     * left if not enough space.
     * @default true
     */
    useSmartPositioning?: boolean;
}
export interface IMenuItemState {
    /** Whether a submenu is opened to the left */
    alignLeft?: boolean;
}
export declare class MenuItem extends AbstractComponent<IMenuItemProps, IMenuItemState> {
    static defaultProps: IMenuItemProps;
    static displayName: string;
    static contextTypes: React.ValidationMap<IMenuItemState>;
    static childContextTypes: React.ValidationMap<IMenuItemState>;
    context: IMenuItemState;
    state: IMenuItemState;
    private liElement;
    render(): JSX.Element;
    getChildContext(): {
        alignLeft: boolean;
    };
    protected validateProps(props: IMenuItemProps & {
        children?: React.ReactNode;
    }): void;
    private liRefHandler;
    private measureSubmenu;
    private renderChildren;
    /**
     * Evalutes this.props and cascades prop values into new props when:
     * - submenuViewportMargin is defined, but is undefined for the supplied input.
     * - useSmartPositioning is false, but is undefined for the supplied input.
     * @param {IMenuItemProps} newProps If supplied, object will be modified, otherwise, defaults to an empty object.
     * @returns An object to be used as child props.
     */
    private cascadeProps;
}
export declare function renderMenuItem(props: IMenuItemProps, key: string | number): JSX.Element;
export declare const MenuItemFactory: React.ComponentFactory<IMenuItemProps & {
    children?: React.ReactNode;
}, MenuItem>;
