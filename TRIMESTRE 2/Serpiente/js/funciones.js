const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 650;
canvas.height = 380;

class Serpiente{
    constructor(posicion, radio, color, velocidad, context){
        this.posicion = posicion;
        this.radio = radio;
        this.color = color;
        this.velocidad = velocidad;
        this.context = context;
        this.rotacion = 0;
        this.teclas ={
            ArrowLeft: false,
            ArrowRight: false
        }
        this.teclado();
    }

    dibujarCirculo(x,y,radio,color){
        this.context.beginPath();
        this.context.arc(x,y,radio,0,2*Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }
    dibujarCabeza(){
        this.dibujarCirculo(this.posicion.x, this.posicion.y, this.radio, this.color);
       
        this.dibujarCirculo(this.posicion.x,this.posicion.y-9,this.radio-4,"white");
        this.dibujarCirculo(this.posicion.x+1, this.posicion.y-9, this.radio-5, "black");
        this.dibujarCirculo(this.posicion.x+3, this.posicion.y-8, this.radio-9, "white");
   
        this.dibujarCirculo(this.posicion.x,this.posicion.y+9,this.radio-4,"white");
        this.dibujarCirculo(this.posicion.x+1, this.posicion.y+9, this.radio-5, "black");
        this.dibujarCirculo(this.posicion.x+3, this.posicion.y+8, this.radio-9, "white");
   
    }   
    dibujar(){
        this.context.save();

        this.context.translate(this.posicion.x,this.posicion.y);
        this.context.rotate(this.rotacion);
        this.context.translate(-this.posicion.x,-this.posicion.y);

         this.dibujarCabeza();
         
         this.context.restore();
    }

    teclado(){
        document.addEventListener("keydown",(event)=>{
            if(event.teclas == ArrowLeft){
                this.teclas.ArrowLeft = true;
            }
            if(event.teclas == ArrowRight){
                this.teclas.ArrowRight = true;
            }
        });
        document.addEventListener("keyup",(event)=>{
            if(event.teclas == ArrowLeft){
                this.teclas.ArrowLeft = false;
            }
            if(event.teclas == ArrowRight){
                this.teclas.ArrowRight = false;
            }
        });

    }
}


const serpiente = new Serpiente({x:200, y:200},11,"#feba39",1.5,ctx);




function fondo(){
    ctx.fillStyle = "#1B1C30"
ctx.fillRect(0,0,canvas.width,canvas.height);

for(let i= 0; i < canvas.height; i+=80){
    for(let j= 0; j < canvas.width; j+=80){
         ctx.fillStyle ="#23253C";
         ctx.fillRect(j+10, i+10,70,70);
    }
}
}

fondo();
serpiente.dibujar();

//https://www.youtube.com/watch?v=Sl6YUIvwbAk