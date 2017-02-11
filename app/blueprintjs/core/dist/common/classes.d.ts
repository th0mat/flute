import { Intent } from "./intent";
export declare const DARK: string;
export declare const ACTIVE: string;
export declare const MINIMAL: string;
export declare const DISABLED: string;
export declare const SMALL: string;
export declare const LARGE: string;
export declare const INTERACTIVE: string;
export declare const ALIGN_LEFT: string;
export declare const ALIGN_RIGHT: string;
export declare const INLINE: string;
export declare const FILL: string;
export declare const ALERT: string;
export declare const ALERT_BODY: string;
export declare const ALERT_CONTENTS: string;
export declare const ALERT_FOOTER: string;
export declare const BREADCRUMB: string;
export declare const BREADCRUMB_CURRENT: string;
export declare const BREADCRUMBS: string;
export declare const BREADCRUMBS_COLLAPSED: string;
export declare const BUTTON: string;
export declare const BUTTON_GROUP: string;
export declare const CARD: string;
export declare const COLLAPSE: string;
export declare const COLLAPSIBLE_LIST: string;
export declare const CONTEXT_MENU: string;
export declare const CONTEXT_MENU_POPOVER_TARGET: string;
export declare const DIALOG: string;
export declare const DIALOG_BODY: string;
export declare const DIALOG_CLOSE_BUTTON: string;
export declare const DIALOG_FOOTER: string;
export declare const DIALOG_FOOTER_ACTIONS: string;
export declare const DIALOG_HEADER: string;
export declare const EDITABLE_TEXT: string;
export declare const ELEVATION_0: string;
export declare const ELEVATION_1: string;
export declare const ELEVATION_2: string;
export declare const ELEVATION_3: string;
export declare const ELEVATION_4: string;
export declare const INPUT: string;
export declare const INPUT_GROUP: string;
export declare const LABEL: string;
export declare const MENU: string;
export declare const MENU_ITEM: string;
export declare const MENU_SUBMENU: string;
export declare const MENU_DIVIDER: string;
export declare const MENU_HEADER: string;
export declare const NON_IDEAL_STATE: string;
export declare const NON_IDEAL_STATE_ACTION: string;
export declare const NON_IDEAL_STATE_DESCRIPTION: string;
export declare const NON_IDEAL_STATE_ICON: string;
export declare const NON_IDEAL_STATE_TITLE: string;
export declare const NON_IDEAL_STATE_VISUAL: string;
export declare const OVERLAY: string;
export declare const OVERLAY_BACKDROP: string;
export declare const OVERLAY_CONTENT: string;
export declare const OVERLAY_INLINE: string;
export declare const OVERLAY_OPEN: string;
export declare const OVERLAY_SCROLL_CONTAINER: string;
export declare const POPOVER: string;
export declare const POPOVER_ARROW: string;
export declare const POPOVER_BACKDROP: string;
export declare const POPOVER_CONTENT: string;
export declare const POPOVER_DISMISS: string;
export declare const POPOVER_DISMISS_OVERRIDE: string;
export declare const POPOVER_OPEN: string;
export declare const POPOVER_TARGET: string;
export declare const TRANSITION_CONTAINER: string;
export declare const PORTAL: string;
export declare const SELECT: string;
export declare const SLIDER: string;
export declare const SLIDER_HANDLE: string;
export declare const SLIDER_LABEL: string;
export declare const RANGE_SLIDER: string;
export declare const SPINNER: string;
export declare const SVG_SPINNER: string;
export declare const TAB: string;
export declare const TAB_LIST: string;
export declare const TAB_PANEL: string;
export declare const TABS: string;
export declare const TAG: string;
export declare const TAG_REMOVABLE: string;
export declare const TAG_REMOVE: string;
export declare const TOAST: string;
export declare const TOAST_CONTAINER: string;
export declare const TOAST_MESSAGE: string;
export declare const TOOLTIP: string;
export declare const TREE: string;
export declare const TREE_NODE: string;
export declare const TREE_NODE_CARET: string;
export declare const TREE_NODE_CARET_CLOSED: string;
export declare const TREE_NODE_CARET_NONE: string;
export declare const TREE_NODE_CARET_OPEN: string;
export declare const TREE_NODE_CONTENT: string;
export declare const TREE_NODE_EXPANDED: string;
export declare const TREE_NODE_ICON: string;
export declare const TREE_NODE_LABEL: string;
export declare const TREE_NODE_LIST: string;
export declare const TREE_NODE_SECONDARY_LABEL: string;
export declare const TREE_NODE_SELECTED: string;
export declare const TREE_ROOT: string;
export declare const ICON_STANDARD: string;
export declare const ICON_LARGE: string;
/** Return CSS class for icon, whether or not 'pt-icon-' prefix is included */
export declare function iconClass(iconName: string): string;
export declare function intentClass(intent?: Intent): string;