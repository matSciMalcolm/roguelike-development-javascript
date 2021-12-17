import GenericItem from "./genericItem.js"
import dungeon from "../dungeon.js"

export default class AttackPotion extends GenericItem {
	constructor(x, y) {
		super(x, y)
		this.tile = 817
		this.name = "Magdalore's Concoction"
		this.description = "A translucent teal liquid in a sword shaped flask."
		this.duration = 3
		this.actionPoints = 1
		this.weapon = true

		dungeon.initializeEntity(this)

	}

	turn() {
		if (dungeon.player.items.includes(this) && this.active == true) {
			dungeon.log(`Magdalore's concoction flows through you providing great strength for ${this.duration} turns.`)
			this.duration -= 1
			this.actionPoints = 0
		}
		this.actionPoints = 0
	}

	refresh() {
		this.actionPoints = 1
	}

	damage() {
		return 10
	}

	over() {
		if (dungeon.player.items.includes(this) && this.duration == 0) {
			dungeon.log(`The power of Magdalore's concoction fades.`)
			dungeon.player.removeItemByProperty("duration", 0)
		}
		return this.actionPoints == 0
	}
}