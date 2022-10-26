export type SkillName = "OnePieceMangaSpoiler"

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
			name: string
			samples: string[]
		}>
	}>
}
