class LoadScene extends Phaser.Scene {
  preload() {
    this.load.image('pad', 'src/assets/pad.png')
    this.load.image('ball', 'src/assets/ball.png')
    this.load.image('pixel', 'src/assets/pixel.png')
  }

  create() {
    this.scene.start('menu')
  }
}
