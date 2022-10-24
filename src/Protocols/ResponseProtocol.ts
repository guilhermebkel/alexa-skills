export type Response = {
	version: string
	response: {
		outputSpeech?: {
			type: "PlainText"
			text: string
		}
		reprompt?: {
			outputSpeech: Response["response"]["outputSpeech"]
		}
		shouldEndSession: boolean
	}
	sessionAttributes?: Record<string, unknown>
}