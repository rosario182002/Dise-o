const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 650;
canvas.height = 380;


class cuerpoSerpiente{
    constructor(radio, color,context,path){
        this.radio = radio;
        this.color = color;
        this.context = context;
        this.path = path;
    }
    dibujarCirculo(x,y,radio,color){
        this.context.beginPath();
        this.context.arc(x,y,radio,0,2*Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }
    dubujar(){
        this.dibujarCirculo(this.path.slice(-1)[0].x, this.path.slice(-1)[0].y, this.radio, this.color);
    }
}



class Serpiente{
    constructor(posicion, radio, color, velocidad, context){
        this.posicion = posicion;
        this.radio = radio;
        this.color = color;
        this.velocidad = velocidad;
        this.context = context;
        this.rotacion = 0;
        this.body = [];
        this.teclas ={
            ArrowLeft: false,
            ArrowRight: false
        }
        this.teclado();
    }
    iniciarCuerpo(){
        for(let i=0; i<3; i++){
            let path = [];
            for(let k=0; k=12; k++){
                path.push({
                    x:this.posicion.x,
                    y:this.posicion.y
                });
            }
            this.body.push(new cuerpoSerpiente(this.radio, this.color, this.context, path));
        }
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

    dibujarCuerpo(){
        this.body[0].path.unshift({
            x:this.posicion.x,
            y:this.posicion.y
        });
        this.body[0].dibujar();

        for(let i = 1; i<this.body.length; i++){
            this.body[i].path.unshift(this.body[i-1].path.pop());
            this.body[i].dibujar();
        }
       // this.body[]
    }


    dibujar(){
        this.context.save();

        this.context.translate(this.posicion.x,this.posicion.y);
        this.context.rotate(this.rotacion);
        this.context.translate(-this.posicion.x,-this.posicion.y);

         this.dibujarCabeza();
         
         this.context.restore();
    }

    actualizar(){
        this.dibujar();
        if(this.teclas.ArrowLeft){
            this.rotacion -= 0.4;
        }
        if(this.teclas.ArrowRight){
            this.rotacion += 0.4;
        }
        this.posicion.x += Math.cos(this.rotacion)*this.velocidad;
        this.posicion.y += Math.sin(this.rotacion)*this.velocidad;
    }


    teclado(){
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.teclas.ArrowLeft = true;
            }
            if (event.key === "ArrowRight") {
                this.teclas.ArrowRight = true;
            }
        });
    
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {
                this.teclas.ArrowLeft = false;
            }
            if (event.key === "ArrowRight") {
                this.teclas.ArrowRight = false;
            }
        });
    }
    
}


const serpiente = new Serpiente({x:200, y:200},11,"#feba39",1.5,ctx);

serpiente.iniciarCuerpo();


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

function actualizar(){
    console.log("actualizar");
    fondo();
    serpiente.actualizar();
    requestAnimationFrame(actualizar);
}
actualizar();


//https://www.youtube.com/watch?v=Sl6YUIvwbAk 26:44