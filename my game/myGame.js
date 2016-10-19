/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var bounce;
var gravity;
var ground;
var ground2;
var ground3;
var ground4;
var cursors;
var hitPlatform;
var stars;
var scoreText;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('p', 'assets/p.png');
}

function create() {
    //we're going to be using physics, so enable the Arcade Physics systems
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(4, 5, 'star');
    // A simple background for a simple game
    game.add.sprite(0, 0, 'sky');
    player = game.add.sprite(100, 100, "dude");

    game.physics.arcade.enable(player);
    platforms = game.add.group();
    ground = platforms.create(0, game.world.height - 64, "ground");
    platforms.enableBody = true;
    player.body.gravity.y = 400;
    game.physics.arcade.enable(platforms);
    ground.body.immovable = true;
    
    ground2 = platforms.create(500, game.world.height - 150, "ground");
    platforms.enableBody = true;
    player.body.gravity.y =400;
    game.physics.arcade.enable(platforms);
    ground2.body.immovable = true;
    
    ground3 = platforms.create(220, game.world.height - 100, "ground");
    platforms.enableBody = true;
    player.body.gravity.y = 400;
    game.physics.arcade.enable(platforms);
    ground3.body.immovable = true;
    
    ground3 = platforms.create(220, game.world.height - 100, "ground");
    platforms.enableBody = true;
    player.body.gravity.y = 400;
    game.physics.arcade.enable(platforms);
    ground3.body.immovable = true;
       // Our two animations, walking left and right.
    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);
    
    stars = game.add.group();
    stars.enableBody = true;
    
    // Here we'll create 36 of them evenly spaced a part
    for (var i = 0; i < 12; i++)
    { 
        // create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0,'star');
        // Let gravity do its thing
        star.body.gravity. y = 6;
        // This just gives each star sightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16,16,'score: 0',{fontSize: '32px', fill: '#000'});




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
    else if (cursors.right.isDown) {
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
        player.body.velocity.y = -200;
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