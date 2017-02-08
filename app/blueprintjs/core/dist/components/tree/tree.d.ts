import * as React from "react";
import { IProps } from "../../common/props";
import { ITreeNode } from "./treeNode";
export declare type TreeEventHandler = (node: ITreeNode, nodePath: number[], e: React.MouseEvent<HTMLElement>) => void;
export interface ITreeProps extends IProps {
    /**
     * The data specifying the contents and appearance of the tree.
     */
    contents: ITreeNode[];
    /**
     * Invoked when a node is clicked anywhere other than the caret for expanding/collapsing the node.
     */
    onNodeClick?: TreeEventHandler;
    /**
     * Invoked when caret of an expanded node is clicked.
     */
    onNodeCollapse?: TreeEventHandler;
    /**
     * Invoked when a node is double-clicked. Be careful when using this in combination with
     * an `onNodeClick` (single-click) handler, as the way this behaves can vary between browsers.
     * See http://stackoverflow.com/q/5497073/3124288
     */
    onNodeDoubleClick?: TreeEventHandler;
    /**
     * Invoked when the caret of a collapsed node is clicked.
     */
    onNodeExpand?: TreeEventHandler;
}
export declare class Tree extends React.Component<ITreeProps, {}> {
    static nodeFromPath(path: number[], treeNodes: ITreeNode[]): ITreeNode;
    render(): JSX.Element;
    private renderNodes(treeNodes, currentPath?, className?);
    private handleNodeCollapse;
    private handleNodeClick;
    private handleNodeDoubleClick;
    private handleNodeExpand;
    private handlerHelper(handlerFromProps, node, e);
}
export declare const TreeFactory: React.ComponentFactory<ITreeProps & {
    children?: React.ReactNode;
}, Tree>;
