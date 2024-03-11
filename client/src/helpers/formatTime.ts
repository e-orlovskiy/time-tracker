export const formatDuration = (seconds: number) => {
	interface IUnit {
		name: string
		seconds: number
	}

	if (seconds == 0) return '0s'

	let finalArr = []
	let finalStr = ''

	const units = [
		{ name: 'y', seconds: 31536000 },
		// { name: 'month', seconds: 2592000 },
		{ name: 'd', seconds: 86400 },
		{ name: 'h', seconds: 3600 },
		{ name: 'm', seconds: 60 },
		{ name: 's', seconds: 1 }
	]

	while (seconds > 0) {
		const unit: IUnit | undefined = units.find(unit => unit.seconds <= seconds)
		const time = finalArr.find(time => time.name == unit!.name)

		if (time) time.count += 1
		else finalArr.push({ name: unit!.name, count: 1 })

		seconds -= unit!.seconds
	}

	finalArr = finalArr.map(el => {
		return `${el.count} ${el.name}`
	})

	finalArr.forEach((el, i) => {
		switch (i) {
			case 0:
				finalStr += `${el}`
				break
			// case finalArr.length - 1:
			// 	finalStr += ` and ${el}`
			// 	break
			default:
				finalStr += `, ${el}`
				break
		}
	})

	return finalStr
}
