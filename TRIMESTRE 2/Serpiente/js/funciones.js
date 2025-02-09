// Obtiene el canvas y su contexto 2D.
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Obtiene elementos del DOM: menú y display de puntos.
const menu = document.querySelector(".menu");
const puntos = document.querySelector(".puntos")
// Obtiene canvas para selección de tipo de serpiente.
const canvas1 = document.getElementById("tipo1");
const canvas2 = document.getElementById("tipo2");

const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d")

// Configura dimensiones de los canvas de selección.
canvas1.width= 190;
canvas1.height=80;

canvas2.width= 190;
canvas2.height=80;

// Configura dimensiones del canvas principal.
canvas.width = 650;
canvas.height = 380;

// Estado del juego y puntuación inicial.
let jugar = false;
let puntos1 = 0;

// Clase para la comida que la serpiente come.
class Comida{
    constructor(posicion, radio, color, context){
        this.posicion = posicion;
        this.radio = radio;
        this.color = color;
        this.context = context;
    }
    dibujar(){
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.posicion.x, this.posicion.y, this.radio, 0, 2*Math.PI);
        this.context.fillStyle = this.color;
        this.context.shadowColor = this.color;
        this.context.shadowBlur = 10;
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }
    colision(serpiente){
       let v1 ={
        x:this.posicion.x - serpiente.posicion.x,
        y:this.posicion.y - serpiente.posicion.y
       }
       let distancia = Math.sqrt(v1.x*v1.x + v1.y*v1.y);

       if(distancia < serpiente.radio + this.radio){
        this.posicion={
            x: Math.floor(Math.random() *
             ((canvas.width - this.radio) - this.radio + 1)) + this.radio,
             y: Math.floor(Math.random() *
             ((canvas.height - this.radio) - this.radio + 1)) + this.radio,
        }
        serpiente.crearCuerpo();
        puntos1 ++;
        puntos.textContent = puntos1;

        }
    }
}

// Clase para los segmentos del cuerpo de la serpiente.
class cuerpoSerpiente{
    constructor(radio, color,context,path){
        this.radio = radio;
        this.color = color;
        this.context = context;
        this.path = path;
        this.transparencia = 1;

    }
    dibujarCirculo(x,y,radio,color){
        this.context.save();
        this.context.beginPath();
        this.context.arc(x,y,radio,0,2*Math.PI);
        this.context.fillStyle = color;
        this.context.globalAlpha = this.transparencia;
        this.context.shadowColor = this.color;
        this.context.shadowBlur = 10;
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }
    dibujar(){
        this.dibujarCirculo(this.path.slice(-1)[0].x, this.path.slice(-1)[0].y, this.radio, this.color);
    }
}

// Clase para la serpiente.
class Serpiente{
    constructor(posicion, radio, color, velocidad,tamaño, camino,  context){
        this.posicion = posicion;
        this.radio = radio;
        this.color = color;
        this.velocidad = velocidad;
        this.context = context;
        this.rotacion = 0;
        this.transparencia = 1;
        this.body = [];
        this.estamuerta = false;
        this.tamaño = tamaño;
        this.camino = camino;
        this.teclas ={
            ArrowLeft: false,
            ArrowRight: false,
            ArrowUp: false,
            ArrowDown: false,
            enable: true
        }
        this.teclado();
    }
    iniciarCuerpo(){
        for (let i = 0; i < this.tamaño; i++) {
            let path = [];
            for (let k = 0; k < this.camino; k++) {
                path.push({
                    x: this.posicion.x - (i + k) * this.radio * 2,
                    y: this.posicion.y
                });
            }
            this.body.push(new cuerpoSerpiente(this.radio, this.color, this.context, path));
        }
        
    }
    crearCuerpo(){
        let path = [];
        for (let k = 0; k < this.camino; k++) {
            path.push({
                x: this.body.slice(-1)[0].path.slice(-1)[0].x,
                y: this.body.slice(-1)[0].path.slice(-1)[0].y
            });
        }
        this.body.push(new cuerpoSerpiente(this.radio, this.color, this.context, path));

        if(this.camino <=8 ){
            this.body.push(new cuerpoSerpiente(this.radio, this.color, this.context, [...path]));
            this.body.push(new cuerpoSerpiente(this.radio, this.color, this.context, [...path]));
            this.body.push(new cuerpoSerpiente(this.radio, this.color, this.context, [...path]));
        }
    }

    dibujarCirculo(x,y,radio,color, shadowColor){
        this.context.save();
        this.context.beginPath();
        this.context.arc(x,y,radio,0,2*Math.PI);
        this.context.fillStyle = color;
        this.context.globalAlpha = this.transparencia;
        this.context.shadowColor = shadowColor;
        this.context.shadowBlur = 10;
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }
    dibujarCabeza(){
        this.dibujarCirculo(this.posicion.x, this.posicion.y, this.radio, this.color, this.color);
       
        this.dibujarCirculo(this.posicion.x,this.posicion.y-9,this.radio-4,"white", "transparent");
        this.dibujarCirculo(this.posicion.x+1, this.posicion.y-9, this.radio-5, "black", "transparent");
        this.dibujarCirculo(this.posicion.x+3, this.posicion.y-8, this.radio-9, "white", "transparent");
   
        this.dibujarCirculo(this.posicion.x,this.posicion.y+9,this.radio-4,"white", "transparent");
        this.dibujarCirculo(this.posicion.x+1, this.posicion.y+9, this.radio-5, "black", "transparent");
        this.dibujarCirculo(this.posicion.x+3, this.posicion.y+8, this.radio-9, "white", "transparent");
   
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
       this.body[this.body.length-1].path.pop();
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

        if(this.estamuerta){
            this.transparencia -= 0.02;
            if(this.transparencia<=0){
                jugar= false; 
                menu.style.display = "flex";
                return;
            }
        }

        this.dibujarCuerpo();
        this.dibujar();
        if(this.teclas.ArrowLeft && this.teclas.enable){
            this.rotacion -= 0.4;
        }
        if(this.teclas.ArrowRight && this.teclas.enable){
            this.rotacion += 0.4;
        }
        if(this.teclas.ArrowUp && this.teclas.enable){
            this.rotacion -= 0.4;
        }
        if(this.teclas.ArrowDown && this.teclas.enable){
            this.rotacion += 0.4;
        }
        this.posicion.x += Math.cos(this.rotacion)*this.velocidad;
        this.posicion.y += Math.sin(this.rotacion)*this.velocidad;

        this.colision();
    }
    colision(){
        if(this.posicion.x-this.radio<=0 || this.posicion.x+this.radio>=canvas.width ||
            this.posicion.y-this.radio<=0 || this.posicion.y+this.radio>=canvas.height){
              this.muerte();
            }
    }
    muerte(){
        this.velocidad = 0;
        this.teclas.enable = false;
        this.estamuerta = true;
        this.body.forEach((cuerpo) => {
            let ultimo = cuerpo.path[cuerpo.path.length-1];
            for(let i = 0; i <cuerpo.path.length-1; i++){
                cuerpo.path[i] = ultimo;
            }
            cuerpo.transparencia = this.transparencia;
        });
    }
    dibujarPersonaje(){
        for(let i=1; i<= this.tamaño; i++){
            this.dibujarCirculo(
                this.posicion.x- (this.camino*this.velocidad*i),
                this.posicion.y, this.radio, this.color, this.color
        );
        }

        this.dibujarCabeza();
    }


    teclado(){
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.teclas.ArrowLeft = true;
            }
            if (event.key === "ArrowRight") {
                this.teclas.ArrowRight = true;
            }if (event.key === "ArrowUp") {
                this.teclas.ArrowUp = true;
            }
            if (event.key === "ArrowDown") {
                this.teclas.ArrowDown = true;
            }
        });
    
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {
                this.teclas.ArrowLeft = false;
            }
            if (event.key === "ArrowRight") {
                this.teclas.ArrowRight = false;
            }
            if (event.key === "ArrowUp") {
                this.teclas.ArrowUp = false;
            }
            if (event.key === "ArrowDown") {
                this.teclas.ArrowDown = false;
            }
        });
    }
    
}

// Inicialización de la serpiente, la comida y las serpientes de selección.
const serpiente = new Serpiente({x:200, y:200},11,"#feba39",1.5,3,12,ctx);
serpiente.iniciarCuerpo();

const serpiente1 = new Serpiente({x:165, y:40},11,"#feba39",1.5,8,12,ctx1);
serpiente1.iniciarCuerpo();
serpiente1.dibujarPersonaje();

const serpiente2 = new Serpiente({x:165, y:40},11,"#ae99f5",1.5,24,4,ctx2);
serpiente2.iniciarCuerpo();
serpiente2.dibujarPersonaje();

const comida = new Comida({x:300, y:300}, 8, "red", ctx);

// Listeners para la selección de serpiente en el menú.
canvas1.addEventListener("click", ()=>{
    inicio(3,12,"#feba39");

})

canvas2.addEventListener("click", ()=>{
    inicio(8,4,"#ae99f5");
})

// Función para iniciar el juego con la configuración elegida.
function inicio(tamaño, camino, color){
    serpiente.body=[];
    serpiente.color = color; 
    serpiente.tamaño = tamaño;
    serpiente.camino = camino;
    serpiente.posicion={x:200, y:200};
    serpiente.estamuerta = false;
    serpiente.velocidad = 1.5;
    serpiente.transparencia = 1;
    serpiente.iniciarCuerpo();
    serpiente.teclas.enable= true;
    jugar = true;
    menu.style.display = "none";
    puntos1 = 0;
    puntos.textContent = puntos1;

}

// Dibuja el fondo del juego.
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

// Bucle principal del juego.
function actualizar(){
    fondo();
    if(jugar){
        serpiente.actualizar();
        comida.dibujar();
        comida.colision(serpiente);
    }
    
    requestAnimationFrame(actualizar);
}
actualizar();