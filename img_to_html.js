//http://яваскрипт.укр/ImageToHTML

//function image in canvas to HTML code
function CanvasToHTML(canvas){
    var s='<div style="width:'+canvas.width+'px;height:'+canvas.height+'px;">', style='', colors=[];
    for(var y=0,i0=-1,w=0,i,c;y<canvas.height;y++){
        s+='<div class="line_pixel">';
        for(var x=0,imgData;x<canvas.width;x++){
            imgData=ctx.getImageData(x,y,1,1);
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
    }
    s+='</div>';
    return '<style>.line_pixel{display: block;}.pixel{display:inline-block;width:1px;height:1px;}\n'+style+'\n</style>\n'+s;
}
