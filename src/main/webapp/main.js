

// cmejero
function iniciarSesion() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nick = document.getElementById('nick').value;
        const contrasenia = document.getElementById('password').value;

       
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'bsdt.json', true); 

        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                const data = JSON.parse(xhr.responseText);
                
                const club = data.clubs.find(club => club.nick === nick && club.contrasenia === contrasenia);

                if (!club) {
                    alert('El club no existe o las credenciales son incorrectas.');
                } else {
                    alert('Bienvenido al club!');
                   
                }
            }
        };

        xhr.send();
    });
	
}







// Función para eliminar club
function borrarClub() {
    const nick = document.getElementById("nick").value;
    const contrasenia = document.getElementById("contrasenia").value;

    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "bsdt.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const clubIndex = data.clubs.findIndex(club => club.nick === nick && club.contrasenia === contrasenia);

            if (clubIndex !== -1) {
               
                const confirmacion = prompt("Introduce nuevamente el nick para confirmar la eliminación:");

                if (confirmacion === nick) {
                   
                    const xhrDelete = new XMLHttpRequest();
                    xhrDelete.open("DELETE", `/eliminarClub`, true); 
                    xhrDelete.setRequestHeader("Content-Type", "application/json");

                   
                    xhrDelete.onreadystatechange = function() {
                        if (xhrDelete.readyState === 4 && xhrDelete.status === 200) {
                            alert("Club eliminado exitosamente.");
                        } else if (xhrDelete.readyState === 4) {
                            alert("Error al eliminar el club.");
                        }
                    };

                   
                    xhrDelete.send(JSON.stringify({ index: clubIndex }));
                } else {
                    alert("El nick de confirmación no coincide. Operación cancelada.");
                }
            } else {
                
                alert("Nick o contraseña incorrectos. No se pudo encontrar el club.");
            }
        }
    };
    xhr.send();
	
}




//awanuer



function recogerDatos() {
	const { time } = require("console");

	var datosUsuario = [];
	var jsonString;
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    var confirmarContrasena = document.getElementById('repetirContrasena').value;

    if (contrasena === repetirContrasena) {
        datosUsuario = [nombre, email, contrasena]; //0 = nom, 1 = email, 2 = contr;
        jsonString = JSON.stringify({
            nombre: nombre,
            email: email,
            contrasena: contrasena
        });
        alert(jsonString);
        return; // Evita que el formulario se envíe y recargue la página
    } else {
        alert("Las contraseñas no coinciden");
        return false;
    }
}

if (document.getElementById('loginForm')) {
    
	borrarClub();
	
}
