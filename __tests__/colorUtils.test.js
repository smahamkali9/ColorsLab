const {
  validateColorName,
  formatColorEntry,
  isValidHexColor,
  buildAddColorPayload,
} = require("../Public/colorUtils");

describe("validateColorName()", () => {
  test("accepts a valid color name", () => {
    const result = validateColorName("Blue");
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });
  test("rejects an empty string", () => {
    const result = validateColorName("");
    expect(result.valid).toBe(false);
  });
  test("rejects null input", () => {
    const result = validateColorName(null);
    expect(result.valid).toBe(false);
  });
  test("rejects names longer than 50 characters", () => {
    const result = validateColorName("A".repeat(51));
    expect(result.valid).toBe(false);
  });
  test("rejects SQL injection characters", () => {
    const result = validateColorName("Blue'; DROP TABLE colors;--");
    expect(result.valid).toBe(false);
  });
});

describe("formatColorEntry()", () => {
  test("formats a color entry correctly", () => {
    expect(formatColorEntry({ id: 42, name: "Blue" })).toBe("#42 — Blue");
  });
  test("returns empty string for null", () => {
    expect(formatColorEntry(null)).toBe("");
  });
});

describe("isValidHexColor()", () => {
  test("accepts valid 6-digit hex", () => {
    expect(isValidHexColor("#FF5733")).toBe(true);
  });
  test("rejects invalid hex", () => {
    expect(isValidHexColor("#GGGGGG")).toBe(false);
  });
  test("rejects null", () => {
    expect(isValidHexColor(null)).toBe(false);
  });
});

describe("buildAddColorPayload()", () => {
  test("builds correct payload and trims whitespace", () => {
    const payload = buildAddColorPayload("7", "  Green  ");
    expect(payload).toEqual({ userId: "7", colorName: "Green" });
  });
});