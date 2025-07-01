document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
});

document.getElementById("saludoButton").addEventListener("click", async () => {
  let nombre = prompt("Ingrese su nombre:", "");
  const response = await fetch(`/api/greet?name=${nombre}`);
  const saludo = await response.json();
  const textoH1 = document.querySelector("#saludoTxt");
  textoH1.innerHTML = saludo.message;
});