// Constructores
function Seguro(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
}

// Realizar cotización con datos
Seguro.prototype.cotizarSeguro = function(){

        const base = 2000;

        switch(this.marca){
                case '1':
                        cantidad = base * 1.15;
                        break;
                case '2':
                        cantidad = base * 1.25;
                        break;
                case '3':
                        cantidad = base * 1.30;
                        break;
                default:
                        break;
        }

        // Leer el año
        const diferencia = new Date().getFullYear() - this.year;

        // Cada año que la diferencia es mayor, el costo se reduce 3%
        cantidad -= ((diferencia * 3) * cantidad ) / 100



        if(this.tipo === 'basico'){
                cantidad *= 1.30;
        }else{
                cantidad *= 1.50;
        }

        return cantidad;


}

function UI() {};

// Llena las opciones de los años
UI.prototype.llenarOpciones = () => {
        const max = new Date().getFullYear(),
        min = max - 20

        const selectYear = document.querySelector('#year');

        for(let i = max; i > min; i--){
                let option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                selectYear.appendChild(option);
        }
}

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
        const div = document.createElement('div');

        if(tipo === 'error'){
                div.classList.add('error');
        }else{
                div.classList.add('correct');
        }

        div.classList.add('mensaje', 'mt-10');
        div.textContent = mensaje;

        // Insertar HTML
        const formulario = document.querySelector('#cotizar-seguro');
        formulario.insertBefore(div, document.querySelector('#resultado'));

        setTimeout( () => {
                div.remove();
        }, 2000)
}


// Instanciar UI
const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
        ui.llenarOpciones(); // LLena el select con los años ...
} )

eventListeners();
function eventListeners() {
        const formulario = document.querySelector('#cotizar-seguro');
        formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
        e.preventDefault();

        // Leer la marca seleccionada
        const marca = document.querySelector('#marca').value;

        // Leer el año seleccionado
        const year = document.querySelector('#year').value;

        // Leer el tipo de cobertura 
        const tipo = document.querySelector('input[name="tipo"]:checked').value;

        if(marca === '' || year === '' || tipo === ''){
                ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
                return;
        }else{
                console.log('Si pasó validación');
        }

        ui.mostrarMensaje('Cotizando', 'exito');

        // Instanciar el seguro
        const seguro = new Seguro(marca, year, tipo);
        seguro.cotizarSeguro();


        // Utilizar prototype para cotizar
}