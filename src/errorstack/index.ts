/**
 * Errorstack mirrors the response envelope produced by the helix.go
 * errorstack package.
 *
 * Error responses returned by a helix service serialize to a GraphQL-spec
 * compliant envelope: a non-empty `errors` array and an optional top-level
 * `extensions` map. Each entry carries a human-readable `message`, an optional
 * `path` identifying the field that errored, and an optional `extensions` map
 * carrying machine-readable metadata such as a `code`.
 *
 *     { "errors": [{ "message": "…", "path": […], "extensions": { "code": "…" } }],
 *       "extensions": { … } }
 */
export type Errorstack = {
	errors: ErrorEntry[];
	extensions?: Record<string, unknown>;
};

/**
 * ErrorEntry is a single element of the `errors` array in an Errorstack
 * envelope.
 */
export type ErrorEntry = {
	message: string;
	path?: (string | number)[];
	extensions: ErrorExtensions;
};

/**
 * ErrorExtensions carries machine-readable metadata for an ErrorEntry.
 * `code` is always set on entries emitted by helix.go services: the Go
 * MarshalJSON path normalizes every entry so `extensions.code` defaults
 * to `INTERNAL_ERROR` if a caller appended an entry without going through
 * the canonical constructors.
 */
export type ErrorExtensions = {
	code: ErrorCode;
	[key: string]: unknown;
};

/**
 * ErrorCode is the canonical machine-readable code carried in
 * `extensions.code`. Mirrors the codes exposed by helix.go's errorstack
 * package, plus VALIDATION_FAILED for entries produced via validation.
 */
export type ErrorCode =
	| "BAD_REQUEST"
	| "UNAUTHORIZED"
	| "PAYMENT_REQUIRED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "METHOD_NOT_ALLOWED"
	| "CONFLICT"
	| "PAYLOAD_TOO_LARGE"
	| "TOO_MANY_REQUESTS"
	| "INTERNAL_ERROR"
	| "NOT_IMPLEMENTED"
	| "BAD_GATEWAY"
	| "SERVICE_UNAVAILABLE"
	| "VALIDATION_FAILED";
