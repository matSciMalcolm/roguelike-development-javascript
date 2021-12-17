import dungeon from "./dungeon.js"
import tm from "./turnManager.js"
import PlayerCharacter from "./player.js"
import turnTracker from "./turnTracker.js"

const scene = {
    preload: function () {
        // load tiles ...
        this.load.spritesheet('tiles', 'assets/colored.png', { frameWidth: 16, frameHeight: 16, spacing: 1 })
        this.load.bitmapFont("arcade", "assets/font/arcade.png", "assets/font/arcade.xml");
    },
    create: function () {
        dungeon.initialize(this)
        let player = new PlayerCharacter(15, 15, 3)
        tm.addEntity(player)


    },
    update: function () {
        turnTracker.count = tm.turn_count

        if (tm.over()) {
            tm.turn_count += 1
            console.log(turnTracker.count)
            tm.refresh()
        }
        tm.turn()
    }
}

const config = {
    type: Phaser.AUTO,
    width: 80 * 16,
    height: 50 * 16,
    backgroundColor: "#000",
    parent: "game",
    pixelArt: true,
    zoom: 1,
    scene: scene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config)