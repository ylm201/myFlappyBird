// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(window.screen.width, window.screen.height-80, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
		// Function called first to load all the assets
		// Change the background color of the game
    	this.game.stage.backgroundColor = '#71c5cf';

    	// Load the bird sprite
    	this.game.load.image('bird', 'assets/bird.png'); 
    	// Load the pipe sprite
    	this.game.load.image('pipe', 'assets/pipe.png');  
    
    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game
    	// Display the bird on the screen
    	this.bird = this.game.add.sprite(80, 245, 'bird');

    	// Add gravity to the bird to make it fall
    	this.bird.body.gravity.y = 900;  

    	// Call the 'jump' function when the spacekey is hit
    	this.game.input.onTap.add(this.jump, this);

    	this.pipes = game.add.group();  
		this.pipes.createMultiple(50, 'pipe'); 
		this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this); 

		this.score = 0;  
		var style = { font: "30px Arial", fill: "#ffffff" };  
		this.label_score = this.game.add.text(20, 20, "0", style);  

    },
    
    update: function() {
		// Function called 60 times per second
		// If the bird is out of the world (too high or too low), call the 'restart_game' function
    	if (this.bird.inWorld == false) this.restart_game();
    	this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);  
    },

    jump:function(){
    	this.bird.body.velocity.y = -280;
    },
    add_one_pipe: function(x, y) {  
    	// Get the first dead pipe of our group
	    var pipe = this.pipes.getFirstDead();

	    // Set the new position of the pipe
	    pipe.reset(x, y);

	    // Add velocity to the pipe to make it move left
	    pipe.body.velocity.x = -150; 

	    // Kill the pipe when it's no longer visible 
	    pipe.outOfBoundsKill = true;
	},
	add_row_of_pipes: function() {  
	    this.score += 1;  
		this.label_score.content = this.score;
	    var hole = Math.floor(Math.random()*5)+1;

	    for (var i = 0; i < 8; i++)
	        if (i != hole && i != hole +1){
	            this.add_one_pipe(window.screen.width, i*51+10); 
            }
	},
    // Restart the game
	restart_game: function() {  
    	// Start the 'main' state, which restarts the game
    	this.game.state.start('main');
    	this.game.time.events.remove(this.timer);  
	}
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 