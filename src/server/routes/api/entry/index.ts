import {
  CONS_ENDPOINT_CREATE_ENTRY,
  CONS_ENDPOINT_UPDATE_ENTRY,
  CONS_ENDPOINT_DELETE_ENTRY,
  CONS_ENDPOINT_PUBLISH_ENTRY,
  CONS_ENDPOINT_FETCH_RECENT_ENTRIES,
  CONS_ENDPOINT_DRAFT_ENTRY,
  CONS_ENDPOINT_TOGGLE_PIN_OF_ENTRY,
  CONS_ENDPOINT_FETCH_ENTRY_HISTORIES,
  CONS_ENDPOINT_FETCH_ENTRIES_BY_TEXT,
  CONS_ENDPOINT_FETCH_ENTRIES_CSV,
  CONS_ENDPOINT_FETCH_REFLECTIONS,
} from "../../../../common/constants";
import { serveCreateEntry } from "./serveCreateEntry";
import { serveDeleteEntry } from "./serveDeleteEntry";
import { serveDraftEntry } from "./serveDraftEntry";
import { serveFetchEntryHistories } from "./serveFetchEntryHistories";
import { serveFetchRecentEntries } from "./serveFetchRecentEntries";
import { servePublishEntry } from "./servePublishEntry";
import { serveTogglePinOfEntry } from "./serveTogglePinOfEntry";
import { serveUpdateEntry } from "./serveUpdateEntry";
import { servefetchEntriesByText } from "./serveFetchEntriesByText";
import { serveFetchEntriesCsv } from "./serveFetchEntriesCsv";
import { serveFetchReflections } from "./serveFetchReflections";

module.exports = function (app: any) {
  app.post(CONS_ENDPOINT_CREATE_ENTRY, serveCreateEntry);
  app.post(CONS_ENDPOINT_UPDATE_ENTRY, serveUpdateEntry);
  app.post(CONS_ENDPOINT_DELETE_ENTRY, serveDeleteEntry);
  app.post(CONS_ENDPOINT_PUBLISH_ENTRY, servePublishEntry);
  app.post(CONS_ENDPOINT_DRAFT_ENTRY, serveDraftEntry);
  app.get(CONS_ENDPOINT_FETCH_RECENT_ENTRIES, serveFetchRecentEntries);
  app.post(CONS_ENDPOINT_TOGGLE_PIN_OF_ENTRY, serveTogglePinOfEntry);
  app.get(CONS_ENDPOINT_FETCH_ENTRY_HISTORIES, serveFetchEntryHistories);
  app.get(CONS_ENDPOINT_FETCH_ENTRIES_BY_TEXT, servefetchEntriesByText);
  app.get(CONS_ENDPOINT_FETCH_ENTRIES_CSV, serveFetchEntriesCsv);
  app.get(CONS_ENDPOINT_FETCH_REFLECTIONS, serveFetchReflections);
};
