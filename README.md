#ImageToHTML

Convert image to code HTML in JavaScript

[site]http://яваскрипт.укр/ImageToHTML

Conversion happens by creating an element of size width 1px, height 1px. Replacing 1 pixel image.
using CSS styles and classes can reduce the code HTML.

*in pure JavaScript

Example image code HTML 2px*2px
```html
<style>.pixel{width:1px; height:1px; display:inline-block;}
.c0{background-color: red;}
.c1{background-color: black;}
</style>
<div style="width:2px;height:2px;">
<div><div class="pixel c0"></div><div class="pixel c0"></div></div>
<div><div class="pixel c1"></div><div class="pixel c1"></div></div>
</div>

```

Function image in canvas to HTML code:
```javascript
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
```

