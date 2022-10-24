import { HandlerFn } from "@/Protocols/HandlerProtocol"

import HandlerUtil from "@/Utils/HandlerUtil"

const handlerFn: HandlerFn = (event, context, callback) => {
  console.log(event, context, callback)

  return callback(null, {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: "Working as expected!"
      },
      shouldEndSession: false
    }
  })
}

export default HandlerUtil.exportHandler(handlerFn)
