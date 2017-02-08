import * as React from "react";
import { IHotkeysProps } from "./hotkeys";
export interface IHotkeysTarget extends React.Component<any, any>, React.ComponentLifecycle<any, any> {
    /**
     * Components decorated with the `HotkeysTarget` decorator must implement
     * this method, and it must return a `Hotkeys` React element.
     */
    renderHotkeys(): React.ReactElement<IHotkeysProps>;
}
export declare function HotkeysTarget<T extends {
    prototype: IHotkeysTarget;
}>(constructor: T): void;
