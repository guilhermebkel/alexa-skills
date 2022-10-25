import HandlerUtil from "@/Utils/HandlerUtil"

import { SkillName } from "@/Protocols/SkillProtocol"

import { skillConfig } from "@/Config/SkillConfig"

class ServerlessUtil {
	get functions (): Record<string, unknown> {
		let functions: Record<string, unknown> = {}

		Object.entries(skillConfig).forEach(([skillName, config]) => {
			functions = {
				...functions,
				...HandlerUtil.getHandlerFunctionConfig({
					skillName: skillName as SkillName,
					...config
				})
			}
		})

		return functions
	}
}

export default new ServerlessUtil()
