/**
 * @author Juan Pablo Castrillón
 */

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "text.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                // tarr.push(headers[j]+":"+data[j]);
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    processLines(lines);
}
function processLines(lines){	
	var ranking_table = document.getElementById("ranking-table");
	var tbody = document.createElement("tbody");
	for (i = 0; i < lines.length; i++) {
		var linea = document.createElement("tr");
		var posicion = document.createElement("td");
		posicion.innerHTML = lines[i][0];
		var usuario = document.createElement("td");
		usuario.innerHTML = lines[i][1];
		var institucion = document.createElement("td");
		institucion.innerHTML = lines[i][2];
		var actual = document.createElement("td");
		actual.innerHTML = lines[i][3];
		var delta = document.createElement("td");
		delta.innerHTML = lines[i][4];
		var grafica = document.createElement("td");
		linea.appendChild(posicion);
		linea.appendChild(usuario);
		linea.appendChild(institucion);
		linea.appendChild(actual);
		linea.appendChild(delta);		
		grafica.appendChild(drawLines(lines[i]));
		linea.appendChild(grafica);
		tbody.appendChild(linea);
	}
	ranking_table.appendChild(tbody); 	
}

function drawLines(linea){
	var canvas = document.createElement("canvas");	
	
	var ctx = canvas.getContext("2d");
	window.myLine = new Chart(ctx).Line(datos(linea), {	
		scaleShowLabels: false
					
	});	
	return canvas;
}

function datos(usuario){
	dato = 
	{
		labels : ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
		 // labels : ["","","","","","","","","","","",""],
		datasets : [
			{
				label: usuario[0],				
				fillColor : "transparent",
				strokeColor : "black",
				pointColor : "#fffaaa",
				pointStrokeColor : "#000",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",			
				data : [usuario[4],usuario[5],usuario[6],usuario[7],usuario[8],usuario[9],usuario[10],usuario[11],usuario[12],usuario[13],usuario[14],usuario[15]]				
			}
		]

	};
	return dato;
}
