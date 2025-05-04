import "server-only";

import getVariantForResponse from "./getVariantForResponse";
import getSignedInUserForm from "./getSignedInUserForm";
import getFormInfoById from "./getFormInfoById";
import getFormById from "./getFormById";

const fetcher = {
  getFormById,
  getFormInfoById,
  getSignedInUserForm,
  getVariantForResponse,
};

export default fetcher;
