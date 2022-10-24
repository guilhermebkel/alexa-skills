import { AwsAlexaEventToken } from "@serverless/typescript"

export type HandlerFnCallbackResponse = {
	version: string
	response: {
		outputSpeech: {
			type: "PlainText"
			text: string
		}
		shouldEndSession: boolean
	}
}

export type HandlerFn = (event: unknown, context: unknown, callback: (error: Error | null, response: HandlerFnCallbackResponse) => void) => void

export type ExportedHandler = {
	main: HandlerFn
}

export type GetHandlerConfigInput = {
	skillName: string
	skillId: string
}

export type HandlerFnConfig = {
	[k: string]: {
		handler?: string
		events?: Array<{
			alexaSkill: {
				appId: AwsAlexaEventToken
				enabled?: boolean
			}
		}>
	}
}
