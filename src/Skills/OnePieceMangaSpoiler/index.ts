import { Handler, HandlerProps } from "@/Protocols/HandlerProtocol"
import { Response } from "@/Protocols/ResponseProtocol"

import HandlerModule from "@/Modules/HandlerModule"

class OnePieceMangaSpoilerHandler implements Handler {
  async onExecution ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Working as expected!").send()
  }

	async onLaunch ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Launched!").send()
  }

	async onHelp ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Need help?").send()
  }

	async onCancelAndStop ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Cancel and Stop!").send()
  }

	async onFallback ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Fallbacked!").send()
  }

	async onSessionEnded ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Ended session!").send()
  }

	async onIntentReflector ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Reflected intent!").send()
  }

	async onError ({ response }: HandlerProps): Promise<Response> {
    return response.speak("Failed!").send()
  }
}

export default HandlerModule.export("OnePieceMangaSpoiler", new OnePieceMangaSpoilerHandler())
