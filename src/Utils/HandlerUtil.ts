import * as path from "path"

import {
	HandlerFn,
	ExportedHandler,
	HandlerFnConfig,
	GetHandlerConfigInput
} from "@/Protocols/HandlerProtocol"

class HandlerUtil {
	exportHandler (handlerFn: HandlerFn): ExportedHandler {
		return {
			main: handlerFn
		}
	}

	getHandlerFunctionConfig (input: GetHandlerConfigInput): HandlerFnConfig {
		return {
			[input.skillName]: {
				handler: this.buildHandlerPath(input.skillName),
				events: [
					{
						alexaSkill: {
							appId: input.skillId,
							enabled: true
						}
					}
				]
			}
		}
	}

	private buildHandlerPath (skillName: string): string {
		return path.resolve("..", "Skills", skillName, "index.main")
	}
}

export default new HandlerUtil()
