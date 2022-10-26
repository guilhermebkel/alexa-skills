import { RequestEnvelope, Response } from "ask-sdk-model"
import { HandlerInput } from "ask-sdk-core"

export type HandlerEvent = RequestEnvelope

export type HandlerProps = HandlerInput

export type HandlerResponse = Response

export type HandlerActionFn = (props: HandlerInput) => Promise<HandlerResponse>

export interface Handler {
	mainIntentName: string
	onExecution: HandlerActionFn
	onLaunch: HandlerActionFn
	onHelp: HandlerActionFn
	onCancelAndStop: HandlerActionFn
	onFallback: HandlerActionFn
	onSessionEnded: HandlerActionFn
	onIntentReflector: HandlerActionFn
	onError: (props: HandlerInput, error: Error) => Promise<HandlerResponse>
}
