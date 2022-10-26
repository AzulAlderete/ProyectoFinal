const ACCESS_TOKEN =
  "ya29.a0Aa4xrXN2hx7cHw_QYP0MGXxluc8VF3OeaP_NWwc_3MIP8lE5sEyPIKK99v0O0upGzM6xcQNZgLV5dUx7-ywXptp--LC7sxIXoHBG4FPGegzYUERwo0I1I1OTIUiEm7WwZA2UzDNJ-oZM0kcyQi1xieyEsnRaaCgYKATASARISFQEjDvL9p-hF8syAYCCtfpmewxpNsQ0163";
 
const SHEET_ID = '1eoGscNuQvYkKN-uv6F6lBzGHd2YgUk7M3hp4dajCFNQ';

//Inicializamos la fecha a la fecha de hoy
document.getElementById('fecha').valueAsDate = new Date();


function onGuardarMercaderia() {

  //Obtenemos los datos del formulario
  const sucursal = document.getElementById('sucursal').value;
  const concepto = document.getElementById('nombre').value;
  const monto = document.getElementById('cantidad').value;
  const fecha = document.getElementById('fecha').value;
  const lote = document.getElementById('lote').value;
  
  //Creamos el JSON que espera nuestra API
  let data = {};
  
  let values = [];
  
  let fila = [sucursal, concepto, fecha, monto, lote];

  values.push(fila);
  
  //Verificar que coincida con el nombre de la hoja de nuestro sheet
  data.range = "mercaderias";
  
  data.majorDimension = "ROWS";
  data.values = values;

  //Invocamos al método POST de la API
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/mercaderias:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data)
    }
  ).then(function (response) {
    response.json().then(function (data) {

    });
  });

  //Limpiamos los campos del formulario para permitir cargar un nuevo gasto
  document.getElementById('nombre').value = "";
  document.getElementById('cantidad').value = "";
  document.getElementById('fecha').valueAsDate = new Date();
  document.getElementById('lote').value = "";
};