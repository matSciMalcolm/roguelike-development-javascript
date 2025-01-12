import GenericItem from "./genericItem.js"
import dungeon from "../dungeon.js"

export default class LongSword extends GenericItem {
	constructor(x, y) {
		super(x, y)
		this.tile = 992
		this.name = "A Long Sword"
		this.description = "A long sword that causes between 4 and 8 damage."
		this.weapon = true

		dungeon.initializeEntity(this)

	}

	damage() {
		return Phaser.Math.Between(4, 8)
	}
}