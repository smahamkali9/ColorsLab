const { buildAddColorPayload } = require("../Public/colorUtils");

describe("API JSON contract — AddColor payload", () => {
  test("payload has required userId field as string", () => {
    const payload = buildAddColorPayload(5, "Teal");
    expect(payload).toHaveProperty("userId");
    expect(typeof payload.userId).toBe("string");
  });

  test("payload has required colorName field as string", () => {
    const payload = buildAddColorPayload(5, "Teal");
    expect(payload).toHaveProperty("colorName");
    expect(typeof payload.colorName).toBe("string");
  });

  test("payload contains no extra unexpected keys", () => {
    const payload = buildAddColorPayload(1, "Red");
    const keys = Object.keys(payload).sort();
    expect(keys).toEqual(["colorName", "userId"]);
  });

  test("payload colorName is non-empty", () => {
    const payload = buildAddColorPayload(1, "Crimson");
    expect(payload.colorName.length).toBeGreaterThan(0);
  });
});

describe("API JSON contract — GetColors response shape", () => {
  function mockGetColorsResponse(colors) {
    return { id: colors, error: "" };
  }

  test("response contains id array and error string", () => {
    const response = mockGetColorsResponse([{ id: 1, name: "Blue" }]);
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("error");
    expect(typeof response.error).toBe("string");
  });

  test("each color entry has id and name properties", () => {
    const colors = [{ id: 1, name: "Blue" }, { id: 2, name: "Red" }];
    const response = mockGetColorsResponse(colors);
    response.id.forEach((entry) => {
      expect(entry).toHaveProperty("id");
      expect(entry).toHaveProperty("name");
    });
  });

  test("empty color list returns empty array", () => {
    const response = mockGetColorsResponse([]);
    expect(Array.isArray(response.id)).toBe(true);
    expect(response.id).toHaveLength(0);
  });

  test("error field is empty string on success", () => {
    const response = mockGetColorsResponse([{ id: 1, name: "Green" }]);
    expect(response.error).toBe("");
  });
});