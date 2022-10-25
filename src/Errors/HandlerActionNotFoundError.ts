export class HandlerActionNotFoundError extends Error {
	constructor () {
		super("No handler action was found, make sure the event data was received.")

		this.name = "HandlerActionNotFoundError"
	}
}
