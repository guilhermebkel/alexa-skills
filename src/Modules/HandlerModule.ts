import {
	HandlerFn,
	ExportedHandler,
	Handler,
	HandlerAction,
	HandlerProps,
	HandlerFnCallbackResponse
} from "@/Protocols/HandlerProtocol"
import { SkillName } from "@/Protocols/SkillProtocol"
import { ActionType } from "@/Protocols/RequestProtocol"

import RequestUtil from "@/Utils/RequestUtil"

class HandlerModule {
	export (skillName: SkillName, handler: Handler): ExportedHandler {
		const handlerFn = this.adapt(skillName, handler)

		return {
			main: handlerFn
		}
	}

	private adapt (skillName: SkillName, handler: Handler): HandlerFn {
		return async (event, _, callback) => {
			const actionType = RequestUtil.getActionType(skillName, event)

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
			const handlerProps = this.getHandlerProps()

			const response: HandlerFnCallbackResponse = await action.call(handler, handlerProps)
			callback(null, response)
		}
	}

	private getHandlerProps (): HandlerProps {
		return {
			response: {
				speak: (text: string) => ({
					version: "1.0",
					response: {
						outputSpeech: {
							type: "PlainText",
							text
						},
						shouldEndSession: false
					}
				})
			}
		}
	}
}

export default new HandlerModule()
