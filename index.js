//http://яваскрипт.укр/ImageToHTML

var canvas=document.querySelector('#canva');
var ctx=canvas.getContext('2d');
//draw in canvas
ctx.fillStyle='yellow';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.font=(canvas.width/4)+'px Arial';
ctx.fillStyle='black';
ctx.fillText('JavaScript',5,canvas.width/3,canvas.width-10,canvas.height);
ctx.font='14px Arial';
ctx.fillText('яваскрипт.укр',5,canvas.height-5);

//event open images
document.querySelector('#open_file').onchange=function(){
	f=new FileReader();
		f.onload=function(){
		var img=document.createElement("img");
		img.onload=function(){
			//draw image in canvas
			canvas.width=img.width;
			canvas.height=img.height;
			ctx.drawImage(this,0,0);
			document.querySelector('#ithtml_result_html').value='';
		}
		img.src=this.result;
	}
	f.readAsDataURL(this.files[0]);
};

var s, style, colors;
//convert image in canvas to HTML code
function imgToHTML(a){
	//if start function
	if(a==undefined){
			a=0;
			s='<div style="width:'+canvas.width+'px;height:'+canvas.height+'px;">';
			style='';colors=[];
			var progress=document.querySelector('#ithtml_progres_body');
			progress.style.display='block';
			var res=document.querySelector('#ithtml_result');
			res.innerHTML='';
	}
	document.querySelector('#ithtml_progres_position').style.width=parseInt(100*(a/canvas.height))+'%';
	var i0=-1,w=0,i,c;
	s+='<div class="line_pixel">';
	for(var x=0,imgData;x<canvas.width;x++){
		imgData=ctx.getImageData(x,a,1,1);
		c='rgba('+imgData.data[0]+','+imgData.data[1]+','+imgData.data[2]+','+(imgData.data[3]==0?'0':255/imgData.data[3])+')';
		i=colors.indexOf(c);
		if(i==-1){
			colors.push(c);
			i=colors.length-1;
			style+='.c'+i+'{background-color:'+c+'}';
		}
		if(i0==-1)i0=i;
		if(i0==i){
			w++;
		}
		else{
			if(w==1)
				s+='<div class="pixel c'+i0+'"></div>';
			else s+='<div class="pixel c'+i0+'" style="width:'+w+'px"></div>';
			w=1;
			i0=i;
		}
	}
	if(i0==i)s+='<div class="pixel c'+i+'" style="width:'+w+'px"></div>';
	i0=-1;
	w=0;
	s+='</div>\n';
	a++;
	//if a<=canvas.height to update the process bar run the timer next line
	if(a<=canvas.height)setTimeout(imgToHTML, 5 ,a);
	else{
		s+='</div>';
		//textarea value = HTML code image
		var result=document.getElementById('ithtml_result_html');
		result.value='<style>.line_pixel{display: block;}.pixel{display:inline-block;width:1px;height:1px;}\n'+style+'\n</style>\n'+s;
		document.getElementById('ithtml_status').innerHTML='~'+(result.value.length/1000).toFixed(2)+' Kb';
		s='';
		style='';
		colors=[];
		//hide the process bar
		var progress=document.querySelector('#ithtml_progres_body');
		progress.style.display='none';
	}
}

function open_veiw(){
	//open new window
	var w=window.open('about:blank', 'ImageHTML'+parseInt(100*Math.random()));
	if(w){
		//write HTML code image
		w.document.writeln(document.getElementById('ithtml_result_html').value);
		w.focus();
	}
}


//run function convert Image to HTML code 
imgToHTML();
