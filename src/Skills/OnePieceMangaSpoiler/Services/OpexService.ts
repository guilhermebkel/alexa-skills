import CrawlerService from "@/Skills/OnePieceMangaSpoiler/Services/CrawlerService"

import DateUtil from "@/Skills/OnePieceMangaSpoiler/Utils/DateUtil"

import { SpoilerLookup } from "@/Skills/OnePieceMangaSpoiler/Protocols/OpexProtocol"

class OpexService {
	getSpoilerPageUrlByLandingPageHTML (html: string): string | null {
		const [postElement] = CrawlerService.findElements({
			html,
			selector: "article.category-manga.category-spoiler"
		})

		if (!postElement) {
			return null
		}

		const linkElement = CrawlerService.findChildElement({
			currentElement: postElement,
			selector: {
				type: "tag",
				value: "a"
			}
		})

		const spoilerPageUrl = linkElement?.attribs?.href

		if (!spoilerPageUrl) {
			return null
		}

		return spoilerPageUrl
	}

	getSpoilerInfoBySpoilerPageHTML (html: string): SpoilerLookup {
		return {
			status: this.getSpoilerInfoStatusBySpoilerPageHTML(html),
			content: this.getSpoilerInfoContentBySpoilerPageHTML(html),
			type: this.getSpoilerInfoTypeBySpoilerPageHTML(html),
			date: this.getSpoilerInfoDateBySpoilerPageHTML(html)
		}
	}

	private getSpoilerInfoDateBySpoilerPageHTML (html: string): Date | null {
		const [dateElement] = CrawlerService.findElements({
			html,
			selector: "#post > header > div.info > span.autor > time"
		})

		const BRHumanDate = dateElement?.children?.[0]?.data || ""

		if (BRHumanDate) {
			return DateUtil.turnBRHumanDateIntoDate(BRHumanDate)
		} else {
			return null
		}
	}

	private getSpoilerInfoTypeBySpoilerPageHTML (html: string): SpoilerLookup["type"] {
		const [titleElement] = CrawlerService.findElements({
			html,
			selector: "#post > header > div.info > h1"
		})

		const title = titleElement?.children?.[0]?.data || ""

		if (title) {
			return "short"
		}
	}

	private getSpoilerInfoStatusBySpoilerPageHTML (html: string): SpoilerLookup["status"] {
		const [titleElement] = CrawlerService.findElements({
			html,
			selector: "#post > header > div.info > h1"
		})

		const title = titleElement?.children?.[0]?.data || ""

		const isSpoilerTitle = title.startsWith("Spoiler")

		if (isSpoilerTitle) {
			return "available"
		}

		const isMangaTitle = title.startsWith("Manga")

		if (isMangaTitle) {
			return "manga-launched"
		}

		return "not-found"
	}

	private getSpoilerInfoContentBySpoilerPageHTML (html: string): string | null {
		const contentElements = CrawlerService.findElements({
			html,
			selector: "article#post > p"
		})

		const contentParts: string[] = []

		contentElements.forEach((contentElement) => {
			contentElement?.children?.forEach(child => {
				const content = child?.data || ""

				const isValidSpoilerContent = content.startsWith("\n\t\t\t–")

				if (isValidSpoilerContent) {
					contentParts.push(content)
				}
			})
		})

		const isThereAnyContent = contentParts?.length > 0

		if (isThereAnyContent) {
			return contentParts.join("")
		} else {
			return null
		}
	}
}

export default new OpexService()
