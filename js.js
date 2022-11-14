//Inicializacion de todos los botones.
const botonReyes = document.getElementById("botonReyesMagos");
const botonRandom = document.getElementById("botonRandom");
const botonMitad = document.getElementById("botonMitadTexto");
const botonUltimo = document.getElementById("botonUltimoCar");
const botonReves = document.getElementById("botonFraseReves");
const botonGuion = document.getElementById("botonFraseGuion");
const botonVocales = document.getElementById("botonVocales");

//Inicializacion de todas las cajas.
const cajaFecha = document.getElementById("fecha");
const cajaRadioCirculo = document.getElementById("cajaRadio");
const cajaRandomPeque =document.getElementById("cajaRandomPeque");
const cajaRandomGrande =document.getElementById("cajaRandomGrande");
const cajaTexto = document.getElementById("cajaTexto");

//Asignacion de los diferentes EventListener
//1
botonReyes.addEventListener("click", function(){reyesMagos(cajaFecha)});

//3
cajaRadioCirculo.addEventListener("keypress",(event)=> {
    if (event.key === "Enter") { // Se activa el evento con la pulsacion de la tecla indicada.
      event.preventDefault();
     calcularAreaCirculo(cajaRadioCirculo.value);
    }},true);//True necesario para que funcione el listener especializado.

//4
botonRandom.addEventListener("click",function(){
    calcularAleatorio(Number(cajaRandomPeque.value),Number(cajaRandomGrande.value))//Metemos los valores como numeros directamente para no tener que parsear despues
});

//5
botonMitad.addEventListener("click",function(){mitadCar(cajaTexto.value);});
botonUltimo.addEventListener("click",function(){ultimoCaracter(cajaTexto.value);});
botonReves.addEventListener("click",function(){cadenaInversa(cajaTexto.value);});
botonGuion.addEventListener("click",function(){cadenaGuiones(cajaTexto.value);});
botonVocales.addEventListener("click",function(){contarVocales(cajaTexto.value);});

//Creacion de todas las funciones
//1
function reyesMagos(Fecha){
    //Parseo manual de los datos que nos introduce user por pantalla
    let fechaAno = Number(String(Fecha.value).slice(0,4));//Peta si el año es 10000
    let fechaMes = Number(String(Fecha.value).slice(5,7));
    let fechaDia = Number(String(Fecha.value).slice(8,10));

    //Variable de tipo date para poder hacer operaciones y la asignacion de valores de user
    let fechaInsertada = new Date();
    fechaInsertada.setDate(fechaDia);
    fechaInsertada.setFullYear(fechaAno);
    fechaInsertada.setMonth(fechaMes-1);

    //Fecha que sera nuestros reyes de referencia
    let fechaDiferencial = new Date();
    fechaDiferencial.setMonth(0);
    fechaDiferencial.setDate(6);

    //If para saber si es posible que los reyes ocurran en el mismo año
    if(fechaMes==1 && fechaDia<=6){
        fechaDiferencial.setFullYear(fechaAno);
    }else{
        fechaDiferencial.setFullYear(fechaAno+1);
    }

    //print y calculos
    let dias = Math.round((fechaDiferencial.getTime()-fechaInsertada.getTime())/(24*60*60*1000));
    alert("Quedan "+dias+" días para que lleguen los reyes magos");
    return;
}


//2
function fechaActual(){
    let fechaPruebas = new Date();//Fecha actual del momento de ejecucion
    let dia = "";
    let mes = "";

    //Switch para parseo del dia a texto y idioma
    switch(fechaPruebas.getDay()){
        case 0:
            dia="lunes"
            break;
        case 1:
            dia="martes"
            break;
        case 2:
            dia="miercoles"
            break;
        case 3:
            dia="jueves"
            break;
        case 4:
            dia="viernes"
            break;
        case 5:
            dia="sabado"
            break;
        case 6:
            dia="domingo"
            break;
        default:
            break;
    }

     //Switch para parseo del mes a texto y idioma
    switch(fechaPruebas.getMonth()){
        case 0:
            mes="enero"
            break;
        case 1:
            mes="febrero"
            break;
        case 2:
            mes="marzo"
            break;
        case 3:
            mes="abril"
            break;
        case 4:
            mes="mayo"
            break;
        case 5:
            mes="junio"
            break;
        case 6:
            mes="julio"
            break;
        case 7:
            mes="agosto"
            break;
        case 8:
            mes="septiembre"
            break;
        case 9:
            mes="octubre"
            break;
        case 10:
            mes="noviembre"
            break;
        case 11:
            mes="diciembre"
            break;
        default:
            break;
    }

    //Print no muy bonito con los diferentes datos que hemos conseguido de la fecha
    alert("Hoy es "+dia+", "+fechaPruebas.getDate()+" de "+mes+" de "+fechaPruebas.getFullYear()+" y son las "
    +String(fechaPruebas.getHours()).padStart(2,0)+":"+String(fechaPruebas.getMinutes()).padStart(2,0)+" horas");
    return;
}

//3
function calcularAreaCirculo(radio){
    //Comprobacion de si nos dan valor vacio(HTML se ocupa de no poder recivir letras o numeros negativos)
    if (radio!=null && radio!=""){
        let area = Math.pow(radio,2) * Math.PI;
        let longitud = radio*2*Math.PI;
        alert("El area del circulo es "+area.toFixed(2)+" y la longitud es "+longitud.toFixed(2));
        
    }else
        cajaRadioCirculo.placeholder = "Debes introducir un número";//Mensaje de error en caso de vacio
    return;
}

//4
function calcularAleatorio(comienzo,fin){
    //Comprobacion de si ambos valores son iguales  y de si valores al reves
    if(comienzo!=fin && comienzo<fin){//datos esperados
        let random = 0;
        random=Math.floor(Math.random() * (fin-comienzo+1)+comienzo);
        alert("El numero aleatorio entre "+comienzo+" y "+fin+" es: "+random);
        return;
    }else if(comienzo>fin){//datos al reves
        let random = 0;
        random=Math.floor(Math.random() * (comienzo-fin+1)+fin);
        alert("El principio y el final estan al reves chic@ mal@ :P");
        alert("El numero aleatorio entre "+fin+" y "+comienzo+" es: "+random);
        return;
    }else{//mismo numero
        cajaRandomPeque.value="";
        cajaRandomPeque.placeholder="Numeros";
        cajaRandomGrande.value="";
        cajaRandomGrande.placeholder="Iguales";
        alert("Esto no funciona asi");
        return;
    }
}

//5a
function mitadCar(cadena){
    let aux = "";
    for(let i=Math.floor(cadena.length/2); i<cadena.length;i++){//recorremos la cadena desde la mitad redondeada hacia abajo.
        aux=aux+cadena[i];
    }
    alert("La mitad de tu cadena es: "+aux);
    return;
}

//5b
function ultimoCaracter(cadena){
    alert("El ultimo caracter de tu cadena es: "+cadena[cadena.length-1]);//Invocamos la string como una array y le pedimos el ultimo elemnto
    return;
}

//5c
function cadenaInversa(cadena){
    let aux = "";
    for(let i=cadena.length-1; i>=0;i--){//Recorremos la cadena al reves
        aux+=cadena[i];
    }
    alert("Tu cadena del reves es: "+aux);
    return;
}

//5d
function cadenaGuiones(cadena){
    cadena=cadena.replace(/\s+/g,'');//hacemos un replace de espacios en blanco por vacio
    let aux = "";
    for(let i=0; i<cadena.length-1;i++){//ponemos .length-1 para poder salir antes del bucle y meter la ultima letra sin - 
        aux+=cadena[i]+"-";
    }
    aux+=cadena[cadena.length-1];//hay que hacer esto para que no tener que decidir entre tener un - al princpio o el final de la aux
    alert("Tu cadena dividida por guiones es: "+aux);
    return;
}

//5e
function contarVocales(cadena){
    const vocales="aáeéiíoóuú";//Todas la vocales con tildes españolas
    let aux = 0;
    for(const letra of cadena)//recorremos la cadena dandonos cada letra en la variable letra
        if(vocales.includes(letra.toLowerCase()))//evitamos errores de esta forma
            aux++;
    alert("Tu cadena tiene "+aux+" vocales");
    return;
}
