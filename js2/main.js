$(document).ready(function() {
	

	var chartData;
	var searchData;
	var tableData = [];

 var socket = io.connect('http://socpub.cloudapp.net:9876');
    //call this when the page loads 
    //socket.emit("load_data","");

 document.getElementById("searchButton").addEventListener("click", function(){

      dta = $("input#itemSearch").val();
      if(dta.length > 1){
      	searchData = dta;

        socket.emit('search_from_web', 
        {
          search_query:  dta,
          from_page: 'loc'
        });



      // socket.emit('search_data', {
      //   data:  $("input#itemSearch").val()
      // });
        console.log("Sent Data: "+dta);
        $("input#name").val(null);
        clearTable();
      }else{


      }
    });

    socket.on('callback', function(data) {
    console.log(data.done);
      // Print the data.data somewhere...
    });


  socket.on('search_results', function (data) {
       console.log("Search Data Results For Chart");
       jsonData = JSON.stringify(data);
        console.log("TEST:"+jsonData)
        chartData = jsonData;

   //    	test = jQuery.parseJSON(jsonData);
   //    	console.log("TEST:"+test)
   //     json = jQuery.parseJSON(jsonData);
   //     console.log(json.data[0]);
   //     jsonData = JSON.stringify(json.data);
	  // chartData = jQuery.parseJSON(jsonData);
   //     console.log("chart data: "+chartData);
        updateChart();
     

    });

socket.on('search_results_for_web', function (data) {
       console.log("Search Data Results For Chart");
       jsonData = JSON.stringify(data);
        console.log("RESUTLS:"+jsonData)
        paredData = $.parseJSON(jsonData);

        dataList = [];

        // items = paredData.results;

        // console.log("ITEMS: "+ );


        for(var i in paredData){

     		   var name = paredData[i]['properties']['http://schema.org/name']
			     var description = paredData[i]['properties']['http://schema.org/description']
			     var provider = paredData[i]['properties']['http://schema.org/provider']
            var url = paredData[i]['properties']['http://schema.org/url']

			var dataEntry = [name, description, provider, url];
			dataList.push(dataEntry);
		}
		tableData = dataList;
		updateTable(tableData);

		//also send it off again to get the chart
		//document.getElementById("searchButton").click();
 		//console.log(dataList);

    });




function updateChart(){
	 var chart = new CanvasJS.Chart("chartContainer",
    {
      theme: "theme2",
      title:{
        text: "Unit Price for "+searchData
      },
      animationEnabled: true,
      // axisX: {
      //   valueFormatString: "yyyy-MM-dd HH:mm:ss",
      //   interval:1,
      //   intervalType: "month"
        
      // },
      axisY:{
          title:"Unit Price (Pence)",
        includeZero: false

        
      },
      data: $.parseJSON(chartData)
    });

chart.options.data[0].dataPoints.sort(compareDataPointXAscend);


chart.render();
}

});

var tableDataAll = [];

function updateTable(datas){

tableDataAll = tableDataAll.concat(datas)

$('#example').DataTable( {
        data: tableDataAll,
        destroy: true,
        columns: [
            { title: "Dataset Name" },
            { title: "Description" },
            { title: "Provider" },
            { title: "Link to Resource" }
        ],
        "columnDefs": [ {
         "targets": 3,
         "render": function ( data, type, full, meta ) {
          return '<a href="'+data+'" target="_blank">'+data+'</a>';
        }
       }]
    } );


}

function clearTable(){

tableDataAll = tableDataAll.concat(datas)

$('#example').DataTable( {
        data: [],
        destroy: true,
        columns: [
            { title: "Dataset Name" },
            { title: "Description" },
            { title: "Provider" },
            { title: "Link to Resource" }
        ]
    } );


}




function checkSubmit(e){
	
   if(e && e.keyCode == 13)
   {
      document.getElementById("searchButton").click();
   }
}

function compareDataPointYDescend(dataPoint1, dataPoint2) {
    return dataPoint2.y - dataPoint1.y;
}

function compareDataPointYAscend(dataPoint1, dataPoint2) {
    return dataPoint1.y - dataPoint2.y;
}


function compareDataPointXAscend(dataPoint1, dataPoint2) {
    return dataPoint1.x - dataPoint2.x;
}
