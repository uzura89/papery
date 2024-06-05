import {
  CONS_ENDPOINT_COMBINE_TAGS,
  CONS_ENDPOINT_CREATE_TAG,
  CONS_ENDPOINT_DELETE_TAG,
  CONS_ENDPOINT_FETCH_ALL_TAGS,
  CONS_ENDPOINT_UPDATE_TAG,
} from "../../../../common/constants";
import { serveCombineTags } from "./serveCombineTags";
import { serveCreateTag } from "./serveCreateTag";
import { serveDeleteTag } from "./serveDeleteTag";
import { serveFetchAllTags } from "./serveFetchAllTags";
import { serveUpdateTag } from "./serveUpdateTag";

export default function (app: any) {
  app.get(CONS_ENDPOINT_FETCH_ALL_TAGS, serveFetchAllTags);
  app.post(CONS_ENDPOINT_CREATE_TAG, serveCreateTag);
  app.post(CONS_ENDPOINT_UPDATE_TAG, serveUpdateTag);
  app.post(CONS_ENDPOINT_DELETE_TAG, serveDeleteTag);
  app.post(CONS_ENDPOINT_COMBINE_TAGS, serveCombineTags);
}
