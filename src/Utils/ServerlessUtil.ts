import HandlerUtil from "@/Utils/HandlerUtil"

import { CustomConfig, FnConfig, CustomSkillConfig } from "@/Protocols/ServerlessProtocol"

import { skillConfig } from "@/Config/SkillConfig"

class ServerlessUtil {
	get functions (): FnConfig {
		const functions: FnConfig = {}

		skillConfig.forEach((skill) => {
			functions[skill.name] = {
				handler: HandlerUtil.buildHandlerPath(skill.name),
				events: [
					{
						alexaSkill: skill.id
					}
				]
			}
		})

		return functions
	}

	get custom (): CustomConfig {
		const custom: CustomConfig = {
			alexa: {
				skills: []
			}
		}

		skillConfig.forEach(skill => {
			const adaptedSkill: CustomSkillConfig = {
				id: skill.id,
				manifest: {
					publishingInformation: {
						locales: skill.locales
					},
					apis: {
						custom: {
							...(skill.lambdaId && {
								endpoint: {
									uri: skill.lambdaId
								}
							})
						}
					},
					manifestVersion: "1.0"
				},
				models: {}
			}

			Object.entries(skill.models).forEach(([locale, model]) => {
				adaptedSkill.models[locale] = {
					interactionModel: {
						languageModel: {
							invocationName: model.invocationName,
							intents: [
								{
									name: "AMAZON.CancelIntent",
									samples: []
								},
								{
									name: "AMAZON.HelpIntent",
									samples: []
								},
								{
									name: "AMAZON.StopIntent",
									samples: []
								},
								{
									name: "AMAZON.NavigateHomeIntent",
									samples: []
								},
								...model.intents
							]
						}
					}
				}
			})

			custom.alexa.skills.push(adaptedSkill)
		})

		return custom
	}
}

export default new ServerlessUtil()
