import { ObjectId } from "mongodb";

export const normalizeId = (value) => {
  if (value == null) return value;
  if (typeof value !== "string") return value;
  // Fast path: 24-char hex string becomes ObjectId
  return value.length === 24 ? new ObjectId(value) : value;
};

