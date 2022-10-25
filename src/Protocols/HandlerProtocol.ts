import { AwsAlexaEventToken } from "@serverless/typescript"

import { SkillName } from "@/Protocols/SkillProtocol"
import { Response } from "@/Protocols/ResponseProtocol"

export type HandlerFn = (event: unknown, context: unknown, callback: (error: Error | null, response: Response | null) => void) => void

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
	speak (text: string): HandlerResponse
	/**
	 * Add a reprompt if you want to keep the session open for the user to respond.
	 */
	reprompt (text: string): HandlerResponse
	send (): Response
}

export type HandlerSession = {
	persist: (data: Record<string, unknown>) => void
}

export type HandlerProps = {
	response: HandlerResponse
	session: HandlerSession
}

export type HandlerAction = (props: HandlerProps) => Promise<Response>

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
