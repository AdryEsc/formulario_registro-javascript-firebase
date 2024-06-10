const firebaseConfig = {
    apiKey: "AIzaSyA6hX3J25HWQGMt40sMcv5m6pEsgMEn9X0",
    authDomain: "formulario-registro-2589c.firebaseapp.com",
    projectId: "formulario-registro-2589c",
    storageBucket: "formulario-registro-2589c.appspot.com",
    messagingSenderId: "476342831289",
    appId: "1:476342831289:web:e658b9742b687c82af3368",
    measurementId: "G-HBBJRLH44C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//Carga de los datos para el formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();
    
    //Validar campo nombre
    let nombreEntrada = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (nombreEntrada.value.trim() === '') {    //Con trim borramos los espacios en blanco al principio y al final del string
        errorNombre.textContent = 'Por favor, ingrese un nombre';
        errorNombre.classList.add('error-message');
    }else{
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    //Validar campo correo electronico
    let emailEntrada = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

    if (!emailPattern.test(emailEntrada.value)) {
        errorEmail.textContent = 'Por favor, ingrese un email valido';
        errorEmail.classList.add('error-message');
    }else{
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }

    //Validar campo contraseña
    let contrasenaEntrada = document.getElementById('password');
    let errorContrasena = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres, mayusculas, minusculas, numeros y caracteres especiales';
        errorContrasena.classList.add('error-message');
    }else{
        errorContrasena.textContent = '';
        errorContrasena.classList.remove('error-message');
    }
    
    //Si todos los campos son validos, se envia el formulario
    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {
        //BACKEND QUE RECIBA LA INFORMACION Y GUARDA EN LA BASE DE DATOS DE FIREBASE
        
        db.collection("users").add({
            nombre: nombreEntrada.value,
            email: emailEntrada.value,
            contrasena: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id);  //Genera un cartel de alerta con el mensaje
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });

    }
  }
);
  