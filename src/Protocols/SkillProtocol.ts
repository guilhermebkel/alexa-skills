export type SkillName = "OnePieceMangaSpoiler"

export type CustomIntentName = "OnePieceMangaSpoilerIntent"

export type SkillConfig = {
	name: SkillName
	id: string
	lambdaId: string
	locales: Record<string, {
		name: string
	}>
	models: Record<string, {
		invocationName: string
		customIntents: Array<{
			name: CustomIntentName
			samples: string[]
		}>
	}>
}
