import { SkillConfig } from "@/Protocols/SkillProtocol"

export const skillConfig: SkillConfig[] = [
	{
		name: "OnePieceMangaSpoiler",
		id: "amzn1.ask.skill.da25faec-9e5d-42f0-a29d-67f897d1ac43",
		lambdaId: "arn:aws:lambda:us-east-1:465909715637:function:alexa-skills-dev-OnePieceMangaSpoiler",
		locales: {
			"pt-BR": {
				name: "one-piece-manga-spoiler"
			}
		},
		models: {
			"pt-BR": {
				invocationName: "qual o spoiler de one piece dessa semana",
				customIntents: [
					{
						name: "OnePieceMangaSpoilerIntent",
						samples: [
							"one piece spoiler",
							"one piece manga spoiler"
						]
					}
				]
			}
		}
	}
]
