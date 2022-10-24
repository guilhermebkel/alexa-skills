import { AwsAlexaEventToken } from "@serverless/typescript"

import { SkillName } from "@/Protocols/SkillProtocol"

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
	skillName: SkillName
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

export type HandlerResponse = {
	speak (text: string): HandlerFnCallbackResponse
}

export type HandlerProps = {
	response: HandlerResponse
}

export type HandlerAction = (props: HandlerProps) => Promise<HandlerFnCallbackResponse>

export interface Handler {
	onExecution: HandlerAction
	onLaunch: HandlerAction
	onHelp: HandlerAction
	onCancelAndStop: HandlerAction
	onFallback: HandlerAction
	onSessionEnded: HandlerAction
	onIntentReflector: HandlerAction
	onError: HandlerAction
}
