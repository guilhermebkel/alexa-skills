import { Handler, HandlerProps, HandlerResponse } from "@/Protocols/HandlerProtocol"

import HandlerModule from "@/Modules/HandlerModule"
import OpexModule from "@/Skills/OnePieceMangaSpoiler/Modules/OpexModule"

class OnePieceMangaSpoilerHandler implements Handler {
	async onLaunch ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		const spoilerInfo = await OpexModule.lookup()

		if (spoilerInfo.status === "available") {
			return responseBuilder.speak("Temos spoiler essa semana!").getResponse()
		}
		
		if (spoilerInfo.status === "manga-launched") {
			return responseBuilder.speak("O mangá dessa semana já foi lançado!").getResponse()
		}

		if (spoilerInfo.status === "not-found") {
			return responseBuilder.speak("Nenhum spoiler foi encontrado nessa semana :(").getResponse()
		}
	}

	async onHelp ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		return responseBuilder.speak("Need help?").getResponse()
	}

	async onCancelAndStop ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		return responseBuilder.speak("Cancel and Stop!").getResponse()
	}

	async onFallback ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		return responseBuilder.speak("Fallbacked!").getResponse()
	}

	async onSessionEnded ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		return responseBuilder.speak("Ended session!").getResponse()
	}

	async onIntentReflector ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		return responseBuilder.speak("Reflected intent!").getResponse()
	}

	async onError ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
		return responseBuilder.speak("Failed!").getResponse()
	}
}

export const main = HandlerModule.adapt(new OnePieceMangaSpoilerHandler())
