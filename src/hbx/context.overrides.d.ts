// Yours, and tracked: retype what $context(...) reads. Key it by the context key and give the whole value type; every route that has the key
// gets it. These are inferred from the Cornerstone templates, not checked against a live store (see PORT-NOTES.md, Library gaps).
// Keep this a global script file (no imports or exports).
interface HBXContextOverrides {
    // The generated type is `Array<Record<string, unknown>>`, which hides `message`. Read by pages/home (`{{> alert-info message}}`).
    shipping_messages: ReadonlyArray<{readonly message: unknown}>;
}
