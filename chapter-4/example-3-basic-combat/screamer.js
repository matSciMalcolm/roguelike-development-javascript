import BasicMonster from "../example-3-basic-combat/monster.js"

export default class Screamer extends BasicMonster {
    constructor(x, y) {
        super(x, y)
        this.movementPoints = 3
        this.actionPoints = 1
        this.tile = 27
        //dungeon.initializeEntity(this)
    }

    refresh() {
        this.movementPoints = 3
        this.actionPoints = 1
    }

    attack() {
        return 1
    }
}