//Declaración de variables
var nombreUsuario = "Pablo Perez";
var saldoCuenta = 843508;
var saldoCuentaDolares = 500;
var limiteExtraccion = 20000;
var precioAgua = 350;
var precioTelefono = 425;
var precioLuz = 210;
var precioInternet = 570;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var usuario = "pperez";
var password = 1234;
var cuentaValida = false;

//Declaracion de funciones auxiliares
function sumarDineroCuenta(dineroIngresado) {
  saldoCuenta = saldoCuenta + dineroIngresado;
}

function restarDineroCuenta(dineroRetirado) {
  saldoCuenta = saldoCuenta - dineroRetirado;
}

function validarNumero(unNumero) {
  if (isNaN(unNumero) || unNumero == null) {
    alert(
      "OPERACION CANCELADA \nSi no cancelo la operación, pruebe con un valor numérico válido."
    );
  } else {
    return true;
  }
}

function validarSaldoCuenta(unNumero) {
  if (unNumero > saldoCuenta) {
    alert("No posee saldo suficiente");
    return false;
  } else {
    return true;
  }
}

function validarLimiteExtraccion(unNumero) {
  if (unNumero > limiteExtraccion) {
    alert("El monto supera el limite de extracción");
    return false;
  } else {
    return true;
  }
}

function validarCheque(numeroCheque, montoCheque) {
  return true;
}

function validarMultiploDe100(unNumero) {
  if (unNumero % 100 != 0) {
    alert("Ingrese multiplos de 100");
    return false;
  } else {
    return true;
  }
}

function validarCuentaDestino(unNumero) {
  if (unNumero == cuentaAmiga1 || unNumero == cuentaAmiga2) {
    return true;
  } else {
    alert("Cuenta destino inválida");
    return false;
  }
}

function validarSesion() {
  if (!cuentaValida) {
    alert("SESIOÓN INVÁLIDA.\n Volve a ingresar para intentar nuevamente.");
  }
  return cuentaValida;
}

function validarExtraccion(unNumero) {
  if (validarSesion()) {
    return (
      validarSaldoCuenta(unNumero) &
      validarLimiteExtraccion(unNumero) &
      validarMultiploDe100(unNumero)
    );
  } else {
    return false;
  }
}

function validarPagoServicios(unNumero) {
  if (validarSesion()) {
    return validarSaldoCuenta(unNumero);
  } else {
    return false;
  }
}

function validarTransferencia(unNumero) {
  if (validarSesion()) {
    return validarSaldoCuenta(unNumero);
  } else {
    return false;
  }
}

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
};

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
  var limiteAnterior = limiteExtraccion;
  var nuevoLimite = parseInt(prompt("Cual es el nuevo limite?"));
  if (validarNumero(nuevoLimite) & validarSesion()) {
    limiteExtraccion = nuevoLimite;
    actualizarLimiteEnPantalla();
    alert(
      "LIMITE ANTERIOR: " +
        limiteAnterior +
        " \n NUEVO LIMITE: " +
        limiteExtraccion
    );
  }
}

function extraerDinero() {
  var saldoAnterior = saldoCuenta;
  var dineroExtraido = parseInt(prompt("Cuanto dinero extraes?"));
  if (validarNumero(dineroExtraido)) {
    if (validarExtraccion(dineroExtraido)) {
      restarDineroCuenta(dineroExtraido);
      actualizarSaldoEnPantalla();
      alert(
        "SALDO ANTERIOR: " +
          saldoAnterior +
          " \nMONTO EXTRAIDO: " +
          dineroExtraido +
          " \nNUEVO SALDO: " +
          saldoCuenta
      );
    }
  }
}

function depositarDinero() {
  var saldoAnterior = saldoCuenta;
  var dineroIngresado = parseInt(prompt("Cuanto dinero ingresas?"));
  if (validarNumero(dineroIngresado) & validarSesion()) {
    sumarDineroCuenta(dineroIngresado);
    actualizarSaldoEnPantalla();
    alert(
      "SALDO ANTERIOR: " +
        saldoAnterior +
        " \nMONTO DEPOSITADO: " +
        dineroIngresado +
        " \nNUEVO SALDO: " +
        saldoCuenta
    );
  }
}

function ingresarCheque() {
  var saldoAnterior = saldoCuenta;
  var chequeIngresado = prompt("Ingrese el numero de cheque");
  var dineroIngresado = parseInt(prompt("Monto del Cheque a Depositar?"));
  if (
    validarNumero(dineroIngresado) &
    validarNumero(chequeIngresado) &
    validarSesion() &
    validarCheque(chequeIngresado, dineroIngresado) //simula la consulta a base interbanking de cheques
  ) {
    sumarDineroCuenta(dineroIngresado);
    actualizarSaldoEnPantalla();
    alert(
      "SALDO ANTERIOR: " +
        saldoAnterior +
        " \nMONTO DEPOSITADO: " +
        dineroIngresado +
        " \nNUEVO SALDO: " +
        saldoCuenta
    );
  }
}

function pagarServicio() {
  var servicio = prompt(
    "Ingrese el número que corresponda con el servicio que desea abonar:\n(1) Agua\n(2) Luz\n(3) Internet\n(4) Telefono"
  );
  var saldoAnterior = saldoCuenta;
  var operacionExitosa = false;
  switch (parseInt(servicio)) {
    case 1:
      if (validarPagoServicios(precioAgua)) {
        saldoCuenta = saldoCuenta - precioAgua;
        servicio = "Agua";
        operacionExitosa = true;
      }
      break;
    case 2:
      if (validarPagoServicios(precioLuz)) {
        saldoCuenta = saldoCuenta - precioLuz;
        servicio = "Luz";
        operacionExitosa = true;
      }
      break;
    case 3:
      if (validarPagoServicios(precioInternet)) {
        saldoCuenta = saldoCuenta - precioInternet;
        servicio = "Internet";
        operacionExitosa = true;
      }
      break;
    case 4:
      if (validarPagoServicios(precioTelefono)) {
        saldoCuenta = saldoCuenta - precioTelefono;
        servicio = "Telefono";
        operacionExitosa = true;
      }
      break;
    default:
      alert("Ingrese un codigo de servicio valido");
  }
  if (operacionExitosa) {
    var dineroDescontado = saldoAnterior - saldoCuenta;
    alert(
      "Has pagado con exito el servicio " +
        servicio +
        ".\nSaldo anterior: $" +
        saldoAnterior +
        "\nDinero descontado: $" +
        dineroDescontado +
        "\nSaldo actual: $" +
        saldoCuenta
    );
    actualizarSaldoEnPantalla();
  }
}

function transferirDinero() {
  var montoTransferencia = prompt("Ingrese el monto que desea transferir");
  if (validarTransferencia(montoTransferencia)) {
    var numeroCuenta = prompt("Ingrese numero de cuenta a transferir");
    if (validarCuentaDestino(numeroCuenta)) {
      saldoCuenta = saldoCuenta - montoTransferencia;
      actualizarSaldoEnPantalla();
      alert(
        "OPERACION EXITOSA\nMonto Transferido: $" +
          montoTransferencia +
          "\nCuenta Destino: " +
          numeroCuenta
      );
    }
  }
}

function iniciarSesion() {
  var usuarioIngresado = prompt("INGRESE SU USUARIO:");
  if (usuario != usuarioIngresado) {
    saldoCuenta = 0;
    limiteExtraccion = 0;
    alert(
      "USUARIO INVÁLIDO \nTu dinero fue retenido por cuestiones de seguridad. Volve a ingresar para intentarlo nuevamente."
    );
  } else {
    var passwordIngresado = prompt("INGRESE CLAVE HOME BANKING: ");
    if (passwordIngresado != password) {
      saldoCuenta = 0;
      limiteExtraccion = 0;
      alert(
        "CLAVE INVÁLIDA \nTu dinero fue retenido por cuestiones de seguridad. Volve a ingresar para intentarlo nuevamente."
      );
    } else {
      cuentaValida = true;
      alert(
        "BIENVENIDO " +
          nombreUsuario +
          "\nYa podes comenzar a operar en tu Home Banking"
      );
    }
  }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML =
    "Tu límite de extracción es: $" + limiteExtraccion;
}

iniciarSesion();
