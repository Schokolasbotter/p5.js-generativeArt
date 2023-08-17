// Topic: Mutation by Laurent Klein 2021
// Since we treated this topic in class, my idea of doing spiders was set. I was reading some Spider-man comics at the time and the gene mutated spider, which bit Peter Parker 
// inspired me for this. I started with a blank sketch and created a spider Object with all necessary drawing functions. Step by step I drew the spider and every feature I drew,
// I integrated with random values, these became my characteristics. As I just finished up the spiders, I felt I could as some flavor of being a scientist and creating your own spiders.
// I created the boxes and plaques for information. I didn't particularly like the fitness we integrated in class. Even though the results vary more when evolving a new generation. I wanted
// the user to chose two spiders to combine, but when evolving all Spiders, the obviously ended up all the same since the parents where not randomly chosen from a mating pool. The circumven
// this problem, I integrated that only one Spider would be evolved and it would cylcle through the 6 of them, thus arricing at this version.

var spiders;
var parentIndex;
var mutationChance;
var evolveSpiderIndex;

function setup()
{
	createCanvas(1660,1120);
	background(0);
	colorMode(HSB);
	//Initializing Variables
	spiders = [];
	parentIndex = [];
	mutationChance = 0.2;
	evolveSpiderIndex = 0;
	//Create Evolve Button
	button = createButton('Evolve next Spider');
  	button.position(width/2 - button.width/2, 20-button.height/2);
  	button.mousePressed(evolve);
	//Create 6 spiders
	for(var i = 0; i < 6 ; i++)
	{
		let xPos;
		let yPos;
		if(i < 3)
		{
			xPos = 290 + i * 540;
			yPos = 290 + 0 * 540;
		}
		else
		{
			xPos = 290 + (i-3) * 540;
			yPos = 290 + 540;
		}
		
		spiders.push(new Spider(xPos,yPos));
	};	
}

function draw()
{
	//Formatting
	background(0);
	//Draw Spiders
	for(var i = 0; i<spiders.length; i++)
	{
		spiders[i]._draw();
	}
	//Draw Decoration
	drawBoxes();
	drawPlaques();
}
function Spider(x,y)
{
	//Fix Variavles
	this._x = x;
	this._y = y;
	this._parent = 0;
	//Create DNA
	this._dna = new DNA(33);
	//General Color Characteristics
	this._bodyBrightness = random(5,60);
	this._scale = random(0.2,0.5);
	//Body Characteristics
	this._bodyWidth = random(125,225) * this._scale;
	this._bodyHeight = random(200,300) * this._scale;	
	//Head Characteristics
	this._headWidth = random(100,150) * this._scale;
	this._headHeight = random(100,150) * this._scale;
	//Eyes Characteristics
	this._eyeHue = random(0,359);
	this._eyeSaturation = random(25,80);
	this._eyeBrightness = random(20,80);
	this._eyeAmt = random([2,4,6,8]);
	this._eyeSize = random(10,20) * this._scale;
	//Back symbol Characteristics
	this._symbolType = random([1,2,3]);
	this._symbolHue = random(0,359);
	this._crossWeight = random(5,20) * this._scale;
	this._crossHeight = random(-this._bodyHeight/3,this._bodyHeight/3);
	this._ringAmt = random([1,2,3]);
	this._ringDiameter = random(this._bodyWidth*0.8,this._bodyWidth*0.9);
	this._ringWeight = random(0.8,0.9);
	this._lineWeight = random(5,20) * this._scale;
	//Legs Characteristics
	this.legAmt = random([2,3,4]);
	this._legWeight = random(5,20) * this._scale;
	this._legLength = random(50,150) * this._scale;
	this._upperAngle = random(5,25);	
	this._middleAngle = random(95,115);
	this._middleMultiplier = random(0.2,1.5);
	this._lowerMultiplier = random(0.2,1.5);
	this._lowerAngle = random(120,140);
	//Teeth Characteristics
	this._hasTeeth = random([0,1]);
	this._toothWidth = random(30,50) * this._scale;
	this._toothHeight = random(20,70) * this._scale;
	//Net Characteristics
	this._netWeight = random(1,5);
	this._netHue = random(0,360);
	this._netBrightness = random(40,80);

	this._calcPhenotype = function()
	{
		//General Color Characteristics
		this._bodyBrightness = map(this._dna.genes[0],0,1,5,60);
		this._scale = map(this._dna.genes[1],0,1,0.2,0.5);
		//Body Characteristics
		this._bodyWidth = map(this._dna.genes[2],0,1,125,225) * this._scale;
		this._bodyHeight = map(this._dna.genes[3],0,1,200,300) * this._scale;	
		//Head Characteristics
		this._headWidth = map(this._dna.genes[4],0,1,100,150) * this._scale;
		this._headHeight = map(this._dna.genes[5],0,1,100,150) * this._scale;
		//Eyes Characteristics
		this._eyeHue = map(this._dna.genes[6],0,1,0,359);
		this._eyeSaturation = map(this._dna.genes[7],0,1,25,80);
		this._eyeBrightness = map(this._dna.genes[8],0,1,20,80);
		this._eyeAmt = floor(map(this._dna.genes[9],0,1,1,4))*2;
		this._eyeSize = map(this._dna.genes[10],0,1,10,20) * this._scale;
		//Back symbol Characteristics
		this._symbolType = floor(map(this._dna.genes[11],0,1,1,3));
		this._symbolHue = map(this._dna.genes[12],0,1,0,359);
		this._crossWeight = map(this._dna.genes[13],0,1,5,20) * this._scale;
		this._crossHeight = map(this._dna.genes[14],0,1,-this._bodyHeight/3,this._bodyHeight/3);
		this._ringAmt = floor(map(this._dna.genes[15],0,1,1,3));
		this._ringDiameter = map(this._dna.genes[16],0,1,this._bodyWidth*0.8,this._bodyWidth*0.9);
		this._ringWeight = map(this._dna.genes[17],0,1,0.8,0.9);
		this._lineWeight = map(this._dna.genes[18],0,1,5,20) * this._scale;
		//Legs Characteristics
		this.legAmt = floor(map(this._dna.genes[19],0,1,2,4));
		this._legWeight = map(this._dna.genes[20],0,1,5,20) * this._scale;
		this._legLength = map(this._dna.genes[21],0,1,50,150) * this._scale;
		this._upperAngle = map(this._dna.genes[22],0,1,5,25);	
		this._middleAngle = map(this._dna.genes[23],0,1,95,115);
		this._middleMultiplier = map(this._dna.genes[24],0,1,0.2,1.5);
		this._lowerMultiplier = map(this._dna.genes[25],0,1,0.2,1.5);
		this._lowerAngle = map(this._dna.genes[26],0,1,120,140);
		//Teeth Characteristics
		if(this._dna.genes[27] > 0,5)
		{
			this._hasTeeth = 1;
		}
		else if (this._dna.genes[27] < 0,5)
		{
			this._hasTeeth = 0;
		}
		
		this._toothWidth = map(this._dna.genes[28],0,1,30,50) * this._scale;
		this._toothHeight = map(this._dna.genes[29],0,1,20,70) * this._scale;
		//Net Characteristics
		this._netWeight = map(this._dna.genes[30],0,1,1,5);
		this._netHue = map(this._dna.genes[31],0,1,0,360);
		this._netBrightness = map(this._dna.genes[32],0,1,40,80);
	};
	this._draw = function()
	{	
		this._drawNet();		
		this._drawLegs();
		this._drawTeeth();
		this._drawBody();
		this._drawHead();
		this._drawEyes();
		this._backSymbol();						
	};
	this._drawBody = function()
	{
		push();
		//Formatting
		noStroke();
		fill(0,0,this._bodyBrightness);
		//Translation
		translate(this._x,this._y);
		//Drawing
		ellipse(0,0,this._bodyWidth,this._bodyHeight);
		pop();
	}
	this._drawHead = function()
	{
		push();
		//Formatting
		noStroke();
		fill(0,0,this._bodyBrightness);
		//Translation
		translate(this._x,this._y+this._bodyHeight/2);
		//Drawing
		ellipse(0,0,this._headWidth,this._headHeight);
		pop();
	}
	this._drawEyes = function()
	{
		push();
		//Formatting
		stroke(0);
		strokeWeight(1);
		fill(this._eyeHue,this._eyeSaturation,this._eyeBrightness);
		//General Translation
		translate(this._x,this._y + this._bodyHeight/2 + this._headHeight/2);
		for(var i = 0; i < this._eyeAmt;i++)
		{
			push();
				//Translate conditions
				//Place eyes left and right
				if(i%2 == 0)
				{
					translate(this._headWidth/2 * 0.2,-this._headHeight/2 * 0.2);
				}
				else
				{
					translate(-this._headWidth/2 * 0.2,-this._headHeight/2 * 0.2);
				}
				//When 4 eyes, place 2nd set higher
				if(i>1)
				{
					translate(0,-this._eyeSize - this._eyeSize/4);
				}
				//When 6 eyes
				if(i>3)
				{
					//Left and right placement needs to be increased
					if(i%2 == 0)
					{
						translate(this._eyeSize + this._eyeSize/4,this._eyeSize/2 + this._eyeSize/8);
					}
					else
					{
						translate(-this._eyeSize - this._eyeSize/4,this._eyeSize/2 + this._eyeSize/8);
					}
						
				}
				//When 8 eyes place 4th pair higher
				if(i>5)
				{
					translate(0,-this._eyeSize - this._eyeSize/4);
				}
				//Draw
				ellipse(0,0,this._eyeSize);
				push();
					noStroke();
					fill(255);
					translate(this._eyeSize/5,-this._eyeSize/5);
					ellipse(0,0,3);
				pop();
			pop();
		}
		pop();		
	}
	this._backSymbol = function()
	{
		push();
		//Translate to position
		translate(this._x,this._y);
		// State Machine with different symbol types
		switch(this._symbolType)
		{
			//Cross
			case 1:
				push();
				//Formatting
				stroke(this._symbolHue,80,80);
				strokeWeight(this._crossWeight);
				//Vertical Line
				line(0,-this._bodyHeight/2.5,0,this._bodyHeight/2.5);
				//Horizontal Line
				line(-this._bodyWidth/3,this._crossHeight,this._bodyWidth/3,this._crossHeight);

				pop();
			break;
			// Circles
			case 2:
				push();
				noStroke();
				//Loop for 1 to 3 donuts
				for(var i = 0; i < this._ringAmt; i++)
				{
					//Outter ellipse
					fill(this._symbolHue,80,80);
					ellipse(0,0,this._ringDiameter-(i*this._ringDiameter*0.25));
					//Inner Ellipse
					fill(0,0,this._bodyBrightness);
					ellipse(0,0,(this._ringDiameter*this._ringWeight)-(i*this._ringDiameter*0.25));
				}
				
				pop();
			break;
			// Arrows
			case 3:
				push();
				//Formatting
				stroke(this._symbolHue,80,80);
				strokeWeight(this._lineWeight);
				noFill();
				//Translate to starting point
				translate(0,this._bodyHeight/5);
				// Loop for 3 arrows
				for(var i = 2; i < 5; i++)
				{
					translate(0,-this._bodyHeight/5);
					beginShape();
					vertex(-this._bodyWidth/(2*i),0);
					vertex(0,this._bodyHeight*0.2);
					vertex(this._bodyWidth/(2*i),0);
					endShape();
				}
				pop();
			break;
		}
		pop();
	}
	this._drawLegs = function()
	{	// Loop for amount of leg pairs
		for(var j = 0; j < this.legAmt; j++)
		{
			push();
			// Set Multiplier values for either 2, 3 or 4 leg pairs
			let angleMultiplier = 0;
			let lengthMultiplier = 0;
			switch(j)
			{
				case 0:
					translate(this._x,this._y + this._bodyHeight/2);
					angleMultiplier = 1;
					lengthMultiplier = 1;
				break;
				case 1:
					translate(this._x,this._y);
					angleMultiplier = -1;
					lengthMultiplier = 1.5;
				break;
				case 2:
					translate(this._x,this._y + this._bodyHeight/8);
					angleMultiplier = -1;
					lengthMultiplier = 2;
				break;
				case 3:
					translate(this._x,this._y + this._bodyHeight/3);
					angleMultiplier = 1;
					lengthMultiplier = 2;
				break;
			}
			//Draw both legs
			for(var i = 0; i < 2; i++)
			{
				//Alternate Multiplier
				let alternateLeg = 1
				if(i%2 == 0)
				{
					alternateLeg = 1;
				}
				else
				{
					alternateLeg = -1;
				}
				//Formatting
				stroke(0,0,this._bodyBrightness);
				//Upper Leg
				push();
				strokeWeight(this._legWeight);	
				//Translate to starting position
				translate(alternateLeg * this._bodyWidth/2*0.8,-this._bodyHeight/4);
				//Calculate End Position		
				let upperX= alternateLeg * this._legLength * lengthMultiplier * cos(radians(this._upperAngle*angleMultiplier));
				let upperY= this._legLength * lengthMultiplier * sin(radians(this._upperAngle*angleMultiplier));
				line(0,0,upperX,upperY)
				pop();
				//Middle Leg
				push();
				//Formatting
				strokeWeight(this._legWeight*0.8);
				//Translate to starting position
				translate(alternateLeg * this._bodyWidth/2*0.8,-this._bodyHeight/4);
				translate(upperX,upperY);
				//Calculate End Position
				let middleX= alternateLeg * this._legLength * lengthMultiplier * this._middleMultiplier * cos(radians(this._middleAngle*angleMultiplier));
				let middleY= this._legLength * lengthMultiplier * this._middleMultiplier * sin(radians(this._middleAngle*angleMultiplier));
				line(0,0,middleX,middleY)
				pop();
				//Lower Leg
				push();
				//Formatting
				strokeWeight(this._legWeight*0.8);
				//Translate to starting Position
				translate(alternateLeg * this._bodyWidth/2*0.8,-this._bodyHeight/4);
				translate(upperX,upperY);
				translate(middleX,middleY);			
				//Calculate End Position
				let lowerX= alternateLeg * this._legLength  * lengthMultiplier * this._lowerMultiplier * cos(radians(this._lowerAngle*angleMultiplier));
				let lowerY= this._legLength  * lengthMultiplier * this._lowerMultiplier * sin(radians(this._lowerAngle*angleMultiplier));
				line(0,0,lowerX,lowerY)
				pop();		
			}
			pop();
		}		
	}
	this._drawTeeth = function()
	{
		// Has teeth or not boolean
		if(this._hasTeeth == 0)
		{
			return;
		}
		else
		{
			push();
			//translate to position
			translate(this._x,this._y + this._bodyHeight/2 + this._headHeight/3);
			//Loop for alternating teeth
			for(var i = 0; i < 2; i++)
			{
				let alternateTooth = 1
				if(i%2 == 0)
				{
					alternateTooth = 1;
				}
				else
				{
					alternateTooth = -1;
				}
				push();
				//Formatting
				noStroke();
				fill(255);
				//Translate to drawing position
				translate(alternateTooth * this._headWidth/8,0);
				//Draw
				arc(0,0 + this._toothHeight/2,this._toothWidth,this._toothHeight,-HALF_PI*alternateTooth,HALF_PI*alternateTooth);
				pop();				
			}
			pop();
		}
	}
	this._drawNet = function()
	{
		push();
		//translate
		translate(this._x,this._y-this._bodyHeight/2);
		//formatting
		stroke(this._netHue,80,this._netBrightness);
		strokeWeight(this._netWeight);
		//draw
		line(0,0,0,-250+this._bodyHeight/2);
		pop();
	}

	this._calcPhenotype();
}

function evolve()
{
	//Create child variable and get a mix from parents
	let childDNA = crossOver();
	//Chance of mutation of child DNA
	mutate(childDNA);
	//Evolve 1 spider
	spiders[evolveSpiderIndex]._dna = childDNA;
	spiders[evolveSpiderIndex]._calcPhenotype();
	//Index Control
	evolveSpiderIndex++;
	if(evolveSpiderIndex == 6)
	{
		evolveSpiderIndex -= 6;
	}
}
function crossOver()
{
	//Get dna of chosen Parents
	let parentA = spiders[parentIndex[0]]._dna;
	let parentB = spiders[parentIndex[1]]._dna;
	//Create new DNA
	let childDNA = new DNA(parentA.genes.length);
	//Take genes from either Parent 50/50 Chance
	for(var i = 0; i < childDNA.genes.length; i ++)
	{
		if(random() < 0.5)
		{
			childDNA.genes[i] = parentA.genes[i];
		}
		else
		{
			childDNA.genes[i] = parentB.genes[i];
		}
	}
	//Return DNA
	return childDNA;
}

function mutate(DNA)
{
	//Go through Genes and with chance of every gene mutating
	for(var i = 0; i < DNA.genes.length; i++)
	{
		if(random() < mutationChance)
		{
			DNA.genes[i] = random(0,1);
		}		
	}
}

function DNA(numGenes)
{
	//Create Gene Array
  	this.genes = [];

  	for(var i = 0; i < numGenes; i++)
  	{
		//Push gene ( value between 0 and 1) in to the array
    	this.genes.push(random(0,1)); 
  	}
}

function drawBoxes()
{
	push();
	//Boxes with hardcoded locations for decoration
	noStroke();
	fill(0,0,30);
	rect(0,0,width,40);
	rect(0,height-40,width,40);
	rect(0,0,40,height);
	rect(width-40,0,40,height);
	rect(540,0,40,height);
	rect(1080,0,40,height);
	rect(0,540,width,40);
	//Instructions
	fill(255);
	textSize(20);
	text('Click inside a Box to chose a Spider as Parent.',40,25);
	text('Click 2 different spiders or twice the same to chose as Parents',width/2 + 240,25)
	pop();
}
function drawPlaques()
{
	//Draw Plaques to indicate which Spiders are chosen as parents
	for(var i = 0; i<spiders.length; i++)
	{
		push();
		translate(spiders[i]._x-50,spiders[i]._y+252.5);
		fill(46,65,52);
		rect(0,0,100,35);
		fill(46,65,20);
		if(spiders[i]._parent == 0)
		{
			text('Not Parent',20,20);
		}
		else
		{
			text('Parent ' + spiders[i]._parent,25,20);
		};					
		pop();
	}
	
}

function mouseClicked()
{
	//Check if clicked into box of spiders
	for(var i = 0; i < spiders.length; i++)
	{
		if(mouseX > spiders[i]._x - 250 && mouseX < spiders[i]._x + 250 && mouseY > spiders[i]._y - 250 && mouseY < spiders[i]._y + 250)
		{
			//if no parents are chosen, remember clicked Spider Index in array
			if(parentIndex.length == 0)
			{
				spiders[i]._parent = 1;
				parentIndex.push(i);
			}
			// if 1 parent already chose, remember second clicked Spider Index in array
			else if(parentIndex.length == 1)
			{
				spiders[i]._parent = 2;
				parentIndex.push(i);
			}
			// if 2 parents chosen, remove first spider, and add new chosen spider at the end of array
			else if (parentIndex.length == 2)
			{
				spiders[parentIndex[0]]._parent = 0;
				spiders[parentIndex[1]]._parent = 2;
				parentIndex.splice(0,1);
				spiders[i]._parent = 1;
				parentIndex.push(i);
			}
					
		}
	}
	
};