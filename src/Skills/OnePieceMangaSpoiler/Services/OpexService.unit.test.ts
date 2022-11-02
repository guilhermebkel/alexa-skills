import OpexService from "@/Skills/OnePieceMangaSpoiler/Services/OpexService"

const mockLandingPageHTML = (): string => `
	<article id="post-111968" class="post-111968 post type-post status-publish format-standard has-post-thumbnail sticky hentry category-destaque category-manga category-onepiece category-spoiler">
		<div class="efeitinho animacao-04s"></div>
		<a href="https://onepieceex.net/manga-1065/" rel="bookmark" title="Texto completo de Spoiler 1065">
		<div class="imagem bg-base" style="background-image: url('https://onepieceex.net/wp-content/uploads/2022/10/Pasted-4-7-585x270.jpg')">
			<img class="medidas" alt="Texto completo de Spoiler 1065" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAegAAADhAQMAAAA55rQzAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAACRJREFUeNrtwTEBAAAAwqD1T+1vBqAAAAAAAAAAAAAAAAAA4A02fgABc6eT6QAAAABJRU5ErkJggg==" data-bg="https://onepieceex.net/wp-content/uploads/2022/10/Pasted-4-7-585x270.jpg" style="background-image: url('https://onepieceex.net/wp-content/uploads/2022/10/Pasted-4-7-585x270.jpg')" />
		</div>
		<h1>Spoiler 1065</h1>
		<h2>Seis Vegapunk</h2>
		<time>31 de outubro de 2022</time>
		<p>Sim amigos, começam a sair os primeiros spoilers do Mangá One Piece 1065 ao mundo! Confiram!!!
		E sigam o @Mister27opex no instagran, o spoilador favorito da Opex, para serem avisados de mais spoilers e spoilers completos até...</p>
		</a>
	</article>
`

const mockSpoilerPageHTML = (title: string = "Spoiler"): string => `
	<article id="post">
		<header class="basico">
			<img class="avatar" src="https://onepieceex.net/wp-content/themes/opex_wano/img/avatar/29.png" alt="" />
			<div class="info">
				<h1>${title} 1065</h1>
				<h2>Seis Vegapunk</h2>
				<span class="autor">Por <a href="https://onepieceex.net/author/mr27/" title="Posts de Mr27" rel="author">Mr27</a> <time>31 de outubro de 2022</time></span>
				<span class="comentarios">
				<a href="https://onepieceex.net/manga-1065/#disqus_thread">COMENTÁRIOS</a>
			</div>
			<div class="bg" style="background-image: url('https://onepieceex.net/wp-content/uploads/2022/10/Pasted-4-7.jpg')"></div>
		</header>

		<p>
			<strong>Capítulo 1065: Seis Vegapunk</strong>
		</p>

		<p>
			&#8211; Capa colorida dedicada ao One Piece Film Red.<br />
			&#8211; Serafim Jinbe ataca o grupo de Sanji.<br />
			&#8211; Descobrimos os outros 3 Vegapunk: Edison e Pythagoras são robôs. York é quem come pelos outros Vegapunk.<br />
			&#8211; “Egghead” não é a ilha do futuro, é a ilha do passado porque sua tecnologia é semelhante a tecnologia do “Reino Antigo”.<br />
			&#8211; No final do capítulo, o grupo de Luffy encontra alguns robôs antigos.</p>
		<p>

		<p>
			<strong>Fim do Capítulo One Piece 1065</strong>
		</p>
	</article>
`

describe("OpexService", () => {
	describe("getSpoilerPageUrlByLandingPageHTML()", () => {
		test("Should get spoiler page url when there is a spoiler/manga available", async () => {
			const html = mockLandingPageHTML()

			const spoilerPagePath = OpexService.getSpoilerPageUrlByLandingPageHTML(html)

			expect(spoilerPagePath).toContain("https://")
		})

		test("Should receive null when there is no spoiler/manga available", async () => {
			const spoilerPagePath = OpexService.getSpoilerPageUrlByLandingPageHTML("")

			expect(spoilerPagePath).toBeNull()
		})
	})

	describe("getSpoilerInfoBySpoilerPageHTML()", () => {
		test("Should get content if there is a spoiler/manga available", async () => {
			const html = mockSpoilerPageHTML()

			const spoilerInfo = OpexService.getSpoilerInfoBySpoilerPageHTML(html)

			expect(spoilerInfo.content).toBeTruthy()
		})

		test("Should get date if there is a spoiler/manga available", async () => {
			const html = mockSpoilerPageHTML()

			const spoilerInfo = OpexService.getSpoilerInfoBySpoilerPageHTML(html)

			expect(spoilerInfo.date).toBeInstanceOf(Date)
		})

		test("Should be available if a spoiler is found", async () => {
			const html = mockSpoilerPageHTML("Spoiler")

			const spoilerInfo = OpexService.getSpoilerInfoBySpoilerPageHTML(html)

			expect(spoilerInfo.status).toBe("available")
		})

		test("Should be manga launched if the manga is available", async () => {
			const html = mockSpoilerPageHTML("Manga")

			const spoilerInfo = OpexService.getSpoilerInfoBySpoilerPageHTML(html)

			expect(spoilerInfo.status).toBe("manga-launched")
		})

		test("Should be unavailable if no manga/spoiler is available", async () => {
			const spoilerInfo = OpexService.getSpoilerInfoBySpoilerPageHTML("")

			expect(spoilerInfo.status).toBe("not-found")
			expect(spoilerInfo.content).toBeFalsy()
			expect(spoilerInfo.type).toBeFalsy()
			expect(spoilerInfo.date).toBeFalsy()
		})
	})
})
