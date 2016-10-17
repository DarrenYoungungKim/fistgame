/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var BOUNCE;
var GRAVITY;
var ground;
var cursors;
var hitPlatform;
var stars;
var scoreText;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

function create() {
    //we're going to be using physics, so enable the Arcade Physics systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(4, 5, 'star');
    // A simple background for a simple game
    game.add.sprite(0, 0, 'sky');
    scoreText = game.add.text(16, 16, 'score:0', {
        fontSize: '32px',
        fill: '#000'
    });
    player = game.add.sprite(100, 100, "dude");

    game.physics.arcade.enable(player);
    platforms = game.add.group();
    ground = platforms.create(0, game.world.height - 64, "ground");
    platforms.enableBody = true;
    player.body.gravity.y = 200;
    game.physics.arcade.enable(platforms)
    ground.body.immovable = true;





}

function update() {
    // Collide the player and the stars with the platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();

    player.body.velocity.x = 0;


    if (cursors.left.isDown) {
        // move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    if (cursors.right.isDown) {
        //move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
    // stand still
        player.animations.stop();
    player.frame = 4;
    }
    //Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -2000;
    }
    if (cursors.down.isDown) {
        player.body.velocity.y = 2000;
    }



    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectstar, null, this);

}

function collectstar(player, star) {
    // Removes the star from the screen
    star.kill();



}