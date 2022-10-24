import { SkillName } from "@/Protocols/SkillProtocol"
import { GetHandlerConfigInput } from "@/Protocols/HandlerProtocol"

export const skillConfig: Record<SkillName, Omit<GetHandlerConfigInput, "skillName">> = {
	OnePieceMangaSpoiler: {
		skillId: "amzn1.ask.skill.da25faec-9e5d-42f0-a29d-67f897d1ac43"
	}
}
