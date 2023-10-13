// Inicializar la lista de alumnos
let alumnos = [];

// Función para agregar un alumno
function agregarAlumno() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const edad = document.getElementById("edad").value;

    const alumno = {
        nombre,
        apellidos,
        edad,
        materias: [],
        calificaciones: [],
    };

    alumnos.push(alumno);
    actualizarListaAlumnos();
    guardarEnLocalStorage();
    limpiarFormulario();
}

// Función para mostrar la lista de alumnos
function actualizarListaAlumnos() {
    const listaAlumnos = document.getElementById("alumnos-list");
    listaAlumnos.innerHTML = "";

    for (let i = 0; i < alumnos.length; i++) {
        const alumno = alumnos[i];
        const promedio = calcularPromedio(alumno.calificaciones);

        const alumnoHTML = document.createElement("div");
        alumnoHTML.innerHTML = `
            <h3>${alumno.nombre} ${alumno.apellidos}</h3>
            <p>Edad: ${alumno.edad}</p>
            <p>Materias: ${alumno.materias.join(", ")}</p>
            <p>Calificaciones: ${alumno.calificaciones.join(", ")}</p>
            <p>Promedio: ${promedio.toFixed(2)}</p>
        `;

        listaAlumnos.appendChild(alumnoHTML);
    }
}

// Función para calcular el promedio
function calcularPromedio(calificaciones) {
    if (calificaciones.length === 0) {
        return 0;
    }
    const sum = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
    return sum / calificaciones.length;
}

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

// Función para cargar desde localStorage
function cargarDesdeLocalStorage() {
    const data = localStorage.getItem("alumnos");
    if (data) {
        alumnos = JSON.parse(data);
        actualizarListaAlumnos();
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("edad").value = "";
}

// Evento para agregar un alumno
document.getElementById("agregar-alumno").addEventListener("click", agregarAlumno);

// Cargar datos desde localStorage al cargar la página
cargarDesdeLocalStorage();
