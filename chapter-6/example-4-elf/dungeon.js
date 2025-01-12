import level from "./level.js"
import tm from "./turnManager.js"

let dungeon = {
    msgs: [],
    sprites: {
        floor: 0,
        wall: 554,
    },
    tileSize: 16,
    initialize: function (scene) {
        this.scene = scene
        this.level = level
        this.levelWithTiles = level.map(r => r.map(t => t == 1 ? this.sprites.wall : this.sprites.floor))

        const config = {
            data: this.levelWithTiles,
            tileWidth: this.tileSize,
            tileHeight: this.tileSize,
        }
        const map = scene.make.tilemap(config)
        const tileset = map.addTilesetImage('tiles', 'tiles', this.tileSize, this.tileSize, 0, 1) // key: texture key
        this.map = map.createDynamicLayer(0, tileset, 0, 0)

    },
    isWalkableTile: function (x, y) {
        // check all entities.
        let allEntities = [...tm.entities]
        for (let e = 0; e < allEntities.length; e++) {
            let entity = allEntities[e]
            if (entity.sprite && entity.x == x && entity.y == y) {
                return false
            }
        }
        // check level
        let tileAtDestination = dungeon.map.getTileAt(x, y)
        return tileAtDestination.index !== dungeon.sprites.wall
    },
    entityAtTile: function (x, y) {
        let allEntities = [...tm.entities]
        for (let e = 0; e < allEntities.length; e++) {
            let entity = allEntities[e]
            if (entity.sprite && entity.x == x && entity.y == y) {
                return entity
            }
        }
        return false
    },
    removeEntity: function (entity) {
        tm.entities.delete(entity)
        entity.sprite.destroy()
        delete entity.sprite
        entity.onDestroy()
    },
    itemPicked: function (entity) {
        entity.sprite.destroy()
        delete entity.sprite
    },
    initializeEntity: function (entity) {
        if (entity.x && entity.y) {
            let x = this.map.tileToWorldX(entity.x)
            let y = this.map.tileToWorldY(entity.y)
            entity.sprite = this.scene.add.sprite(x, y, "tiles", entity.tile)
            entity.sprite.setOrigin(0)
        }
    },
    moveEntityTo: function (entity, x, y) {
        entity.moving = true
        entity.x = x
        entity.y = y

        this.scene.tweens.add({
            targets: entity.sprite,
            onComplete: () => {
                entity.moving = false
            },
            x: this.map.tileToWorldX(x),
            y: this.map.tileToWorldY(y),
            ease: "Power2",
            duration: 100
        })
    },
    distanceBetweenEntities: function (e1, e2) {
        let grid = new PF.Grid(dungeon.level)
        let finder = new PF.AStarFinder({
            allowDiagonal: true
        })
        let path = finder.findPath(e1.x, e1.y, e2.x, e2.y, grid)
        if (path.length >= 2) {
            return path.length
        } else {
            return false
        }
    },
    attackEntity: function (attacker, victim, rangedAttack = false) {
        attacker.moving = true
        attacker.tweens = attacker.tweens || 0
        attacker.tweens += 1

        if (!rangedAttack) {
            this.scene.tweens.add({
                targets: attacker.sprite,
                onComplete: () => {
                    attacker.sprite.x = this.map.tileToWorldX(attacker.x)
                    attacker.sprite.y = this.map.tileToWorldX(attacker.y)
                    attacker.moving = false
                    attacker.tweens -= 1

                    let attack = attacker.attack()
                    let protection = victim.protection()
                    let damage = attack - protection
                    if (damage > 0) {
                        victim.healthPoints -= damage

                        this.log(`${attacker.name} does ${damage} damage to ${victim.name}.`)

                        if (victim.healthPoints <= 0) {
                            this.removeEntity(victim)
                        }
                    }
                },
                x: this.map.tileToWorldX(victim.x),
                y: this.map.tileToWorldY(victim.y),
                ease: "Power2",
                hold: 20,
                duration: 80,
                delay: attacker.tweens * 200,
                yoyo: true
            })
        } else {
            const x = this.map.tileToWorldX(attacker.x)
            const y = this.map.tileToWorldX(attacker.y)
            const sprite = dungeon.scene.add.sprite(x, y, "tiles", rangedAttack).setOrigin(0)

            this.scene.tweens.add({
                targets: sprite,
                onComplete: () => {
                    attacker.moving = false
                    attacker.tweens -= 1

                    let attack = attacker.attack()
                    let protection = victim.protection()
                    let damage = attack - protection
                    if (damage > 0) {
                        victim.healthPoints -= damage

                        this.log(`${attacker.name} does ${damage} damage to ${victim.name}.`)

                        if (victim.healthPoints <= 0) {
                            this.removeEntity(victim)
                        }
                    }
                    sprite.destroy()
                },
                x: this.map.tileToWorldX(victim.x),
                y: this.map.tileToWorldY(victim.y),
                ease: "Power2",
                hold: 20,
                duration: 360,
                delay: attacker.tweens * 200
            })
        }


    },
    log: function (text) {
        this.msgs.unshift(text)
        this.msgs = this.msgs.slice(0, 8)
    }
}

export default dungeon