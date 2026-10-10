import type { AxiosResponse } from "axios";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData } from "../../api/payload";

export function recordResponse(response: AxiosResponse<unknown>) {
  const record = normalizeApiRecord(unwrapApiData(response.data));
  if (!record) throw new Error("Invalid record response");
  return { ...response, data: record };
}

export function collectionResponse(response: AxiosResponse<unknown>) {
  const records = unwrapApiData(response.data);
  if (!Array.isArray(records)) throw new Error("Invalid collection response");
  return { ...response, data: normalizeApiRecords(records) };
}
