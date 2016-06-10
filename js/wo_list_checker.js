    
    //connect to the Mongo database

    var socket = io.connect('http://socpub.cloudapp.net:9876');
    //call this when the page loads 

  	var active_wo_meta = {};
    socket.on('active_wo_list', function (data) {
       
      //console.log('Active WO List Obtained');
      //console.log(data);

      if(checkForListDifferences(data)){

      	//get the differences to redraw the table.
      	drawNewWOTable();

      }

      //var count = data.length;
     });


	var wo_to_add = {};
  
    //TO_DO - check if the list has updated
    function checkForListDifferences(data){

    	wo_to_add = {};
    	for(key in data){

    		if(!(key in active_wo_meta)){
    			wo_to_add[key] = data[key];
    			active_wo_meta[key] = data[key];
    		}

    	}
    	return true;

    }


    function drawNewWOTable(){
	    var html ='';
	    	for(key in wo_to_add){

	    		html = html + '<tr>'
	    						+'<td align=\'left\'>'+wo_to_add[key].wo_name+'</td>'
	    						+'<td align=\'left\'>'+wo_to_add[key].dataset_count+'</td>'
								+'<td align=\'left\'>'+wo_to_add[key].vis_count+'</td>'
	    						// +'<td align=\'left\'>'+'Yes'+'</td>'
	    						+'<td align=\'left\'>'+'<a class=\'text-warning\' href=\''+key+'\'>'+key+'</td>'
	    					+  '</tr>';
	    	}
	    $('#wo_table_list tr:last').after(html);
    }
 

  