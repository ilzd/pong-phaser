class Menu extends Phaser.Scene {
  create() {
    this.titleText = 'Pong\nGame'
    this.titleLabel = this.add.text(300, -50, this.titleText, {
      font: '86px Arial',
      color: '#FFFFFF',
      align: 'center'
    })
    this.titleLabel.setOrigin(0.5)
    this.add.tween({
      targets: this.titleLabel,
      y: 300,
      ease: 'bounce.out',
      duration: 1000
    })
  
    this.startText = this.add.text(300, 500, 'press up arrow to start', {
      font: '33px Arial',
      color: '#FFFFFF'
    })
    this.startText.setInteractive().setOrigin(0.5)
    this.add.tween({
      targets: this.startText,
      scale: '+=0.1',
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'sine.in'
    })

    this.input.keyboard.on('keydown', (e) => {
      if (e.code === 'ArrowUp')this.scene.start('play')
    })
  }
}