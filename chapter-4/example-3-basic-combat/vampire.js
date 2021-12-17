import BasicMonster from "./monster.js"
import dungeon from "./dungeon.js"

export default class Vampire extends BasicMonster {
    constructor(x, y) {
        super(x, y)
        this.name = "Vampire"
        this.movementPoints = 0
        this.actionPoints = 3
        this.tile = 32
    }

    refresh() {
        let oldX = this.x
        let oldY = this.y

        // https://github.com/qiao/PathFinding.js
        let pX = dungeon.player.x
        let pY = dungeon.player.y
        let grid = new PF.Grid(dungeon.level)
        let finder = new PF.AStarFinder()
        let path = finder.findPath(oldX, oldY, pX, pY, grid)
        if (path.length < 15) {
            this.movementPoints = 3
        } else {
            this.movementPoints = 0
        }

        this.actionPoints = 1
    }

    attack() {
        return 1
    }
}