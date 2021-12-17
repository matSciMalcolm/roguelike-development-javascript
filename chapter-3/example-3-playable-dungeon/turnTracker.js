// Turn Tracker
const turnTracker = {
    count: 0,
    clear: (s) => s.bitmapText.clear(),
    draw: (s) => {
        s.add.bitmapText(400,
            config.height - 100,
            "arcade",
            `Turn: ${turnTracker.count}`).setOrigin(1.0);
    }
}

export default turnTracker;