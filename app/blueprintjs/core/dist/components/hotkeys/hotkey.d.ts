import { ReactElement } from "react";
import { AbstractComponent } from "../../common";
export interface IHotkeyProps {
    /**
     * Hotkey combination string, such as "space" or "cmd+n".
     */
    combo: string;
    /**
     * Human-friendly label for this hotkey.
     */
    label: string;
    /**
     * If `false`, the hotkey is active only when the target is focused. If
     * `true`, the hotkey can be triggered regardless of what component is
     * focused.
     * @default false
     */
    global?: boolean;
    /**
     * Unless the hotkey is global, you must specify a group where the hotkey
     * will be displayed in the hotkeys dialog. This string will be displayed
     * in a header at the start of the group of hotkeys.
     */
    group?: string;
    /**
     * `keydown` event handler
     */
    onKeyDown?(e: KeyboardEvent): any;
    /**
     * `keyup` event handler
     */
    onKeyUp?(e: KeyboardEvent): any;
}
export declare class Hotkey extends AbstractComponent<IHotkeyProps, {}> {
    static defaultProps: {
        global: boolean;
    };
    static isInstance(element: ReactElement<any>): element is ReactElement<IHotkeyProps>;
    render(): JSX.Element;
    protected validateProps(props: IHotkeyProps): void;
}
