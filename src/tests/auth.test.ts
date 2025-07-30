import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  test("returns null when no authorization header is present", () => {
    const headers = {};
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("returns null when authorization header is empty string", () => {
    const headers = { authorization: "" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("returns null when authorization header doesn't start with 'ApiKey'", () => {
    const headers = { authorization: "Bearer token123" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("returns null when authorization header has 'ApiKey' but no value", () => {
    const headers = { authorization: "ApiKey" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("returns empty string when authorization header has 'ApiKey' with only spaces", () => {
    const headers = { authorization: "ApiKey " };
    const result = getAPIKey(headers);
    expect(result).toBe("");
  });

  test("returns API key when authorization header has valid format", () => {
    const headers = { authorization: "ApiKey abc123" };
    const result = getAPIKey(headers);
    expect(result).toBe("abc123");
  });

  test("returns empty string when authorization header has 'ApiKey' with multiple spaces", () => {
    const headers = { authorization: "ApiKey   xyz789" };
    const result = getAPIKey(headers);
    expect(result).toBe("");
  });

  test("returns API key with special characters", () => {
    const headers = { authorization: "ApiKey my-api-key-123!@#" };
    const result = getAPIKey(headers);
    expect(result).toBe("my-api-key-123!@#");
  });

  test("returns API key when authorization header is case sensitive", () => {
    const headers = { authorization: "apikey test123" };
    const result = getAPIKey(headers);
    expect(result).toBeNull();
  });

  test("returns only the first part after ApiKey when header has multiple parts", () => {
    const headers = { authorization: "ApiKey key123 extra part" };
    const result = getAPIKey(headers);
    expect(result).toBe("key123");
  });
});