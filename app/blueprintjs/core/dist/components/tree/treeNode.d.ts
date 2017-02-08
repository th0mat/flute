import * as React from "react";
export interface ITreeNode {
    /**
     * Child tree nodes of this node.
     */
    childNodes?: ITreeNode[];
    /**
     * A space-delimited string of class names to apply to the node.
     */
    className?: string;
    /**
     * Whether the caret to expand/collapse a node should be shown.
     * If not specified, this will be true if the node has children and false otherwise.
     */
    hasCaret?: boolean;
    /**
     * The name of a Blueprint icon to display next to the node's label.
     */
    iconName?: string;
    /**
     * A unique identifier for the node.
     */
    id: string | number;
    /**
     * Whether the children of this node are displayed.
     * @default false
     */
    isExpanded?: boolean;
    /**
     * Whether this node is selected.
     * @default false
     */
    isSelected?: boolean;
    /**
     * The main label for the node.
     */
    label: string | JSX.Element;
    /**
     * A secondary label/component that is displayed at the right side of the node.
     */
    secondaryLabel?: string | JSX.Element;
}
export interface ITreeNodeProps extends ITreeNode {
    children?: React.ReactNode;
    depth: number;
    key?: string | number;
    onClick?: (node: TreeNode, e: React.MouseEvent<HTMLDivElement>) => void;
    onCollapse?: (node: TreeNode, e: React.MouseEvent<HTMLSpanElement>) => void;
    onDoubleClick?: (node: TreeNode, e: React.MouseEvent<HTMLDivElement>) => void;
    onExpand?: (node: TreeNode, e: React.MouseEvent<HTMLSpanElement>) => void;
    path: number[];
}
export declare class TreeNode extends React.Component<ITreeNodeProps, {}> {
    render(): JSX.Element;
    private maybeRenderIcon();
    private maybeRenderSecondaryLabel();
    private handleCaretClick;
    private handleClick;
    private handleDoubleClick;
}
