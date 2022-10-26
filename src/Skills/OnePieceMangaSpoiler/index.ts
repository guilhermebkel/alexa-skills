import { Handler, HandlerProps, HandlerResponse } from "@/Protocols/HandlerProtocol"

import HandlerModule from "@/Modules/HandlerModule"

class OnePieceMangaSpoilerHandler implements Handler {
	async onLaunch ({ responseBuilder }: HandlerProps): Promise<HandlerResponse> {
    return responseBuilder.speak("Launched!").getResponse()
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
