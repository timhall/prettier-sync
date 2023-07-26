import { Options } from "./index.js";

/**
 * `format` is used to format text using Prettier. [Options](https://prettier.io/docs/en/options.html) may be provided to override the defaults.
 */
export function format(source: string, options?: Options): string;
