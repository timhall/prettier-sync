import { printDocToString } from "./document/printer.js";
import { BOM, normalizeInputAndOptions } from "./main/core.js";
import { normalizeFormatOptionsSync } from "./main/normalize-format-options.js";
import { parseSync } from "./main/parse.js";
import { printAstToDocSync } from "./main/ast-to-doc.js";

/** @typedef {import("./index.js").Options} Options */

/**
 * Format text using Prettier, but only with sync plugins
 * (throws an error if an async plugin is used)
 *
 * @param {string} text
 * @param {Options} options
 * @returns {string}
 */
export function format(text, options) {
  if (!text || text.trim().length === 0) {
    return "";
  }

  const normalized = normalizeInputAndOptions(
    text,
    normalizeFormatOptionsSync(options),
  );
  const parsed = parseSync(normalized.text, normalized.options);
  const doc = printAstToDocSync(parsed.ast, normalized.options);
  const { formatted } = printDocToString(doc, normalized.options);

  return normalized.hasBOM ? BOM + formatted : formatted;
}
