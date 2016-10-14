/*global Phaser*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var ground;
var player;
var BOUNCE;
var GRAVITY;
var cursors;
var hitPlatform;
var stars;
var scoreText
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assents/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spirtesheet('dud', 'assets/dud.png', 32,48);

}

function create() {
    // we're going to be using physics, so enable the Arcade Physics systems
    game.physics.startSystem(Phaser.physics.Arcade);
    game.add.spirte(0,0, 'star');
    // A simple background for a simple game
    game.add.spirte(0,0, 'sky');
    // The platforms groups contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    // We will enable physics for any object that is created in this groups
    platforms.enableBody = true;
    //Here we create the ground.
    ground = platforms.create(0, game.world.height - 64, 'ground');
    // scale it to fit the fit the width of the game(the original spirte is 400x32 in size)
    ground.scale.setTo(2,2);
    // This stops it from falling away when you jump on it gound.body.immovable = true;
    var ledge = platforms.create(0,1, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(1,0, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(1,2, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(1,3, 'ground');
    ledge.body.immovable = true;
    //player are set and its settings
    player = game.add.spirte(32, game.world.height - 150, 'dude');
    // We need to enable physics on the player
    game. physics.arcade.enable(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = BOUNCE.y - 1;
    player.body.gravity.y = GRAVITY.y - 9;
    player.body.collideWorldBounds = true;
    
    // Our two animation, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10,true);
    player.animations.add('right', [5, 6, 7, 8], 10,true);
    cursors = game.input.keyboard.createCursorKeys();
    // Reset the player velocity (movement)
    player.body.velocity.x = 0;

    
    if (cursors.left.isDown)
    {
        // move to the left
        player.body.velocity.x = -150;
        player.body.velocity('left');
    }
    {
        //move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    {
        // stand still
        player.animations.stop();
        player.frame = 4;
    }
    {
        //Allow the player to jump if they are touching the ground.
    if(cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }   
    }
   stars = game.add.group();
   
   stars.enableBody = true;
   
   // Here we'll create 12 of them evenly spaced apart
   for (var i = 0; i < 12; i++)
   {
       
       
       // Create a star inside of the 'star'group
       var star = stars.create(i * 70, 0, 'star');
       
       // Let GRAVITY fo its thing
       star.body.GRAVITY.y = 6;
      
       // This just gives each star a slightly random BOUNCE value
       star.body.BOUNCE.y = 0.7 + Math.random() * 0.2;
       
       
       
      
   }
    scoreText = game.add.text(16, 16, 'score:0', { fontSize: '32px', fill: '#000'});
  
    
    

   
   
}
function update() {
    // Collide the player and the stars with the platforms
    hitPlatform = game.physics.arcade.collide(player, platforms);
    
    game.physics.arcade.collide(stars, platforms);
    
    game.physics.arcade.overlap( player, stars, collectstar, null, this);
    
}
function collectstar (player, star){
    // Removes the star from the screen
    star.kill();
    
    
    
}