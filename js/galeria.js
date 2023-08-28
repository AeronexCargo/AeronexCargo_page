
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp()
})

function iniciarApp(){
    crearGaleria()
}

function crearGaleria(){

    const galeria = document.querySelector('.galeria-imagenes')
    
    for(let i = 3; i <= 17; i++){

        const imagen = document.createElement('picture')
        imagen.innerHTML = `
        <img loading="lazy" width="150" height="180" src="/img/team/team${i}.png">
        <p> Nombre y cargo</p>
        `
        imagen.onclick = function(){
            mostarImagen(i)
        }

        galeria.appendChild(imagen)
    }
}

function mostarImagen(i){
    const imagen = document.createElement('picture')
    
    imagen.innerHTML = `
    <img loading="lazy" width="300" height="350" src="/img/team/team${i}.png">
    `
    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen)
    overlay.classList.add('overlay')
    
    overlay.onclick = function(){

        const body = document.querySelector('body')
        body.classList.remove('fijar-body')
        overlay.remove()

    }

    // btn para cerrar el modal
    const cerrarFoto = document.createElement('P')
    cerrarFoto.textContent = 'X'
    cerrarFoto.classList.add('cerrar')

    cerrarFoto.onclick = function() {
        const body = document.querySelector('body')
        body.classList.remove('fijar-body')
        overlay.remove()
    }

    overlay.appendChild(cerrarFoto)

    const body = document.querySelector('body')
    body.appendChild(overlay)
    body.classList.add('fijar-body')
}