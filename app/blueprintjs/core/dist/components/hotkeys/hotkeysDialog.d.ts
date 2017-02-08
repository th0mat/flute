import { IDialogProps } from "../../components";
import { IHotkeyProps } from "./hotkey";
export interface IHotkeysDialogProps extends IDialogProps {
    /**
     * This string displayed as the group name in the hotkeys dialog for all
     * global hotkeys.
     */
    globalHotkeysGroup?: string;
}
export declare function isHotkeysDialogShowing(): boolean;
export declare function setHotkeysDialogProps(props: IHotkeysDialogProps): void;
export declare function showHotkeysDialog(hotkeys: IHotkeyProps[]): void;
export declare function hideHotkeysDialog(): void;
