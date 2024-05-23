/**
 * Default
 */
export const CONS_ENDPOINT_API = "/api";

/**
 * Entities
 */
const ENDPOINT_USER = `${CONS_ENDPOINT_API}/user`;
const ENDPOINT_ENTRY = `${CONS_ENDPOINT_API}/entry`;
const ENDPOINT_TAG = `${CONS_ENDPOINT_API}/tag`;
const ENDPOINT_TEMPLATE = `${CONS_ENDPOINT_API}/template`;
const ENDPOINT_REPORT = `${CONS_ENDPOINT_API}/report`;

/**
 * Endpoints
 */

// user
export const CONS_ENDPOINT_FETCH_USER = `${ENDPOINT_USER}/fetch`;
export const CONS_ENDPOINT_LOGIN_WITH_GOOGLE = `/login-with-google`;

// entry
export const CONS_ENDPOINT_CREATE_ENTRY = `${ENDPOINT_ENTRY}/create`;
export const CONS_ENDPOINT_UPDATE_ENTRY = `${ENDPOINT_ENTRY}/update`;
export const CONS_ENDPOINT_DELETE_ENTRY = `${ENDPOINT_ENTRY}/delete`;
export const CONS_ENDPOINT_PUBLISH_ENTRY = `${ENDPOINT_ENTRY}/publish`;
export const CONS_ENDPOINT_DRAFT_ENTRY = `${ENDPOINT_ENTRY}/draft`;
export const CONS_ENDPOINT_FETCH_RECENT_ENTRIES = `${ENDPOINT_ENTRY}/fetch-recent`;
export const CONS_ENDPOINT_TOGGLE_PIN_OF_ENTRY = `${ENDPOINT_ENTRY}/toggle-pin`;
export const CONS_ENDPOINT_FETCH_ENTRY_HISTORIES = `${ENDPOINT_ENTRY}/fetch-histories`;
export const CONS_ENDPOINT_FETCH_ENTRIES_BY_TEXT = `${ENDPOINT_ENTRY}/fetch-by-text`;
export const CONS_ENDPOINT_FETCH_ENTRIES_CSV = `${ENDPOINT_ENTRY}/fetch-csv`;
export const CONS_ENDPOINT_FETCH_REFLECTIONS = `${ENDPOINT_ENTRY}/fetch-reflections`;

// tag
export const CONS_ENDPOINT_CREATE_TAG = `${ENDPOINT_TAG}/create`;
export const CONS_ENDPOINT_FETCH_ALL_TAGS = `${ENDPOINT_TAG}/fetch-all`;
export const CONS_ENDPOINT_DELETE_TAG = `${ENDPOINT_TAG}/delete`;
export const CONS_ENDPOINT_UPDATE_TAG = `${ENDPOINT_TAG}/update`;
export const CONS_ENDPOINT_COMBINE_TAGS = `${ENDPOINT_TAG}/combine`;

// template
export const CONS_ENDPOINT_FETCH_ALL_TEMPLATES = `${ENDPOINT_TEMPLATE}/fetch-all`;
export const CONS_ENDPOINT_CREATE_TEMPLATE = `${ENDPOINT_TEMPLATE}/create`;
export const CONS_ENDPOINT_UPDATE_TEMPLATE = `${ENDPOINT_TEMPLATE}/update`;
export const CONS_ENDPOINT_DELETE_TEMPLATE = `${ENDPOINT_TEMPLATE}/delete`;

// report
export const CONS_ENDPOINT_FETCH_ALL_REPORTS = `${ENDPOINT_REPORT}/fetch-all`;
export const CONS_ENDPOINT_FETCH_REPORT_DATA = `${ENDPOINT_REPORT}/fetch-data`;
export const CONS_ENDPOINT_CREATE_REPORT = `${ENDPOINT_REPORT}/create`;
export const CONS_ENDPOINT_UPDATE_REPORT = `${ENDPOINT_REPORT}/update`;
export const CONS_ENDPOINT_DELETE_REPORT = `${ENDPOINT_REPORT}/delete`;
export const CONS_ENDPOINT_CHANGE_ORDER_OF_REPORTS = `${ENDPOINT_REPORT}/change-order`;
