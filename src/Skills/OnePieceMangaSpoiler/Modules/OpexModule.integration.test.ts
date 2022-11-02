import OpexModule from "@/Skills/OnePieceMangaSpoiler/Modules/OpexModule"

describe("OpexModule", () => {
	describe("lookup()", () => {
		test("Should not throw when looking up a spoiler", async () => {
			const lookupPromise = OpexModule.lookup()

			await expect(lookupPromise).resolves.not.toThrow()
		})
	})
})
