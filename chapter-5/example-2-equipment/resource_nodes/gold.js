/**
 * This class is the parent for all collectible resources.
 */
import dungeon from "../dungeon.js"

export default class ResourceNode {
    /**
     * A resource node should be a collectable entity that
     * increases the players assets.
     */
    constructor(x, y) {
        this.x = x
        this.y = y
        this.tile = 1
        this.currency_value = 0
    }

    refresh() {

    }

    turn() {

    }

    over() {
        return true

    }



}

export class Gold extends ResourceNode {

    constructor(x, y) {
        super(x, y)
        this.currency_value = 10
        this.tile = 69
        dungeon.initializeEntity(this)
    }

}