import dungeon from "./dungeon.js"

export default class PlayerCharacter {
    constructor(x, y, movementPoints = 1) {
        this.baseMovementPoints = movementPoints
        this.movementPoints = movementPoints
        this.cursors = dungeon.scene.input.keyboard.createCursorKeys()
        this.x = x
        this.y = y
        this.sprite = 29

        dungeon.map.putTileAt(this.sprite, this.x, this.y)
    }

    refresh() {
        this.movementPoints = this.baseMovementPoints
    }

    turn() {
        let oldX = this.x
        let oldY = this.y
        let moved = false

        if (this.movementPoints > 0) {
            if (this.cursors.left.isDown) {
                this.x -= 1
                moved = true
            }

            if (this.cursors.right.isDown) {
                this.x += 1
                moved = true
            }

            if (this.cursors.up.isDown) {
                this.y -= 1
                moved = true
            }

            if (this.cursors.down.isDown) {
                this.y += 1
                moved = true
            }

            if (moved) {
                this.movementPoints -= 1
            }
        }

        // wall collision check

        // wall digging check
        let tileAtDestination = dungeon.map.getTileAt(this.x, this.y)
        if (tileAtDestination.index == dungeon.sprites.wall) {
            tileAtDestination.index = 0
            this.x = oldX
            this.y = oldY
        }

        // tile movement code
        if (this.x !== oldX || this.y !== oldY) {
            dungeon.map.putTileAt(this.sprite, this.x, this.y)
            dungeon.map.putTileAt(dungeon.sprites.floor, oldX, oldY)
        }
    }

    over() {
        return this.movementPoints == 0
    }
}