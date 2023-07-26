function assertNonPromise(value) {
  if (
    typeof value === "object" &&
    Boolean(value) &&
    typeof value.then === "function"
  ) {
    throw new Error("prettier/sync only supports sync plugins");
  }
}

export { assertNonPromise };
