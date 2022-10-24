import { Handler, HandlerProps, HandlerFnCallbackResponse } from "@/Protocols/HandlerProtocol"

import HandlerModule from "@/Modules/HandlerModule"

class OnePieceMangaSpoilerHandler implements Handler {
  async onExecution (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Working as expected!")
  }

	async onLaunch (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Launched!")
  }

	async onHelp (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Need help?")
  }

	async onCancelAndStop (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Cancel and Stop!")
  }

	async onFallback (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Fallbacked!")
  }

	async onSessionEnded (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Ended session!")
  }

	async onIntentReflector (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Reflected intent!")
  }

	async onError (props: HandlerProps): Promise<HandlerFnCallbackResponse> {
    return props.response.speak("Failed!")
  }
}

export default HandlerModule.export("OnePieceMangaSpoiler", new OnePieceMangaSpoilerHandler())
