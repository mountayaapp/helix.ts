/**
 * TemporalMetadata holds public details about Temporal that shall be used in
 * the "metadata" object of the HTTP response of a REST API.
 */
export type TemporalMetadata = {
	workflow?: TemporalMetadataWorkflow;
};

/**
 * TemporalMetadataWorkflow holds public details about a Temporal workflow that
 * shall be used in the "metadata" object of a REST response.
 */
export type TemporalMetadataWorkflow = {
	id: string;
	run: TemporalMetadataRun | null;
};

/**
 * TemporalMetadataRun holds public details about a Temporal run that shall be
 * used in the "metadata" object of a REST response.
 */
export type TemporalMetadataRun = {
	id: string;
};
