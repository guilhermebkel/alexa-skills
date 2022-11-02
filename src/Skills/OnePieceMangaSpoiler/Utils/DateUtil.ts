class DateUtil {
	/**
	 *
	 * @param BRHumanDate A date in the format: "DIA" de "MÊS" de "ANO"
	 */
	turnBRHumanDateIntoDate (BRHumanDate: string): Date {
		const [day, month, year] = BRHumanDate.split(" de ")

		const monthMap: Record<string, number> = {
			janeiro: 0,
			fevereiro: 1,
			março: 2,
			abril: 3,
			maio: 4,
			junho: 5,
			julho: 6,
			agosto: 7,
			setembro: 8,
			outubro: 9,
			novembro: 10,
			dezembro: 11
		}

		const date = new Date()

		const formattedMonth = monthMap[month]
		date.setMonth(formattedMonth)

		const formattedDay = Number(day)
		date.setDate(formattedDay)

		const formattedYear = Number(year)
		date.setFullYear(formattedYear)

		return date
	}
}

export default new DateUtil()
