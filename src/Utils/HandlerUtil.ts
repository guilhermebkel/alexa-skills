import {
	HandlerFnConfig,
	GetHandlerConfigInput
} from "@/Protocols/HandlerProtocol"

class HandlerUtil {
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
		return `src/Skills/${skillName}/index.main`
	}
}

export default new HandlerUtil()
