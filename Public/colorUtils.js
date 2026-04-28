function validateColorName(colorName) {
  if (!colorName || typeof colorName !== "string") {
    return { valid: false, error: "Color name is required." };
  }
  const trimmed = colorName.trim();
  if (trimmed.length === 0) return { valid: false, error: "Color name cannot be empty." };
  if (trimmed.length > 50) return { valid: false, error: "Color name must be 50 characters or fewer." };
  const safePattern = /^[a-zA-Z0-9 \-]+$/;
  if (!safePattern.test(trimmed)) return { valid: false, error: "Color name contains invalid characters." };
  return { valid: true, error: null };
}
function formatColorEntry(colorEntry) {
  if (!colorEntry || typeof colorEntry !== "object") return "";
  const id = colorEntry.id ?? "?";
  const name = colorEntry.name ?? "Unknown";
  return `#${id} — ${name}`;
}
function isValidHexColor(hex) {
  if (!hex || typeof hex !== "string") return false;
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
}
function buildAddColorPayload(userId, colorName) {
  return { userId: String(userId).trim(), colorName: String(colorName).trim() };
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateColorName, formatColorEntry, isValidHexColor, buildAddColorPayload };
}