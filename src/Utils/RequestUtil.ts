import { ActionType } from "@/Protocols/RequestProtocol"
import { SkillName } from "@/Protocols/SkillProtocol"

import * as Alexa from "ask-sdk-core"

class RequestUtil {
	getActionType (skillName: SkillName, event: any): ActionType {
		const requestType = Alexa.getRequestType(event)
		const intentName = Alexa.getIntentName(event)

		if (requestType === "SessionEndedRequest") {
			return "SessionEnded"
		} else if (requestType === "LaunchRequest") {
			return "Launch"
		} else if (requestType === "IntentRequest") {
			const intentMap: Record<string, ActionType> = {
				[`${skillName}Intent`]: "Execution",
				"AMAZON.HelpIntent": "Help",
				"AMAZON.CancelIntent": "CancelAndStop",
				"AMAZON.StopIntent": "CancelAndStop",
				"AMAZON.FallbackIntent": "Fallback"
			}

			return intentMap[intentName] || "Error"
		}
	}
}

export default new RequestUtil()
