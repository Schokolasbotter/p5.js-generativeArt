// Topic: Autonamous Agents by Laurent Klein 2021
// After Johanna's workshop I came to the idea of a game playing itself. I thought about games we played as a child, which always had a set of simple rules to follow
// (even if we fought about them a lot). I have vivid memories of playing tag on the playground and came up with the idea of tag. The idea on how it worked was established
// pretty fast in my head and I implemented the rules setp by step into the contstructor function. I had to be very careful on how to implement the rules on the decisionmaking.
// Which is a difficult task and could even have some more improvement made. The most difficult part, after the agents where created, was to make it visually pleasing. I tried
// many things but settled on drawing the path of the agents. After a lot of testing, I decided to draw a shape from all the past positions of the agents which would form a line.
// Surprisingly, the agents created horizontal and vertical lines when crossing over to the edge, which was a touch I loved. I've enjoyed the simplicity of the lines but having
// a mix of free flowing and straight lines was the most intersting part for me. In the end I implemented a way to switch of the agents completely for the user to only enjoy the
// artistic lines without the game aspect.

var bluePlayerAmt;
var blueTeam;
var redPlayerAmt;
var redTeam;

var teamRange;
var enemyRange;

var drawAgents;

function setup()
{
	//Sketch Settings
	frameRate(30);
	createCanvas(1000,500);
	background(0);

	//Team Variables
	bluePlayerAmt = 10;
	blueTeam = [];
	redPlayerAmt = 10;
	redTeam = [];
	//Detection Ranges
	teamRange = 360;
	enemyRange = 180;
	// Draw the agents or don't draw them with this Boolean
	drawAgents = true;
	//Populate Team Arrays
	//Blue Team
	for(var i = 0; i < bluePlayerAmt; i++)
	{
		if(i < (bluePlayerAmt/2))
		{
			blueTeam.push(new Player(width/3,height/4 + i * 50,"blue"));
		}
		else
		{
			blueTeam.push(new Player(width/3 - 50,height/4 + (i - (bluePlayerAmt/2)) * 50,"blue"));
		}
	};
	//RedTeam
	for(var i = 0; i < redPlayerAmt; i++)
	{
		if(i<(redPlayerAmt/2))
		{
			redTeam.push(new Player(width*2/3,height/4 + i * 50,"red"));
		}
		else
		{
			redTeam.push(new Player(width*2/3 + 50,height/4 + (i - (redPlayerAmt/2)) * 50,"red"));
		}	
	};
}

function draw()
{
	background(0);
	//Update and Draw every Team Member on the Blue Team
	for(var i = 0; i < blueTeam.length; i++)
	{
		blueTeam[i]._update();
		blueTeam[i]._draw();		
	};
	//Update and Draw every Team Member on the Red Team
	for(var i = 0; i < redTeam.length; i++)
	{
		redTeam[i]._update();
		redTeam[i]._draw();		
	}
}

function Player(x,y,team) // Object
{
	// Initializing Position Variables
	this._position = createVector(x,y);
	this._pastPositions = [];
	this._direction = p5.Vector.random2D();
	//Assign Team to Player via Input
	this._team = team;
	if(this._team == "blue")
	{
		this._myIndex = blueTeam.length;
	}
	else if(this._team =="red")
	{
		this._myIndex = redTeam.length;
	}
	//Initial States of Variables
	this._diameter = 30;
	this._stamina = 100;
	this._speed = 5;
	this._state = "walking";
	this._isIt = false; 

	this._draw = function()
	{
		// Draw the Lines with Past positions
		//Formatting
		push();
		if(this._team == "blue")
		{
			stroke(101,119,179);
		}
		else if(this._team == "red")
		{
			stroke(179,63,64);
		}			
		noFill();
		//Draw Shape
		beginShape();
		for(var i = 0; i < this._pastPositions.length; i++)
		{			
			vertex(this._pastPositions[i].x,this._pastPositions[i].y);
		}
		endShape();
		pop();

		//Create Object for current Position and add to array
		let positionObject = {
		x: this._position.x,
		y: this._position.y};
		this._pastPositions.push(positionObject);
		// If 200 positions is reached, splice the oldest one out
		if(this._pastPositions.length == 200)
		{
			this._pastPositions.splice(0,1);
		};

		//Draw Agents
		if(drawAgents) // Check if user wants the shapes to be drawn or not
		{
			let agentAlpha = 50; //Alpha Setting for all agent components
			push();
			//Formatting for first Ellipse (Border with black Interior)
			if(this._isIt)
			{
				stroke(237,217,76,agentAlpha);
			}
			else if(this._team == "blue")
			{
				stroke(101,119,179,agentAlpha);
			}
			else if( this._team == "red")
			{
				stroke(179,63,64,agentAlpha);	
			}
			fill(0);
			//First Ellpise 
			ellipse(this._position.x,this._position.y,this._diameter);
			//Formatting for Second Ellipse (Color fill with mapped Diameter to visualize Stamina)
			if(this._team == "blue" && this._state != "caught")
			{
				fill(101,119,179,agentAlpha);
			}
			else if ( this._team == "red" && this._state != "caught")
			{
				fill(179,63,64,agentAlpha);
			}
			else if(this._state == "caught")
			{
				fill(237,217,76,agentAlpha);
			}
			//Second Ellipse
			ellipse(this._position.x,this._position.y,map(this._stamina,0,100,0,this._diameter));
			pop();
		}				
	};

	this._update = function()
	{
		//Change who's turn it is to catch the opposite Team members
		this._changeIt();
		// State Machine for speed and stamina
		switch(this._state)
		{
			case "walking":
				this._speed = 2;
				this._stamina -= 0.1;
			break;

			case "running":
				this._speed = 3;
				this._stamina -= random(0.2,0.9);
			break;

			case "resting":
				this._speed = 0;
				this._stamina += random(2.7,3.3);
			break;

			case "caught":
				this._speed = 0;
				this._stamina += random(1.7,2.3);
			break;
		};

		//Stamina Management
		let stamina = constrain(this._stamina,0,100);
		this._stamina = stamina;
		// If empty stamina rest until full
		if(this._stamina == 0 && this._state != "caught")
		{
			this._state = "resting"
		}
		else if(this._stamina == 100 && this._state != "caught")
		{
			this._state = "walking";
		}
		
		// If not resting or being caught
		if(this._state == "walking" || this._state == "running")
		{
			//Check Surroundings
			//1st priority - Check if enemy is close
			if(this._checkSurroundingEnemy())
			{
				let enemy = this._checkSurroundingEnemy()
				if(!this._isIt && enemy._isIt) // If I am not catching and enemy found is catching -> run away
				{	
					let enemyPosition = enemy._position.copy(); // Copy enemy Position
					let moveAwayVector = p5.Vector.sub(enemyPosition,this._position); // Calculate Vector towards enemy Position
					moveAwayVector.mult(-1); // Opposite Direction 
					this._direction = moveAwayVector.copy(); // Copy it into the direction variable to remember the direction after outrunning Catcher
					this._moveTowards(moveAwayVector); // move away from the catcher
					this._state = "running"; // Change State to running
				}
				else if(this._isIt && !enemy._isIt) // if I am catching and enemy is not catching -> follow enemy
				{
					let enemyPosition = enemy._position.copy(); // Get copy of enemy Position 
					this._moveTo(enemyPosition); // Move to enemy Position
					this._state = "running"; // Change State to running
				}
				else
				{
					this._moveRandom();
					this._State = "walking";// Change state to walking
				}				
			}
			//2nd Priority  - Check if Teammember is caught and no enemy around
			if(this._checkSurroundingTeam() && !this._isIt && !this._checkSurroundingEnemy()) //If there is a teammate caught and I am not catching and there is no enemy -> help teammate
			{				
				let teamPosition = this._checkSurroundingTeam().copy(); // Copy Teammate position
				this._moveTo(teamPosition); // Move towards Teammate
				this._state = "running"; // Change state to running
			}
			else if(!this._checkSurroundingEnemy())// If no enemy around move randomly (or new Instructions when finding teammates afterwards)
			{
				this._moveRandom();
				this._State = "walking";// Change state to walking
			}
		}
		
		// Catch enemy if in contant and release Teammate if in contact
		this._catching();
		this._releasing();
	}

	this._checkSurroundingEnemy = function()
	{
		//Blue Team instructions
		if(this._team == "blue")
		{
			for(var i = 0; i < redTeam.length; i++)
			{
				//Check Distance to all opposite Teammembers and they are not already caught
				let distance = dist(this._position.x,this._position.y,redTeam[i]._position.x,redTeam[i]._position.y);
				if(distance <= enemyRange && redTeam[i]._state != "caught")
				{
					//If hit return the object
					return redTeam[i];
				}
			}
			return false;
		}
		//Red Team instructions
		else if(this._team == "red")
		{
			for(var i = 0; i < blueTeam.length; i++)
			{
				//Check Distance to all opposite Teammembers and they are not already caught
				let distance = dist(this._position.x,this._position.y,blueTeam[i]._position.x,blueTeam[i]._position.y);
				if(distance <= enemyRange && blueTeam[i]._state != "caught")
				{
					//If hit return the object
					return blueTeam[i];
				}
			}
			return false;
		}
	}

	this._checkSurroundingTeam = function()
	{
		//Blue Team instructions
		if(this._team == "blue")
		{
			for(var i = 0; i < blueTeam.length; i++)
			{
				// Check all Teammates within range and check if they are caught
				let distance = dist(this._position.x,this._position.y,blueTeam[i]._position.x,blueTeam[i]._position.y);
				if(distance <= teamRange && blueTeam[i]._state == "caught")
				{
					//if hit return the position
					return blueTeam[i]._position;
				}
			}
			return false;
		}
		//Red Team instructions
		else if(this._team == "red")
		{
			for(var i = 0; i < redTeam.length; i++)
			{
				// Check all Teammates within range and check if they are caught
				let distance = dist(this._position.x,this._position.y,redTeam[i]._position.x,redTeam[i]._position.y);
				if(distance <= teamRange && redTeam[i]._state == "caught")
				{
					//if hit return the position
					return redTeam[i]._position;
				}
			}
			return false;
		}
	};
	//Move in a given direction function
	this._moveTowards = function(targetDirection)
	{
		let direction =  targetDirection.copy(); // get copy of directionVector
		direction.normalize();	//Make Unit Vector
		this._position.add(direction.mult(this._speed)); // Multiply it with the speed and add to the position

		//Screen Border Protection X
		if(this._position.x <= 0)
		{
			this._position.x = width;
		}
		else if(this._position.x >= width)
		{
			this._position.x = 0;
		}
		//Screen Border Protection Y
		if(this._position.y <= 0)
		{
			this._position.y = height;
		}
		else if(this._position.y >= height)
		{
			this._position.y = 0;
		}
	};
	//Move towards a given position
	this._moveTo = function(targetPosition)
	{
		let direction = p5.Vector.sub(targetPosition,this._position); // Calculate direction to the given position
		direction.normalize(); // Create Unit Vector out of the direction
		this._position.add(direction.mult(this._speed)); // Multiply it with the speed and add to the position

		//Screen Border Protection X
		if(this._position.x <= 0)
		{
			this._position.x = width;
		}
		else if(this._position.x >= width)
		{
			this._position.x = 0;
		}
		//Screen Border Protection Y
		if(this._position.y <= 0)
		{
			this._position.y = height;
		}
		else if(this._position.y >= height)
		{
			this._position.y = 0;
		}
	};
	// Move randomly across the canvas
	this._moveRandom = function()
	{
		//Rotate the direction slightly every 10 frames
		if(frameCount%10 == 0)
		{
			this._direction.rotate(radians(random(-30,30)));
		}
		this._direction.normalize(); // Create Unit Vector out of the direction
		let directionCopy = this._direction.copy();	// Get a copy of the direction
		this._position.add(directionCopy.mult(this._speed)); // Multiply it with the speed and add to the position

		//Screen Border Protection X
		if(this._position.x <= 0)
		{
			this._position.x = width;
		}
		else if(this._position.x >= width)
		{
			this._position.x = 0;
		}
		//Screen Border Protection Y
		if(this._position.y <= 0)
		{
			this._position.y = height;
		}
		else if(this._position.y >= height)
		{
			this._position.y = 0;
		}
	};

	// Chatching an opponent
	this._catching = function()
	{
		if(this._isIt) // Check if I am catching
		{
			if(this._team == "blue") // Blue Team Instructions
			{
				for(var i = 0; i < redTeam.length; i++)
				{
					// Go Through all of the enemies and check if we overlap
					let distance = dist(this._position.x,this._position.y,redTeam[i]._position.x,redTeam[i]._position.y);
					if(distance <= this._diameter/2 + redTeam[i]._diameter/2 && !redTeam[i]._isIt)
					{						
						redTeam[i]._state = "caught"; // Change State to caught of enemy			
					}
				}
			};
			if(this._team == "red") // Red Team Instructions
			{
				for(var i = 0; i < blueTeam.length; i++)
				{
					// Go Through all of the enemies and check if we overlap
					let distance = dist(this._position.x,this._position.y,blueTeam[i]._position.x,blueTeam[i]._position.y);
					if(distance <= this._diameter/2 + blueTeam[i]._diameter/2 && !redTeam[i]._isIt)
					{
						blueTeam[i]._state = "caught"; // Change State to caught of enemy
					}
				}
			}
		}
	};
	//Releasing Teammembers when they are caught
	this._releasing = function()
	{
		if(this._team == "blue") //Blue Team Instructions
		{
			for(var i = 0; i < blueTeam.length; i++)
			{
				// Go Through all of the Teammembers and check if we overlap
				let distance = dist(this._position.x,this._position.y,blueTeam[i]._position.x,blueTeam[i]._position.y);
				if(distance <= this._diameter/2 + blueTeam[i]._diameter/2 && blueTeam[i]._state == "caught" && this._myIndex != i)
				{
					blueTeam[i]._state = "walking"; // Change Teammember state back to walking
				}
			}
		}
		if(this._team == "red") // Red Team Instructions
		{
			for(var i = 0; i < redTeam.length; i++)
			{
				// Go Through all of the Teammembers and check if we overlap
				let distance = dist(this._position.x,this._position.y,redTeam[i]._position.x,redTeam[i]._position.y);
				if(distance <= this._diameter/2 + redTeam[i]._diameter/2 && redTeam[i]._state == "caught" && this._myIndex != i)
				{						
					redTeam[i]._state = "walking"; // Change Teammember state back to walking			
				}
			}
		};			
	};
	// Change who is catching in regular Intervals
	this._changeIt = function()
	{	
		if(frameCount%900 == 1) //Every 30 Seconds
		{
			//Reset catching state of all players
			for(var i = 0; i < blueTeam.length; i++)
			{
				blueTeam[i]._isIt = false;	
			};
			for(var i = 0; i < redTeam.length; i++)
			{
				redTeam[i]._isIt = false;	
			};

			for(var i = 0; i < 2; i++) // Chose 2 blue players to catch
			{
				let playerIndex = floor(random(0,blueTeam.length)); // Chose random Index
				while(blueTeam[playerIndex]._state == "caught" || blueTeam[playerIndex]._isIt) // as long as the random Index Player is caught or is already catching
				{
					// Get new Index random Index
					playerIndex = floor(random(0,blueTeam.length)); 
				};
				blueTeam[playerIndex]._isIt = true; // set isIt to true
			}
			for(var i = 0; i < 2; i++) // Chose 2 red players to catch
			{
				let playerIndex = floor(random(0,redTeam.length)); // Chose random Index
				while(redTeam[playerIndex]._state == "caught" || redTeam[playerIndex]._isIt) // as long as the random Index Player is caught or is already catching
				{
					// Get new Index random Index
					playerIndex = floor(random(0,redTeam.length)); 
				};
				redTeam[playerIndex]._isIt = true; // set isIt to true
			}
		}	
	}
};