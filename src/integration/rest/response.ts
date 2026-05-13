import type { ErrorEntry } from "../../errorstack";

/**
 * ResponseSuccess is the JSON object every 2xx HTTP response of a helix
 * service shall return. Typed metadata, when present, is folded by the
 * service into `extensions.metadata`; no top-level `metadata` exists.
 */
export type ResponseSuccess<Metadata, Data> = {
	data: Data | null;
	extensions?: ResponseExtensions<Metadata>;
};

/**
 * ResponseError is the JSON object every 3xx, 4xx, and 5xx HTTP response of a
 * helix service shall return. It is a GraphQL-spec compliant error envelope
 * with a non-empty `errors` array. Typed metadata, when present, is folded by
 * the service into `extensions.metadata`.
 */
export type ResponseError<Metadata> = {
	errors: ErrorEntry[];
	extensions?: ResponseExtensions<Metadata>;
};

/**
 * ResponseExtensions is the top-level `extensions` map shared by both
 * ResponseSuccess and ResponseError. The optional `metadata` key carries the
 * typed metadata folded by the helix.go REST integration.
 */
export type ResponseExtensions<Metadata> = {
	metadata?: Metadata;
	[key: string]: unknown;
};

/**
 * Response is the discriminated union of all JSON shapes a helix REST endpoint
 * can return. Narrow on the presence of `errors` to handle the error case;
 * the success case is the shape without `errors`.
 */
export type Response<Metadata, Data> =
	| ResponseSuccess<Metadata, Data>
	| ResponseError<Metadata>;
