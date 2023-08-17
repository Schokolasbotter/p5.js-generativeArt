// The topic troughout all my sketches is Color Overlap. I tried to achieve interesting shapes and patterns trough overlapping colours which would mix and create different colors, thus creating a varity of shapes. For this sinusoidal animation, I started with a simple sine wave, which I multiplied onto the screen. I mapped another sine function onto the hue value and different for every wave I had. The Last step of this sketch was experimenting. I changed values for positioning and for the functions, combined sine and cosine functions in different ways, until I stumbled up the current shape, which was very pleasing and relaxing to me. 

var input;
var vertexAmt;
var mainAmplitude;
var mainPhase;
var mainFrequency;
var lineAmt;
var hueValue;

function setup()
{
	createCanvas(500,500);
	colorMode(HSB);
	
	//Variables Initialisation
	input = 0;
	lineAmt = 20;
	vertexAmt = 490;
	hueValue = 0;
	
}

function draw()
{
	background(0);
	translate(0,height/2);
	// Formatting
	noStroke();
	strokeWeight(2);
	
	
	for(var j=0; j < lineAmt; j++)
	{
		// hue calculation
		let hue = map(sin(hueValue * j),-1,1,0,359);
		//adjust Phase of different lines
		let phaseAdjustment = j + 20;
		// Draw Shape
		fill(hue,80,100,0.2);
		beginShape();
		for(var i = 0; i < vertexAmt; i++)
		{
			// Y Position Calculation
			let sinusOne = sin(i*0.008 + (j*20)+ input * 0.2)
			let sinusTwo = sin(i*0.008  + input * 0.009);
			let sinusThree = cos(i *0.008 + input * 0.07);
			let y = sinusOne * sinusTwo * sinusThree * height* 3/4;
			//Vertex Point
			vertex(5 + i,y);		
		}
		endShape(CLOSE);
	}	
    input += 0.1;
	hueValue += 0.001;
}