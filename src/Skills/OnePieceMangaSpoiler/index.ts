import { HandlerFn } from "@/Protocols/HandlerProtocol"

import HandlerUtil from "@/Utils/HandlerUtil"

const handlerFn: HandlerFn = (event, context, callback) => {
  console.log(event, context, callback)
  return callback(null, {});
}

export default HandlerUtil.exportHandler(handlerFn)
