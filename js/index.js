    
    //connect to the Mongo database

    var socket = io.connect('http://sociamvm-app-001.ecs.soton.ac.uk:3002');
    //call this when the page loads 
    socket.emit("load_data","");



    //for interval updating
   function loadLatestData(){
    socket.emit("load_data","");
  }

     socket.on('historic_data', function (data) {
       console.log("Historic Data found");
      console.log(data);
      var count = data.length;
      var responses=""
         $("#responses span").html(count);

         for(var i=data.length-1; i>(data.length-4); i--){

          responses = responses + "<br>" + data[i].date + "<br>"+ data[i].message + "<br>";

         }
            $("#latestContributions span").html(responses);


    });

    $('#submit_define').on('click', function(event) {
      event.preventDefault();

      dta = $("input#name").val();
      if(dta.length > 1){
      socket.emit('define_data', {
        define_data:  $("input#name").val()
      });
        console.log("Sent Data: "+dta);
        $("input#name").val(null);
      }else{


      }
    });

    socket.on('callback', function(data) {
    console.log(data.done);
      // Print the data.data somewhere...
    });


//put an interval to make sure we update page periodically.

var interval = setInterval(function(){loadLatestData()}, 20000);
