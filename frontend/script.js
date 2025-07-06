/*
 Funcion asincrona que al hacer Clic en el boton de Saludo realiza un GET al
 endpoint /api/greet enviandole el nombre ingresado en un prompt por el usuario 
 como parametro
 */

document.getElementById("saludoButton").addEventListener("click", async () => {
  let nombre = prompt("Ingrese su nombre:", "");
  const response = await fetch(`/api/greet?name=${nombre}`);
  const saludo = await response.json();
  const textoH1 = document.querySelector("#saludoTxt"); //Selecciono en el H1 del index.html con el id saludoTxt
  textoH1.innerHTML = saludo.message;
});

/*
Función Asincrona que hace que al cliquear en el boton del formulario hace un
POST al endpoint /api/students
*/
document.getElementById('formularioEstudiante').addEventListener('submit', async function(event) {
            event.preventDefault();
            //Genero objeto js con el atributo name y le inserto el valor que contiene el input con el id = name
            let jsonNombre = {
                name: document.getElementById('name').value
            };

            try {
                const respuesta = await fetch (`/api/students`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonNombre)
                });
                //Si la respuesta no es correcta arrojo mensaje de error
                if (!respuesta.ok) {
                    throw new Error('Respuesta de red no OK: ' 
                                                + respuesta.statusText);
                }
                const data = await respuesta.json();
                //Informo Id y nombre insertado en la BBDD en el HTML
                document.getElementById('mensajeRespuesta').innerText =
                        `Estudiante agregado: ${data.name} (ID: ${data.id})`;
                document.getElementById('name').value = '';
                cargarEstudiantes(); // Recargo lista de estudiantes
            }  catch (error) {
                console.error('Error:', error);
                document.getElementById('mensajeRespuesta').innerText =
                                            'Error al agregar el estudiante';
            }
});

/*
Funcion que Cargar la lista de Estudiantes en el HTML
*/
async function cargarEstudiantes () {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
};       