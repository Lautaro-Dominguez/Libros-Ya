const btnrayas = document.getElementById('btnrayas') 
let isShown=false
btnrayas.addEventListener("click", ()=>{ 
    if (isShown){
        $("#menudesplegable").empty()
        isShown=false
    }
    else{
        $("#menudesplegable").append(
            `<br class="mostrando">
            <a class="mostrando" href="index.html" class="headertext" ><p style="background-color:white; line-height:15px;">Página Principal</p></a>
            <a  class="mostrando"href="tienda.html" class="headertext" ><p style="background-color:white; line-height:15px;">Tienda Online</p></a>`
            )
        isShown=true
    }
    
})

let productos=[]
let carrito= JSON.parse(localStorage.getItem('carrito'))

if (!carrito){
    carrito=[]
}


function guardarElementos(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}



function agregarProductos(idProducto){
    let=productoA= productos.find(producto=>producto.id===idProducto)
    carrito.push(productoA)
    guardarElementos()
}

function removerElemento(idProducto){
    let posicionProductoARemover = carrito.findIndex( prod=> prod.id === idProducto)
    carrito.splice(posicionProductoARemover, 1)
    guardarElementos()
    location.reload()
    
}


fetch("productos.json")
    .then(producto => {
        return producto.json();
    })
    .then(data => {
        productos=data
        productos.map(
            prod => $('#lista-productos').append(
                `<li>
                    <img class=imgprod src=${prod.img}>
                    <h2> ${prod.nombre} </h2>
                    <p> $${prod.precio} </p>
                    <button id="btnInfo"class="btn-agregar" onclick="abrirModal(${prod.id})">Más Información</button>
                    <button id="btn${prod.id}" class="btn-agregar" onclick="agregarProductos(${prod.id})"> Agregar al carrito</button>
                </li>`
            )
        )
        
    })

/*function agregarcontenido(idProducto){
    
    
}*/

function abrirModal(idProducto) {
    modal.style.display = "block";
    $('#contenidoModal').append(
        `<li class="modalelementos">
            <img  style="background-color:white; width:150px; margin:auto;" src=${productos[idProducto].img}>
            <div style="background-color:white;">
                <br>
                <h2>${productos[idProducto].nombre}</h2>
                <br>
                <h3 style="background-color:white;">Precio:$${productos[idProducto].precio}</h3>
                <p style="background-color:white;">Descripción: ${productos[idProducto].descrip}</p>
                <button id="btn${productos[idProducto].id}" class="btn-agregar" onclick="agregarProductos(${productos[idProducto].id})"> Agregar al carrito</button>
            </div>
            
        </li>`
    )
    
}

function cerrarModal() {
    modal.style.display = "none";
    $('#contenidoModal').empty()
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $('#contenidoModal').empty()
    }
}

let precio= 0

carrito.map(
    prod => precio=(
        precio + parseInt(`${prod.precio}`)
    )
)

carrito.map(
    prod => $('#productos-agregados').append(
        `<li class="productos-agregados">
            <img class="imgagregada" src=${prod.img}>
            <div style="background-color:white">
                <h2> ${prod.nombre} </h2>
                <p> $${prod.precio} </p>
                <button class="btn-agregar" onclick="removerElemento(${prod.id})">Remover</button>
            </div>
            
        
        </li>`    
    )
)



console.log(carrito.length)
if (carrito.length==0){
    $('#productos-agregados').append(
        `<h2> El Carrito está vacio</h2>
        <a href="tienda.html"><p>Buscá algo para comprar</p></a>
        `
    )
    $('#borrartodo').empty()
}

if (carrito.length!=0){
    $('#total').append(`<h6 style="background-color:white" >Total:  $</h6>`+(precio))
    $('#borrartodo').append(`<button onclick="localStorage.clear(carrito); location.reload()"  class="btn-agregar">Vaciar el Carrito</button>`)
}

console.log(precio)