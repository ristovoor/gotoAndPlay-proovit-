let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")

var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#160052";


class FireworkType1{ //Firework that bursts in the air
    constructor(colorInitial, colorSplash, xpos, ypos, radius, speed, timeCreated){
        this.colorInitial = colorInitial;
        this.colorSplash = colorSplash;
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.timeCreated = timeCreated;

        this.dy = 1 * speed;
        this.stage = 0;

    }

    draw(context){
        if (this.stage == 0){
            context.beginPath();
            context.strokeStyle = this.colorInitial;
            context.fillStyle = this.colorInitial;
            context.arc( this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false );
            context.fill();
            context.stroke();
            context.closePath();
        }
        if (this.stage == 1){
            for ( let i = 0; i < 8; i ++){
                context.beginPath();
                context.strokeStyle = this.colorSplash;
                context.fillStyle = this.colorSplash;
                let speed = this.timeCreated * 2;
                switch (i){ // Explodes into 8 different directions
                    case 0:
                        context.arc( this.xpos, this.ypos - speed, this.radius, 0, Math.PI * 2, false );
                        break;
                    case 1:
                        context.arc( this.xpos + speed* (3/4), this.ypos - speed *  (3/4), this.radius, 0, Math.PI * 2, false );
                        break;
                    case 2:
                        context.arc( this.xpos + speed, this.ypos, this.radius, 0, Math.PI * 2, false );
                        break;
                    case 3:
                        context.arc( this.xpos + speed * (3/4), this.ypos + speed * (3/4), this.radius, 0, Math.PI * 2, false );
                        break;
                    case 4:
                        context.arc( this.xpos, this.ypos + speed, this.radius, 0, Math.PI * 2, false );
                        break;
                    case 5:
                        context.arc( this.xpos - speed * (3/4), this.ypos + speed * (3/4), this.radius, 0, Math.PI * 2, false );
                        break;
                    case 6:
                        context.arc( this.xpos - speed, this.ypos, this.radius, 0, Math.PI * 2, false );
                        break;
                    case 7:
                        context.arc( this.xpos - speed * (3/4), this.ypos - speed * (3/4), this.radius, 0, Math.PI * 2, false );
                        break;
                }
                context.fill();
                context.stroke();
                context.closePath();
            }
        }

    }

    update(){
        this.draw(context);
        this.timeCreated ++;

        if (this.stage == 0 && this.timeCreated <= 100){
            this.ypos -= this.dy;
        }
        if (this.stage == 0 && this.timeCreated > 100){
            this.timeCreated = 0;
            this.stage = 1;
        }
    }
}

class FireworkType2{ //Creates fireworks that split into 5 on the ground
    constructor(colorInitial, colorSplash, xpos, ypos, radius, speed, timeCreated){
        this.colorInitial = colorInitial;
        this.colorSplash = colorSplash;
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.speed = speed;
        this.timeCreated = timeCreated;

        this.dy = 1 * speed;
    }
    draw(context){
        for ( let i = -2; i < 3; i ++){
            for ( let j = 1; j < 4; j ++){
                context.beginPath();
                if ( j == 3){ // main explosive
                    context.strokeStyle = this.colorInitial;
                    context.fillStyle = this.colorInitial;
                    context.arc( this.xpos - (i * this.timeCreated) , this.ypos - (30 + j + j * 15), this.radius, 0, Math.PI * 2, false );
                }
                else { // light colored projectiles
                    context.strokeStyle = this.colorSplash;
                    context.fillStyle = this.colorSplash;
                    context.arc( this.xpos - (-5 * i * j * 2 + i * this.timeCreated) , this.ypos - (30 + j + j * 15), this.radius, 0, Math.PI * 2, false );
                    context.arc( this.xpos - (-5 * i * j * 2 + i * this.timeCreated) , this.ypos - (30 + j + j * 15), this.radius, 0, Math.PI * 2, false );
                    
                }
                
                
                context.fill();
                context.stroke();
                context.closePath();
            }
        }
        
        
    }
    update(){
        this.draw(context);
        this.ypos -= this.dy;
        this.timeCreated ++;
    }
}

class sunAndStars{ // Background addons
    constructor(moonColor, earthColor, msg, backgroundColor){
        this.moonColor = moonColor;
        this.earthColor = earthColor;
        this.msg = msg;
        this.backgroundColor = backgroundColor;
    }
    draw(context){ // Draws message
        for ( let i = 0; i < 3; i ++){ 
            context.beginPath();
            context.fillText(this.msg[i], window_width/2, window_height/2 + i*75 - 200);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "60px Arial";
            context.closePath();
        }
        

        /*
        for (let i = 0; i < 5; i ++){ //Drawing stars, source: https://stackoverflow.com/a/25840319
            let x = randomNumber(200,1400);
            let y = randomNumber(100,400);
            drawStar(x,y,5,10,5);
        }
        */
        for (let i = 0; i < 2; i ++){ //Draws moon
            let x = 150;
            let y = 200;
            context.beginPath();
            switch (i) {
                case 0:
                    context.strokeStyle = this.moonColor;
                    context.fillStyle = this.moonColor;
                    break;
                case 1:
                    context.strokeStyle = this.backgroundColor;
                    context.fillStyle = this.backgroundColor;
                    break;
            }
            

            context.arc( x + i * 10, y + i*5, 30, 0, Math.PI * 2, false );

            context.fill();
            context.stroke();
            context.closePath();
        }
        
        
        context.beginPath();
        context.strokeStyle = this.earthColor;
        context.fillStyle = this.earthColor;

        context.arc( window_width/2, 1300, 800, 0, Math.PI * 2, false );

        context.fill();
        context.stroke();
        context.closePath();
        
    }
    
    update(){
        this.draw(context);
    }
}

var allFireworks = [];

let colorList = ["#cdff57", "#ff5926", "#ff26ed", "#9752ff", "#52fcff"]

let backgroundAddOns = new sunAndStars("#bfbc11", "#002b02", ["Palju õnne","gotoAndPlay", "10 tööaasta puhul!"], "#160052")

let randomNumber = function(min, max) {
    var result = Math.floor(Math.random() * (max - min) + min);
    //console.log(result)
    return result;
}

/*
let drawStar = function drawStar(cx,cy,spikes,outerRadius,innerRadius){ // https://stackoverflow.com/a/25840319
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    context.beginPath();
    context.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
      x=cx+Math.cos(rot)*outerRadius;
      y=cy+Math.sin(rot)*outerRadius;
      context.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      context.lineTo(x,y)
      rot+=step
    }
    context.lineTo(cx,cy-outerRadius);
    context.closePath();
    context.lineWidth=5;
    context.strokeStyle="#bfbc11";
    context.stroke();
    context.fillStyle="#bfbc11";
    context.fill();
}
*/


canvas.addEventListener('click', () => { 
    if (randomNumber(0,2) == 0){
        allFireworks.push(new FireworkType1(colorList[randomNumber(0,5)],
        colorList[randomNumber(0,4)], randomNumber(100, 1000), randomNumber(600, 700), 10, 5,0));
    } else {
        allFireworks.push(new FireworkType2(colorList[randomNumber(0,5)],
        "#fff7a1", randomNumber(100, 1000), randomNumber(600, 700), 10, 4,0));
    }
})

let updateAll = function(){
    requestAnimationFrame(updateAll);
    context.clearRect(0,0,window_width,window_height)
    backgroundAddOns.update();
    allFireworks.forEach(element => {
        if ( allFireworks[0].timeCreated > 120 ){
            allFireworks.shift();
        }
        element.update();
    })

}

updateAll();
