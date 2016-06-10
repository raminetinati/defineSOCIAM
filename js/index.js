    
    //connect to the Mongo database

    var socket = io.connect('http://socpub.cloudapp.net:9876');
    //call this when the page loads 

	var search_results_table = false;
	

  socket.on('search_results_for_web', function (data) {
       
      console.log("Search Results obtained");
      console.log(data);



	  if(!search_results_table){
			createSearchResultsTable();
		
		}
		addResultsToTable(data);
      
      //var count = data.length;
     });

//Go off and search for something!
    $('#search').on('click', function(event) {
      event.preventDefault();

     dta = $("input#query").val();
     if(dta.length > 1){
      	
     	emptySearchTable();

      	// var test_data = {"dataset_name":"Foo", 
      	// 				"dataset_author":"John Do",
      	// 				"dataset_date":"01/01/2015",
      	// 				"dataset_url":"url",
      	// 				"dataset_type":"MongoDB"};
      	// var test = [];
      	// test.push(test_data);
      	//for testing...
        //showSearchResults(test);


      	socket.emit('search_from_web', 
      	{
      		search_query:  dta
      	});

        console.log("Sent Data: "+dta);
        $("input#query").val(null);
      }else{

      }
    });


      $('#searchLOC').on('click', function(event) {
      event.preventDefault();

     dta = $("input#query").val();
     if(dta.length > 1){
        
      emptySearchTable();

         socket.emit('search_from_web', 
        {
          search_query:  dta,
          from_page: 'loc'
        });

        console.log("Sent Data: "+dta);
        $("input#query").val(null);
      }else{

      }
    });

 function emptySearchTable(){

 	 	if(search_results_table){
 	 		console.log("emptying search table");
      		$("#search_results_table td").remove();
      	}
 }

function createSearchResultsTable(){

	var html = '<div class=\'row\'>'
					// +'<div class=\'col-lg-12 text-center\'>'
					// +'<h2>Results</h2>'
     //                	+'</div>'
                     +'<div class=\"bs-example\" data-example-id=\"simple-table\">'
                    +'<table class=\"table\" id=\"search_results_table\">'
                        +'<thead>'
                            +'<tr>'
                              +'<th>Dataset Name</th>'
                              +'<th>Description</th>'
                              +'<th>Author</th>'
							                +'<th>Date</th>'
                              +'<th>URL</th>'
                            +'</tr>'
                          +'</thead>'
                          +'<tbody>'
                          +'</tbody>'
                    +'</table>'
                  +'</div>';

    html = html + "</div>";
	$("#search_results span").html(html);
	search_results_table = true;

}


function addResultsToTable(data){
		try{
	    var html ="";
	    	for(key in data){
	    		console.log("key "+key);
	    		html = html + "<tr>"
	    						+"<td align=\"left\">"+data[key]['properties']['http://schema.org/name']+"</td>"
								+"<td align=\"left\">"+data[key]['properties']['http://schema.org/description']+"</td>"
	    						+"<td align=\"left\">"+data[key]['properties']['http://schema.org/provider']+"</td>"
								+"<td align=\"left\">"+new Date()+"</td>"
	    						+"<td align=\"left\">"+"<a class=\"text-warning\" href=\""+data[key]['properties']['http://schema.org/url']+"\">"+ data[key]['properties']['http://schema.org/url']+"</a>"+"</td>"
	    					+  "</tr>";
	    	}
	    $("#search_results_table tr:last").after(html);
	}catch(e){

	}
//put an interval to make sure we update page periodically.

}