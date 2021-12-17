import GenericItem from "./genericItem.js"
import dungeon from "../dungeon.js"
import tm from "../turnManager.js"

function checkEntitiesByName(entities, value) {
	let names = [...entities].map(x => x.name)
	return names.indexOf(value)
}


export default class SeekerGem extends GenericItem {
	constructor(x, y) {
		super(x, y)
		this.tile = 721
		this.name = "Seeker's Gem"
		this.description = "A cursed gem that is now stuck to your hand. You can only remove it by finding a potion."
		this.actionPoints = 1
		this.duration = 1
		this.cursed = true

		dungeon.initializeEntity(this)

	}



	turn() {
		/* Should we check if a seerker exists? */

		if (dungeon.player.items.includes(this)) {
			let idx = checkEntitiesByName(tm.entities, "Seeker")
			if (idx >= 0) {
				let seeker = [...tm.entities].filter(x => x.name == "Seeker")[0]
				seeker.active = true
				dungeon.log(`Cursed gem draws the seeker to the player. Find potion to cure.`)
				seeker.movementPoints = this.duration
				this.duration += 1
				this.actionPoints = 0
			}
			else {
				this.actionPoints = 0
			}
		}

		else {
			this.actionPoints = 0
		}

	}

	refresh() {
		this.actionPoints = 1
	}

	onDestroy() {
		let idx = checkEntitiesByName(tm.entities, "Seeker")
		if (idx >= 0) {
			let seeker = [...tm.entities].filter(x => x.name == "Seeker")[0]
			tm.removeEntity(seeker)

		}
	}

	over() {
		return this.actionPoints == 0
	}
}