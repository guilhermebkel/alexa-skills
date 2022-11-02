export type SpoilerLookup = {
	status: "available" | "manga-launched" | "not-found"
	date?: Date
	type?: "short" | "more" | "complete"
	content?: string
}
