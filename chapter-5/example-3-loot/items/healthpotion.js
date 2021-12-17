import GenericItem from "./genericItem.js"
import dungeon from "../dungeon.js"

export default class HealthPotion extends GenericItem {
	constructor(x, y) {
		super(x, y)
		this.tile = 818
		this.name = "Healing Potion"
		this.description = "A potion that heals the character when equipped."

		dungeon.initializeEntity(this)

	}

	equip(itemNumber) {
		let healing = Phaser.Math.Between(10, 30)
		let msg = ""
		if (healing <= 20) {
			msg = "weak"
		}
		else if (healing > 20 && healing <= 28) {
			msg = "moderate"
		}
		else {
			msg = "exceptional"
		}
		dungeon.log(`As you sip from the potion bottle, you feel a ${msg} regenerative force suturing your wounds closed.`)
		dungeon.player.healthPoints += healing
		dungeon.log(`${dungeon.player.name} heals for ${healing} damage.`)
		dungeon.player.removeItem(itemNumber)
	}
}