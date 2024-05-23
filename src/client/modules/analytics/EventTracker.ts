declare var gtag: any;

/**
 * Action names
 */

const EVENT_SIGNIN = "signin";
const EVENT_CREATE_ENTRY = "create_entry";
const EVENT_ADD_EMOJI = "add_emoji";
const EVENT_DELETE_ACCOUNT = "delete_account";
const EVENT_CREATE_TEMPLATE = "create_template";
const EVENT_USE_TEMPLATE = "use_template";

/**
 * Event tracker
 */

function signInWithGoogle() {
  try {
    gtag("event", EVENT_SIGNIN, { event_label: "google" });
  } catch (e) {}
}

function createEntry() {
  try {
    gtag("event", EVENT_CREATE_ENTRY);
  } catch (e) {}
}

function addEmoji() {
  try {
    gtag("event", EVENT_ADD_EMOJI);
  } catch (e) {}
}

function deleteAccount() {
  try {
    gtag("event", EVENT_DELETE_ACCOUNT);
  } catch (e) {}
}

function createTemplate() {
  try {
    gtag("event", EVENT_CREATE_TEMPLATE);
  } catch (e) {}
}

function useTemplate() {
  try {
    gtag("event", EVENT_USE_TEMPLATE);
  } catch (e) {}
}

const EventTracker = {
  signInWithGoogle,
  createEntry,
  addEmoji,
  deleteAccount,
  createTemplate,
  useTemplate,
};

export default EventTracker;
