import * as prettier from "../../src/sync.js";

const foo = {
  languages: [
    {
      name: "foo",
      parsers: ["foo-parser"],
      extensions: [".foo"],
    },
  ],
  defaultOptions: {
    tabWidth: 8,
    bracketSpacing: false,
  },
  parsers: {
    "foo-parser": {
      parse: (text) => ({ text }),
      astFormat: "foo-ast",
    },
  },
  printers: {
    "foo-ast": {
      print: (path, options) =>
        JSON.stringify({
          path,
          tabWidth: options.tabWidth,
          bracketSpacing: Boolean(options.bracketSpacing),
        }),
    },
  },
};

const bar = {
  languages: [
    {
      name: "bar",
      parsers: ["bar-parser"],
      extensions: [".bar"],
    },
  ],
  defaultOptions: {
    tabWidth: 8,
    bracketSpacing: false,
  },
  parsers: {
    "bar-parser": {
      parse: (text) => Promise.resolve({ text }),
      astFormat: "bar-ast",
    },
  },
  printers: {
    "bar-ast": {
      print: (path, options) =>
        JSON.stringify({
          path,
          tabWidth: options.tabWidth,
          bracketSpacing: Boolean(options.bracketSpacing),
        }),
    },
  },
};

test("format with sync parser/printer", () => {
  const input = "a: 123";
  expect(
    JSON.stringify(
      prettier.format(input, {
        parser: "foo-parser",
        plugins: [foo],
      }),
    ),
  ).toMatchInlineSnapshot('""{\\"path\\":{\\"stack\\":[{\\"text\\":\\"a: 123\\"}]},\\"tabWidth\\":8,\\"bracketSpacing\\":false}""');
});

test("throw error with async parser/printer", () => {
  const input = "a: 123";
  expect(
    () => JSON.stringify(
      prettier.format(input, {
        parser: "bar-parser",
        plugins: [bar],
      }),
    ),
  ).toThrowError("prettier/sync only supports sync plugins");
});
