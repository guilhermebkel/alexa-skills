import { AwsAlexaEventToken } from "@serverless/typescript"

export type HandlerFn = (event: unknown, context: unknown, callback: (error: Error | null, response: unknown) => void) => void

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
