import { AwsAlexaEventToken } from "@serverless/typescript"
import { RequestEnvelope, Response } from "ask-sdk-model"
import { HandlerInput } from "ask-sdk-core"

import { SkillName } from "@/Protocols/SkillProtocol"

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

export type HandlerEvent = RequestEnvelope

export type HandlerProps = HandlerInput

export type HandlerResponse = Response

export type HandlerActionFn = (props: HandlerInput) => Promise<HandlerResponse>

export interface Handler {
	skillName: SkillName
	onExecution: HandlerActionFn
	onLaunch: HandlerActionFn
	onHelp: HandlerActionFn
	onCancelAndStop: HandlerActionFn
	onFallback: HandlerActionFn
	onSessionEnded: HandlerActionFn
	onIntentReflector: HandlerActionFn
	onError: (props: HandlerInput, error: Error) => Promise<HandlerResponse>
}
