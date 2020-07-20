// INR values for JAN month
var data = 
{
    "2019-01-02": 79.9855,
    "2019-01-03": 79.608,
    "2019-01-04": 79.4315,
    "2019-01-07": 79.6895,
    "2019-01-08": 80.245,
    "2019-01-09": 80.6365,
    "2019-01-10": 81.2005,
    "2019-01-11": 81.3475,
    "2019-01-14": 81.2195,
    "2019-01-15": 81.231,
    "2019-01-16": 81.0055,
    "2019-01-17": 80.9765,
    "2019-01-18": 81.0875,
    "2019-01-21": 80.9335,
    "2019-01-22": 81.046,
    "2019-01-23": 81.0535,
    "2019-01-24": 80.656,
    "2019-01-25": 80.634,
    "2019-01-28": 81.232,
    "2019-01-29": 81.306,
    "2019-01-30": 81.351,
    "2019-01-31": 81.686
}
const entries = Object.entries(data);

// GBP values for JAN month
var data1  = 
{
    "2019-01-02": 0.90165,
    "2019-01-03": 0.90312,
    "2019-01-04": 0.89988,
    "2019-01-07": 0.8972,
    "2019-01-08": 0.89743,
    "2019-01-09": 0.89913,
    "2019-01-10": 0.90423,
    "2019-01-11": 0.90015,
    "2019-01-14": 0.89263,
    "2019-01-15": 0.89025,
    "2019-01-16": 0.8859,
    "2019-01-17": 0.8826,
    "2019-01-18": 0.88125,
    "2019-01-21": 0.88303,
    "2019-01-22": 0.88,
    "2019-01-23": 0.87213,
    "2019-01-24": 0.87085,
    "2019-01-25": 0.8658,
    "2019-01-28": 0.86888,
    "2019-01-29": 0.86735,
    "2019-01-30": 0.87341,
    "2019-01-31": 0.87578
}
const entries1 = Object.entries(data1);

//------------- Variable declaration for GBP -----------------------
		var keys1 = []; //GBP dates
		var values1 = []; //GBP values
		for(var key1 in data1) 
			keys1.push(key1);

		for(var i=0;i<keys1.length;i++)
		    values1.push(data1[keys1[i]]);
		            
		//finding min and max values of GBP
		var min1=values1[0];
		var max1=values1[0];

		for(let i=1;i<values1.length;i++)
		{
		    if(values1[i] < min1)
		        min1 = values1[i];
		    else if(values1[i] > max1)
		        max1 = values1[i];
		}

		min1 = min1.toFixed(5); //GBP min value
		max1 = max1.toFixed(5); //GBP max value

		var yScale1 = (max1-min1)/10;
		yScale1 = yScale1.toFixed(5);


//------------- Variable declaration for INR -----------------------

		var keys = []; //dates
		var values = []; //inr values
		for(var key in data) 
			keys.push(key);

		for(var i=0;i<keys.length;i++)
		    values.push(data[keys[i]]);
		            
		//finding min and max values
		var min=values[0];
		var max=values[0];

		for(let i=1;i<values.length;i++)
		{
		    if(values[i] < min)
		        min = values[i];
		    else if(values[i] > max)
		        max = values[i];
		}

		 min = min.toFixed(3);
		 max = max.toFixed(3);

		var yScale = (max-min)/10;
		yScale = yScale.toFixed(3);

//-------------------Canvas designing---------------------------
		let canvas = document.querySelector('canvas');
		canvas.width = 1000;
		canvas.height = 600;

		let ctx = canvas.getContext('2d');

		let xGrid = 10;
		let yGrid = 10;
		let cellSize = 10;

//------------------- Drawing the grid--------------------------
		function drawGrids()
		{
			ctx.beginPath();

			while(xGrid < canvas.height)
			{
				ctx.moveTo(0,xGrid);
				ctx.lineTo(canvas.width,xGrid);
				xGrid+=cellSize;
			}

			while(yGrid < canvas.width)
			{
				ctx.moveTo(yGrid,0);
				ctx.lineTo(yGrid,canvas.height);
				yGrid+=cellSize;
			}

			ctx.strokeStyle = "lightgray";
			ctx.stroke();
		}

		function blocks(count)
		{
			return count*cellSize;
		}

//--------------------Drawing the INR Y-Axis--------------------------
		function drawAxisINR()
		{
			let temp = 0;
			let yPlot = 50;
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.moveTo(blocks(5),blocks(5));
			//drawing Y-Axis
			ctx.lineTo(blocks(5),blocks(50));
 			//drawing X-Axis
			ctx.lineTo(blocks(90),blocks(50));	
			//moving pointer to (0,0)
			ctx.moveTo(blocks(5),blocks(50));
			//printing values on y axis
			for(let i=0 ; i<values.length ; i++)
			{
				if(parseFloat(temp) > parseFloat(max + yScale))
					break;
				ctx.strokeText(parseFloat(temp) , blocks(1), blocks(yPlot));
				if(temp == 0)
				{
					temp = parseFloat(min);
					yPlot -= 4;
					continue; 
				}
				yPlot -= 4;
				temp =( parseFloat(temp) + parseFloat(yScale) ).toFixed(5);
			}

			ctx.stroke();
		}
//---------------------Drawing the GBP Y-Axis-----------------------------------
        function drawAxisGBP()
        {
            let temp = 0;
            let yPlot = 50;
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(blocks(90),blocks(5));
            //drawing Y-Axis
            ctx.lineTo(blocks(90),blocks(50));
            //printing values on y axis
            for(let i=0 ; i<values1.length ; i++)
            {
                if(parseFloat(temp) > parseFloat(max1 + yScale1))
                    break;
                ctx.strokeText(parseFloat(temp) , blocks(91), blocks(yPlot));
                if(temp == 0)
                {
                    temp = parseFloat(min1);
                    yPlot -= 4;
                    continue; 
                }
                yPlot -= 4;
                temp =( parseFloat(temp) + parseFloat(yScale1) ).toFixed(5);
            }

            ctx.stroke();
        }


//-----------------------Drawing the INR graph----------------------------
		function drawChartINR()
		{
			var xPlot = 8;
			const gridValue = 4;

			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.moveTo(blocks(5),blocks(50));

			for(const [dates,inr] of entries)
			{
				var units = parseFloat(inr-min)/yScale;
				ctx.strokeStyle="blue"
				ctx.strokeText(dates,blocks(xPlot),blocks(46 - gridValue*units -1));
		        ctx.strokeStyle="black";
		        ctx.lineTo(blocks(xPlot),blocks(46 - gridValue*units));
		        ctx.arc(blocks(xPlot),blocks(46 - gridValue*units),2,0,Math.PI*2,true);
		        xPlot+=3;
			}

			ctx.stroke();
		}
//---------------------------Drawing GBP graph--------------------------------
            function drawChartGBP()
        {
            var xPlot = 8;
            const gridValue = 4;

            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(blocks(5),blocks(50));

            for(const [dates,gbp] of entries1)
            {
                var units = parseFloat(gbp-min1)/yScale1;
                ctx.strokeStyle="green"
                ctx.strokeText(dates,blocks(xPlot),blocks(46 - gridValue*units -1));
                ctx.strokeStyle="black";
                ctx.lineTo(blocks(xPlot),blocks(46 - gridValue*units));
                ctx.arc(blocks(xPlot),blocks(46 - gridValue*units),2,0,Math.PI*2,true);
                xPlot+=3;
            }

            ctx.stroke();
        }

		
//------------------------ labeling X-Axis-----------------------------------
		function xLabel()
		{
			ctx.beginPath();
			ctx.strokeStyle ="black";
		    ctx.moveTo(blocks(45),blocks(52));
		    ctx.strokeText("<--- DATES ---->",blocks(45),blocks(52));
		    ctx.stroke();
		}

//-------------------------labeling INR Y-Axis--------------------------------
		function yINRLabel()
		{
			ctx.beginPath();
			ctx.strokeStyle ="black";
		    ctx.strokeStyle="blue"
		    ctx.strokeText("CURRENCY(INR)",blocks(2),blocks(4));
		    ctx.stroke();
		}


//-------------------------labeling GBP Y-Axis--------------------------------
		 function yGBPLabel()
        {
            ctx.beginPath();
            ctx.strokeStyle ="black";
            ctx.strokeStyle="green"
            ctx.strokeText("CURRENCY(GBP)",blocks(86),blocks(4));
            ctx.stroke();
        }

		
//------------------------Calling Functions------------------------------
		drawGrids();
		drawAxisINR();
		drawAxisGBP();
		drawChartINR();
		drawChartGBP();
		xLabel();
		yINRLabel();
		yGBPLabel();

   
 //------------------------------------------------------------     

		


       
