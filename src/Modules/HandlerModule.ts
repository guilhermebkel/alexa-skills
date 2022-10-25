import {
	HandlerFn,
	Handler,
	HandlerAction,
	HandlerProps
} from "@/Protocols/HandlerProtocol"
import { ActionType } from "@/Protocols/RequestProtocol"
import { Response } from "@/Protocols/ResponseProtocol"

import RequestUtil from "@/Utils/RequestUtil"

import { HandlerActionNotFoundError } from "@/Errors/HandlerActionNotFoundError"

class HandlerModule {
	adapt (handler: Handler): HandlerFn {
		return async (event, _, callback) => {
			const actionType = RequestUtil.getActionType(handler.skillName, event)

			const actionMap: Record<ActionType, HandlerAction> = {
				CancelAndStop: handler.onCancelAndStop,
				Error: handler.onError,
				Execution: handler.onExecution,
				Fallback: handler.onFallback,
				Help: handler.onHelp,
				IntentReflector: handler.onIntentReflector,
				Launch: handler.onLaunch,
				SessionEnded: handler.onSessionEnded
			}

			const action = actionMap[actionType]

			if (action) {
				try {
					const handlerProps = this.getHandlerProps()

					const response: Response = await action.call(handler, handlerProps)
					callback(null, response)
				} catch (error) {
					callback(error, null)
				}
			} else {
				callback(new HandlerActionNotFoundError(), null)
			}
		}
	}

	private getHandlerProps (): HandlerProps {
		const responseObject: Response = {
			version: "1.0",
			response: {
				shouldEndSession: true
			}
		}

		const handlerProps: HandlerProps = {
			response: {
				speak: (text: string) => {
					responseObject.response.outputSpeech = {
						type: "PlainText",
						text
					}

					return handlerProps.response
				},
				reprompt: (text: string) => {
					responseObject.response.reprompt = {
						outputSpeech: {
							type: "PlainText",
							text
						}
					}

					return handlerProps.response
				},
				send: () => responseObject
			},
			session: {
				persist: (data: Record<string, unknown>) => {
					responseObject.sessionAttributes = {
						...responseObject.sessionAttributes,
						...data
					}
				}
			}
		}

		return handlerProps
	}
}

export default new HandlerModule()
