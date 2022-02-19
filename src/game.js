const game = new Phaser.Game({
  parent: 'phaser-game',
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH  
  },
  physics: {
    default: 'arcade'
  }
})

game.scene.add('load', LoadScene)
game.scene.add('menu', Menu)
game.scene.add('play', PlayScene)

game.scene.start('load')