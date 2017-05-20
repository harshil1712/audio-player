$(document).ready(function(){
var searchTxt,min=0,sec=0, availableTags = [],cover=[],songURL=[],index=0,durationTime;
    $.getJSON('http://starlord.hackerearth.com/sureify/cokestudio').done(function(data){
    	for (var i = 0; i < data.length; i++) {    		
    		var title= data[i]['song'],
    			artist = data[i]['artists'],
                url=data[i]['url'],
                img = data[i]['cover_image'];
            cover[i]=img;
            songURL[i]=url;            
            $('.cover-img').attr('src',cover[0]);
            audio.src = songURL[0];
            $('#dwnld-btn').attr('href',songURL[0]);
    		for (var j =  0; j<=i; j++) {    				
    				if (j==i) {
    					$('#cards').append("<div class='col-md-4'><a role='button' id='"+j+"' class='card-layout'><img src='"+img+"'><h1 class='title'>"+title+"</h1><p>Artists: "+artist+"</p></a></div>");
                        document.getElementById(j).addEventListener('click',function(){
                            index=parseInt($(this).attr('id'));
                            audio.src=songURL[index];
                            audio.play();
                            $('.cover-img').attr('src',cover[index]);
                            $('#play-btn').toggleClass('glyphicon-play glyphicon-pause');
                        });
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
    var audio = new Audio(songURL);
    $('#slider').slider();
    //var song=$('#song')[0];
    // Play Pause function
    $('#play-btn').click(function(){
        var $this = $(this);
        if($this.hasClass('glyphicon-play')){
            $this.toggleClass('glyphicon-play glyphicon-pause');
            audio.play();
        }
        else{
            $this.toggleClass('glyphicon-pause glyphicon-play');
            audio.pause(); 
        }
    });
    // Progress bar update and timer update
    audio.addEventListener('timeupdate',function (){
        value = Math.floor((100 / audio.duration) * audio.currentTime);
        $('#head').animate({'margin-left': value+'%'},50,'linear');
        min=Math.floor((audio.duration-audio.currentTime)/60,10);
        sec=Math.floor((((audio.duration-audio.currentTime)/60)-min)*60,10);
        sec= sec>9?sec:'0'+sec;
        //console.log(min,sec);
        $('#timer').text('-'+min+':'+sec);
        $('#slider').slider({
      value: audio.currentTime,
      orientation: "horizontal",
      range: "min",
      max: audio.duration,
      animate: true,
      slide: function() {
        manualSeek = true;
      },
      stop:function(e,ui) {
        manualSeek = false;
        audio.currentTime = ui.value;
      }
        });
        if(sec==0){
            min = Math.floor((audio.duration/60),10);
            sec= Math.floor(((audio.duration/60)-min)*60,10);
            $('#play-btn').removeClass('glyphicon-pause').addClass('glyphicon-play');
            $('#timer').text(min+":"+sec);
            $('#slider').slider({value:0});
        }
        if(audio.currentTime==audio.duration){
        index++;
        audio.src = songURL[index];
        audio.play();
        $('.cover-img').attr('src',cover[index]);
        $('#play-btn').toggleClass('glyphicon-play glyphicon-pause');
        }
    });
    // Getting song duration for timer
    audio.onloadedmetadata = function(){
        min=Math.floor(audio.duration/60,10);
        sec=Math.floor(((audio.duration/60)-min)*60,10);
        if(audio.duration==NaN){
            $('#timer').text('0'+':'+'00');
        }
        else{
            sec= sec>9?sec:'0'+sec;
            $('#timer').text(min+':'+sec);
        }
        durationTime=audio.duration;    
    }
    $('#volume').click(function(){
        $(this).toggleClass('glyphicon-volume-up glyphicon-volume-off');
        if($(this).hasClass('glyphicon-volume-off')){
            audio.volume = 0;
        }
        else{
            audio.volume = 1;
        }
    });
    $('#frwd').click(function(){  
        index++;
        $('.cover-img').attr('src',cover[index]);
        audio.src = songURL[index];
        $('#dwnld-btn').attr('href',songURL[index]);
        if($('#play-btn').hasClass('glyphicon-play')){
            audio.pause();
        }
        else{
            $('#play-btn').toggleClass('glyphicon-pause glyphicon-play');
        }
        if(index>=10){
            if($('#play-btn').hasClass('glyphicon-play')){
                audio.play();
            }
            else{
                $('#play-btn').toggleClass('glyphicon-pause glyphicon-play');
                audio.pause();
            }
            index=9;
        }
    });
    $('#bkwd').click(function(){          
        if(index!=0){
            index--;
            $('.cover-img').attr('src',cover[index]);
            audio.src = songURL[index];
            $('#dwnld-btn').attr('href',songURL[index]);
            if($('#play-btn').hasClass('glyphicon-play')){
               audio.pause();
            }
            else{
                $('#play-btn').toggleClass('glyphicon-pause glyphicon-play');
            }
        }
    });
    
});