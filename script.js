//Programa para que un robot camina a un objetivo
//con un 95% de eficacia (Falta algunos casos que recorre en diagonal)

var canvas;
var ctx;
var FPS = 10;
let mensaje;
let intervalo;
//tablero
var columnas =50;
var filas = 50;
var tablero; 

//Robot
var Robot = new robot(0,0);

var img = new Image();
img.src = 'mnc.png';

//obejtivo
var objetivo = new robot(Math.floor(Math.random()*columnas),Math.floor(Math.random()*filas));

//cuadricula
var anchoC;
var altoC;
const muro = '#000000';
const camino = '#FFFFFF';
const pelota = '#FF0000';


function crearMatrix(f,c){
  var obj = new Array(f);
  for(a = 0 ; a<f ; a++){
    obj[a] = new Array(c);
  }
  return obj;
}


function casillas(x,y){
  //Posicion 
  this.x = x;
  this.y = y;

  //tipo si es muro =1 o camino = 0
  this.tipo = 0;

  var aleatiorio = Math.floor(Math.random()*7); 
  if(aleatiorio ==1)
    this.tipo = 1;
  
  //if(aleatiorio == 4 && aleatiorio2 == 2)
  //this.tipo = 2;
  

  this.dibuja = function(){
    var color;

    if(this.tipo == 0)
      color = camino;
    else if( this.tipo == 1)
      color = muro;
    else if ( this.tipo == 2)
      color = pelota;

  //dibujar el cuadro en el canvas
  ctx.fillStyle = color;
  ctx.strokeRect(this.x*anchoC,this.y*altoC,anchoC,altoC);
  ctx.fillRect(this.x*anchoC,this.y*altoC,anchoC,altoC);    
  }
}


function robot(x,y){
   //Posicion 
   this.x = x;
   this.y = y;
 
   this.tipo = 0;

   this.dibuja = function(){
 
   //dibujar el robot en el canvas
   ctx.fillStyle = '#01C40A';
    ctx.fillRect(x*anchoC,y*altoC,anchoC,altoC);   
   }
}

function redibujarRobot(x,y){
  ctx.drawImage(img ,x*anchoC,y*altoC);
  //ctx.fillStyle = '#F1C40F';
  //ctx.fillRect(x*anchoC,y*altoC,anchoC,altoC);
}



function iniciar(){
  mensaje = document.getElementById("mensaje");
  canvas = document.getElementById("Canvas");
  ctx = canvas.getContext("2d");

  //calculamos en tamaño de la cuadricula
  anchoC = parseInt(canvas.width/columnas);
  altoC = parseInt(canvas.height/filas);

  tablero = crearMatrix(filas,columnas);

  //se añade los cuadros al canvas
  for(i=0 ; i<columnas ; i++){
    for(j=0 ; j<filas; j++){
      tablero[i][j] = new casillas(i,j);
    }
  }
  
  //empezar el bucle
   intervalo = setInterval(function(){bucle();},1000/FPS);


}


function dibujaTablero(){
  for(i=0 ; i<columnas ; i++){
    for(j=0 ; j<filas; j++){
        tablero[i][j].dibuja();
    }
  }

}

function borraCanvas(){
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}


function algotirmo(){
  objetivo.dibuja();
  Robot.dibuja();
  redibujarRobot(Robot.x,Robot.y);
  if(Robot.x == objetivo.x && Robot.y == objetivo.y){
    console.log("LLEGO A LA META");
    mensaje.style.display="block";
    clearInterval(intervalo);
    }
    else if(Robot.y >= objetivo.y+2){
      if(tablero[Robot.x][Robot.y-1].tipo == 0){
        tablero[Robot.x][Robot.y].tipo = 2;
        Robot.y-=1;
        redibujarRobot(Robot.x,Robot.y);
      if(tablero[Robot.x+1][Robot.y].tipo == 0){
        tablero[Robot.x][Robot.y].tipo = 2;
        Robot.x+=1;
      }
      }else if(tablero[Robot.x+1][Robot.y].tipo == 0){
        tablero[Robot.x][Robot.y].tipo = 2;
        Robot.x+=1;
      }
    }
    else if(Robot.x < objetivo.x){
      if(Robot.x >=columnas-1 || Robot.y >= filas-1 )
          console.log("Fuera del escenario");
        if(tablero[Robot.x+1][Robot.y].tipo == 1){
          if(tablero[Robot.x][Robot.y+1].tipo == 1){
            tablero[Robot.x][Robot.y].tipo = 2; 
            Robot.x-=1;
            redibujarRobot(Robot.x,Robot.y);
          }
          while(tablero[Robot.x][Robot.y+1].tipo == 1){
          tablero[Robot.x][Robot.y].tipo = 2;
          Robot.x-=1;
          redibujarRobot(Robot.x,Robot.y);
          }
          tablero[Robot.x][Robot.y].tipo = 2;
          Robot.y+=1;
        }
        else if(tablero[Robot.x+1][Robot.y].tipo == 0){
          tablero[Robot.x][Robot.y].tipo = 2;
          Robot.x+=1;
        }
    }else if (Robot.x == objetivo.x) {
        if(tablero[Robot.x][Robot.y+1].tipo == 0){
          tablero[Robot.x][Robot.y].tipo = 2;
          Robot.y+=1;}
        else{
          while(tablero[Robot.x][Robot.y+1].tipo == 1){
            tablero[Robot.x][Robot.y].tipo = 2;
            tablero[Robot.x][Robot.y].dibuja();
            Robot.x-=1;
            redibujarRobot(Robot.x,Robot.y);
          }
          tablero[Robot.x][Robot.y].tipo = 2;
          Robot.y+=1;
        }
    }else if(Robot.y == objetivo.y){
        
    }


console.log("x = " + Robot.x  + "  y = " +Robot.y);

}




function bucle(){
  
  borraCanvas();
  dibujaTablero();
  algotirmo();
  
  
}