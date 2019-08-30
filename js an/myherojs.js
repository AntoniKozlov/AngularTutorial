



var length = 1 , li_id=1, hr_name=1;


function add_input() {

 var p = document.getElementById("inputi") ;
 var new_li = document.createElement("li") ;
 var new_a = document.createElement("a") ;
 var new_span = document.createElement("span") ;
 var new_span2 = document.createElement("span") ;
 var new_button = document.createElement("button") ;



  new_li.setAttribute('id', 'li'+li_id);
  new_span.setAttribute('class', 'badge');
  new_span.innerHTML =  li_id;
  new_span2.setAttribute('id', 'hrname'+li_id);
  new_span2.innerHTML = document.getElementById('hero').value;
  new_button.setAttribute('class', 'delete');
  new_button.setAttribute('onclick', 'del('+ li_id +')');
  new_a.setAttribute('onclick', 'detail('+ li_id +')');
  //new_a.setAttribute('href', 'hero2.html');
  

  new_button.innerHTML = "X";

  new_a.appendChild(new_span) ;
  new_a.appendChild(new_span2) ;
 
 new_li.appendChild(new_a) ;
 new_li.appendChild(new_button) ;
 p.appendChild(new_li) ;




   localStorage.setItem('li'+li_id, new_span2.innerHTML); 
   localStorage.setItem('elementNumber', li_id); 

length++;
li_id++;
hr_name++;


} 
window.onload = function() {


  n = localStorage.getItem('elementNumber');
  for (i=1;i<=n;i++)
  {
    if (localStorage.getItem('li'+i)!=null)
{
    var p = document.getElementById("inputi") ;
 var new_li = document.createElement("li") ;
 var new_a = document.createElement("a") ;
 var new_span = document.createElement("span") ;
 var new_span2 = document.createElement("span") ;
 var new_button = document.createElement("button") ;



  new_li.setAttribute('id', 'li'+i);
  new_span.setAttribute('class', 'badge');
  new_span.innerHTML =  i;
  new_span2.setAttribute('id', 'hrname'+i);
  new_span2.innerHTML = localStorage.getItem('li'+i);
  new_button.setAttribute('class', 'delete');
  new_button.setAttribute('onclick', 'del('+ i +')');
  new_a.setAttribute('onclick', 'detail('+ i +')');
  //new_a.setAttribute('href', 'hero2.html');
  

  new_button.innerHTML = "X";

  new_a.appendChild(new_span) ;
  new_a.appendChild(new_span2) ;
 
 new_li.appendChild(new_a) ;
 new_li.appendChild(new_button) ;
 p.appendChild(new_li) ;




   


length++;

hr_name++;
  }

}
 li_id = n == null?1:parseInt(n)+1;
 console.log(li_id);
 
 var sve = document.location.href.split ('?');

  document.getElementById("hrname"+sve[2]).innerHTML=sve[1];
  

};

 function del(li_id) {
    
localStorage.removeItem("li"+li_id);
    var elem = document.getElementById("li"+li_id);
elem.parentNode.removeChild(elem);
  }
 function detail(hr_name) {
   var rh=document.getElementById("hrname"+hr_name).innerHTML;
   document.location.href = 'hero2.html?'+rh+'?'+hr_name;
  }
function check() {
  var pole1 = document.getElementById('hero');
     
  document.getElementById('addsubmit').disabled = pole1.value ? false : "disabled";}




  