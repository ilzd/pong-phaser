class PlayScene extends Phaser.Scene {
  create() {
    this.playerScore = 0
    this.enemyScore = 0

    this.playerScoreLabel = this.add.text(300, 600, this.playerScore, {
      font: '250px Arial',
      color: '#00FF0044',
    }).setOrigin(0.5)

    this.enemyScoreLabel = this.add.text(300, 200, this.playerScore, {
      font: '250px Arial',
      color: '#FF000044',
    }).setOrigin(0.5)

    this.startSpeed = 300
    this.physics.world.setBounds(0, 0, 600, 800)
    this.createPads()
    this.createBall() 
    this.launchBall()
    this.add.line(300, 400, 0, 0, 500, 0, 0xFFFFFF, 0.5)
    this.keys = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.ball, [this.enemyPad, this.playerPad], (b1, b2) => {
      let dir = new Phaser.Math.Vector2((b1.x - b2.x) / 2, b1.y - b2.y)
      this.ballSpeed += 20
      dir.setLength(this.ballSpeed)
      b1.setVelocity(dir.x, dir.y)
    })

    let particle = this.add.particles('pixel')
    this.emitter = particle.createEmitter({
      quantity: 40,
      scale: {max: 4, min: 0.5},
      lifespan: 1000,
      speed: {max: 200, min: 0},
      rotate: {max: 45, min: 0},
      on: false,
      alpha: {start: 1, end: 0}
    })
  }

  update() {
    this.movePlayerPad()
    this.moveEnemyPad()
    this.checkWinConditions()
  }

  createBall() {
    this.ball = this.physics.add.image(300, 400, 'pixel').setScale(10)
    this.ball.setCollideWorldBounds(true)
    this.ball.setBounce(1)
    this.ballRadius = (this.ball.height * this.ball.scale) / 2
  }

  createPads() {
    this.enemyPad = this.physics.add.image(300, 15, 'pad').setScale(0.75, 1)
    this.enemyPad.setCollideWorldBounds(true)
    this.enemyPad.setPushable(false)
    
    this.playerPad = this.physics.add.image(300, 785, 'pad').setScale(0.75, 1)
    this.playerPad.setCollideWorldBounds(true)
    this.playerPad.setPushable(false)
  }
  
  launchBall() {
    this.ballSpeed = this.startSpeed
    this.ball.setVisible(true)

    this.add.tween({
      targets: this.ball,
      angle: 260,
      scale: '*=1.5',
      duration: 500,
      yoyo: true,
      ease: 'sine.out',
    })

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.ball.setVelocity(0, (Phaser.Math.FloatBetween(0, 1) < 0.5) ? this.ballSpeed : -this.ballSpeed  )
      }
    })
    this.startSpeed += 25
  }

  movePlayerPad() {
    let dir = 0
    if(this.keys.left.isDown) {
      dir--
    }
    if(this.keys.right.isDown) {
      dir++
    }

    this.playerPad.body.velocity.x = dir * 200
  }

  moveEnemyPad() {
    let dir = this.ball.x - this.enemyPad.x
    if(dir < -5) {
      dir = -1
    } else if (dir > 5) {
      dir = 1
    } else {
      dir = 0
    }
    this.enemyPad.body.velocity.x = 250 * dir
  }

  checkWinConditions() {
    let ended = false
    if (this.ball.y + this.ballRadius > 795) {
      this.enemyScore++
      this.enemyScoreLabel.setText(this.enemyScore)
      ended = true
      this.cameras.main.flash(500, 200, 0, 0)
      this.tweens.add({
        targets: this.enemyScoreLabel,
        scale: {from: 1.3, to: 1},
        duration: 500
      })
    }
    if (this.ball.y - this.ballRadius < 5) {
      this.playerScore++
      this.playerScoreLabel.setText(this.playerScore)
      ended = true
      this.cameras.main.flash(500, 0, 200, 0)
      this.tweens.add({
        targets: this.playerScoreLabel,
        scale: {from: 1.3, to: 1},
        duration: 500
      })
    }
    
    if(ended) {
      this.cameras.main.shake(200, 0.01)
      this.emitter.setPosition(this.ball.x, this.ball.y)
      this.emitter.explode()
      this.ball.setVelocity(0, 0)
      this.ball.setPosition(300, 400)
      this.ball.setVisible(false)
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          if(this.playerScore > 4 || this.enemyScore > 4) {
            this.scene.start('menu')
            return
          }
          this.launchBall()
        }
      })
    }
  }
}