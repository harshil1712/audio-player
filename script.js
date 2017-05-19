$(document).ready(function(){
var searchTxt,min=0,sec=0, availableTags = [],cover=[],songURL=[],index=0;
    $.getJSON('http://starlord.hackerearth.com/sureify/cokestudio').done(function(data){
    	for (var i = 0; i < data.length; i++) {    		
    		var title= data[i]['song'],
    			artist = data[i]['artists'],
                url=data[i]['url'],
                img = data[i]['cover_image'];
            cover[i]=img;
            songURL[i]=url;            
            $('.cover-img').attr('src',cover[0]);
            $('#song').attr('src',songURL[0]);
            $('#dwnld-btn').attr('href',songURL[0]);
    		for (var j =  0; j<=i; j++) {    				
    				if (j==i) {
    					$('#cards').append("<div class='col-md-4'><a role='button' href='#' id='card-"+j+"' class='card-layout'><img src='"+img+"'><h1 class='title'>"+title+"</h1><p>Artists: "+artist+"</p></a></div>");
    				}    			
    		}
            availableTags[i]=title;
            $( "#search" ).autocomplete({
              source: availableTags,
              select: function(){
                searchTxt = $('#search').html();
                //console.log(searchTxt);
              }
            });
    	}
    });
    var audio = new Audio;
    $('#slider').slider();
    var song=$('#song')[0];
    // Play Pause function
    $('#play-btn').click(function(){
        var $this = $(this);
        if($this.hasClass('glyphicon-play')){
            $this.toggleClass('glyphicon-play glyphicon-pause');
            $('#song').trigger('play');
        }
        else{
            $this.toggleClass('glyphicon-pause glyphicon-play');
            $('#song').trigger('pause'); 
        }
    });
    // Progress bar update and timer update
    song.addEventListener('timeupdate',function (){
        value = Math.floor((100 / song.duration) * song.currentTime);
        $('#head').animate({'margin-left': value+'%'},50,'linear');
        min=Math.floor((song.duration-song.currentTime)/60,10);
        sec=Math.floor((((song.duration-song.currentTime)/60)-min)*60,10);
        sec= sec>9?sec:'0'+sec;
        //console.log(min,sec);
        $('#timer').text('-'+min+':'+sec);
        $('#slider').slider({
      value: song.currentTime,
      orientation: "horizontal",
      range: "min",
      max: song.duration,
      animate: true,
      slide: function() {
        manualSeek = true;
      },
      stop:function(e,ui) {
        manualSeek = false;
        song.currentTime = ui.value;
      }
        });
        if(sec==0){
            min = Math.floor((song.duration/60),10);
            sec= Math.floor(((song.duration/60)-min)*60,10);
            $('#play-btn').removeClass('glyphicon-pause').addClass('glyphicon-play');
            $('#timer').text(min+":"+sec);
            $('#slider').slider({value:0});
        }
    });
    // Getting song duration for timer
    song.onloadedmetadata = function(){
        min=Math.floor(song.duration/60,10);
        sec=Math.floor(((song.duration/60)-min)*60,10);
        if(song.duration==NaN){
            $('#timer').text('0'+':'+'00');
        }
        else{
            sec= sec>9?sec:'0'+sec;
            $('#timer').text(min+':'+sec);
        }
    }
    $('#volume').click(function(){
        $(this).toggleClass('glyphicon-volume-up glyphicon-volume-off');
        if($(this).hasClass('glyphicon-volume-off')){
            song.volume = 0;
        }
        else{
            song.volume = 1;
        }
    });
    $('#frwd').click(function(){  
        index++;
        $('.cover-img').attr('src',cover[index]);
        $('#song').attr('src',songURL[index]);
        $('#dwnld-btn').attr('href',songURL[index]);
        if($('#play-btn').hasClass('glyphicon-play')){
            $('#song').trigger('pause');
        }
        else{
            $('#play-btn').toggleClass('glyphicon-pause glyphicon-play');
        }
        if(index>=10){
            if($('#play-btn').hasClass('glyphicon-play')){
                $('#song').trigger('pause');
            }
            else{
                $('#play-btn').toggleClass('glyphicon-pause glyphicon-play');
                $('#song').trigger('pause');
            }
            index=9;
        }
    });
    $('#bkwd').click(function(){          
        if(index!=0){
            index--;
            $('.cover-img').attr('src',cover[index]);
            $('#song').attr('src',songURL[index]);
            $('#dwnld-btn').attr('href',songURL[index]);
            if($('#play-btn').hasClass('glyphicon-play')){
                $('#song').trigger('pause');
            }
            else{
                $('#play-btn').toggleClass('glyphicon-pause glyphicon-play');
            }
        }
    });
});