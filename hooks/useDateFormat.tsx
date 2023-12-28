export const useDateFormat = () => {
    const dateFormatter = (date: Date): string => {
        if (!date) return ""

        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short",
        }

        const formatter = new Intl.DateTimeFormat("ja-JP", options)
        return formatter.format(date)
    }

    return { dateFormatter }
}
