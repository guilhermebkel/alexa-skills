import { AwsAlexaEventToken } from "@serverless/typescript"

export type FnConfig = {
	[k: string]: {
		handler?: string
		events?: Array<{
			alexaSkill: AwsAlexaEventToken
		}>
	}
}

export type CustomSkillConfig = {
	id: string
	manifest: {
		publishingInformation: {
			locales: Record<string, {
				name: string
			}>
		}
		apis: {
			custom: {
				endpoint?: {
					uri: string
				}
			}
		}
		manifestVersion: string
	}
	models: Record<string, {
		interactionModel: {
			languageModel: {
				invocationName: string
				intents: Array<{
					name: string
					samples: string[]
				}>
			}
		}
	}>
}

export type CustomConfig = {
	alexa: {
		skills: CustomSkillConfig[]
	}
}
