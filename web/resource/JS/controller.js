/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var globalManualData = [];
var userDetailsArr = [];
var jsonData =[];
var optionFlag = "";
var count = 0;
function switchFunc(id){
    optionFlag = id
    if(id=="manual"){
        $("#Recomend").removeClass("disabled");
        $(".manual").removeAttr("disabled");
        $(".upload").attr("disabled","true");
        $(".manual").removeClass("disabled");
        $(".uploadDiv").css("background-color","#dfdfdf")
        $("#tableDiv").html("");
    }else{
        $(".manual").addClass("disabled");
        $(".manual").attr("disabled","true")
        $(".upload").removeAttr("disabled");
        $(".uploadDiv").css("background-color","#fff")
        $(".uploadDiv").css("color","#fff")
    }

}

function dischargebrowseCSV(path){
    var theFiles = path.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath;
    var directory = document.getElementById("file-7"); 
    
    $("#dischargeImageDiv2").html("");
    $(".preloader-wrapper").css("display","block");
    var htmlvar = "";
    htmlvar +='<img src="resource/images/DSAPOLLOBhub/DSAPOLLOBhub1.jpg" style="width:100%;height:100%">';
    htmlvar +='<img src="resource/images/DSAPOLLOBhub/DSAPOLLOBhub1.jpg" style="width:100%;height:100%">';
    
   $(".preloader-wrapper").css("display","none");
//   $("#dischargeImageDiv2").html(htmlvar);
   $("#dischargeRunEngine").removeClass("disabled")
   $("#dischargeImageDiv2").html(htmlvar);
}
function claimbrowseCSV(path){
    var theFiles = path.target.files;
    var relativePath = theFiles[0].webkitRelativePath;
    var folder = relativePath;
    var directory = document.getElementById("file-7"); 
    
    $("#claimImageDiv").html("");
//    $(".preloader-wrapper").css("display","block");
    var htmlvar = "";
    htmlvar +='<img src="resource/images/1995_001/1995_001-1.jpg" style="width:100%;height:100%">';
    htmlvar +='<img src="resource/images/1995_001/1995_001-2.jpg" style="width:100%;height:100%">';
    htmlvar +='<img src="resource/images/1995_001/1995_001-3.jpg" style="width:100%;height:100%">';
    htmlvar +='<img src="resource/images/1995_001/1995_001-4.jpg" style="width:100%;height:100%">';
//    $(".preloader-wrapper").css("display","none");
//   $("#dischargeImageDiv2").html(htmlvar);
   
   $("#claimRunEngine").removeClass("disabled")
   $("#claimImageDiv").html(htmlvar);
}

function csvJSON(csv) {

    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
   
    for (var i = 1; i < lines.length-1; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
    for (var j = 0; j < headers.length; j++) {
        
        obj[headers[j].toString().replace("\r","")] = currentline[j].replace("\r","");
    }
    result.push(obj);
    }
    return result; //JavaScript object
//    return JSON.stringify(result); //JSON
}

function buildTable(data,id){ 
    $("#tableDiv").html("");
    $('#floatBarsG').css("display","block"); 
    var key = Object.keys(data[0]);
    var htmlvar ="";
    htmlvar +="<table id='tableid' class='table cell-border compact hover stripe' style='height:100%' >"
    htmlvar +="<thead>"
    htmlvar +="<tr id='trtable' style='background-color:#1e88e5;color:white'>"
    for(var k in key){
    htmlvar +="<th style='border:1px solid #d4d4d4'>"+key[k].toString().replace("_"," ").replace("_"," ")+"</th>"
    }
    htmlvar +="</tr>"
    htmlvar +="</thead>"
    htmlvar +="<tbody>"
    for(var i in data){
    htmlvar +="<tr>"
        for(var j in key){
         
    htmlvar +="<td>"+data[i][key[j]]+"</td>"
        }
    htmlvar +="</tr>"
    }
    htmlvar +="</tbody>"
    htmlvar +="</table>"
//    setTimeout(function(){
    $('#floatBarsG').css("display","none");
   
    $("#"+id).html(htmlvar);
    $('#tableid').DataTable({
      dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
//    $("#trtable").attr("title",);
//    }, 5000);
    
}



function userDetailsInfo(){
    $("#upload").removeAttr("disabled")
    $("#manual").removeAttr("disabled")
        var userName = $("#user_name").val();
    var password = $("#password").val();
    var htmlvar = "";
//    alert(userName+""+password);
    $.getJSON("resource/json/userInfo.json",function(data){
        var userDetailsMap = {};
        var counter = 0;
       for(var i in data){
           
           if(data[i]["Username"]==userName && data[i]["password"]==password){
               userDetailsMap["Username"] = userName;
               userDetailsMap["password"] = password;
               userDetailsArr.push(userDetailsMap)
               htmlvar += "<div >";
               htmlvar += "<a class='dropdown-button ' href='#' data-activates='dropdown1'>"+data[i]["Username"]+"</a>";
               htmlvar += " <ul id='dropdown1' class='dropdown-content'  style='font-size: smaller;'>";
               htmlvar += " <li></li>";
               htmlvar += " <li style='border-bottom: 1px solid #d4d4d4;'><a align='center' style=''><i class='material-icons prefix'>account_circle</i> "+data[i]["Username"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>First Name: "+data[i]["firstName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>Last Name: "+data[i]["lastName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'><i class='material-icons prefix'>phone</i> "+data[i]["Mobile"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: smaller;'><i class='material-icons prefix'>email</i> "+data[i]["Email"]+"</a></li>";
               htmlvar += "</ul>";
               htmlvar += "</div>";
               document.cookie = JSON.stringify(userDetailsArr);
               $("#userLoginUI2").html(htmlvar);
               $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
               $(".hideClass").css("display","none");
               $("#userLoginUI1").css("display","block");
               $("#userLoginUI2").css("display","block");
               $(".dischargeUpload").removeAttr("disabled")
               $(".claimUpload").removeAttr("disabled")
               $(".uploadDiv").css("background","#fff")
               counter++;
              break;
           }else{
            
           }
       }
       if(counter==0){
           alert("user credentials not matched!")
       }
    });
}

function runICREngine(id){
    if(id=="dischargeRunEngine"){
        count++
        $(".dichargeFloatBarG").css("display","block")
        $.get("resource/data/DischargeData.csv",function(data){
             data = csvJSON(data);
             var keys = Object.keys(data[0]);
             
             var htmlvar = "";
                 htmlvar +="<table id='modalDischargeTable' class='table cell-border compact hover stripe'>";
                 htmlvar +="<thead>"
                 htmlvar +="<tr style='background-color:#1e88e5;color:white'>";
                 for(var i in keys){
                 htmlvar +="<th style='border:1px solid #d4d4d4'>"+keys[i]+"</th>";    
                 }
                 htmlvar +="</tr>";
                 htmlvar +="</thead>";
                 htmlvar +="<tbody>";
                 for(var j in data){
                 htmlvar +="<tr>";
                     for(var k in keys){
                      htmlvar +="<td>"+data[j][keys[k]]+"</td>";   
                     }
                 htmlvar +="</tr>";    
                 }
                 htmlvar +="</tbody>";
                 htmlvar +="</table>";
                 $("#modalData3").html(htmlvar);
                 $('#modalDischargeTable').DataTable({
      dom: 'Brtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
        })
        setTimeout(function(){
       $("#dischargeShowEngine").removeClass("disabled") 
       $(".dichargeFloatBarG").css("display","none")
        },5000);
        if(count>1){
            $("#redirectDataMart").removeClass("disabled")
        }
    }else{
        count++
        $(".claimFloatBarG").css("display","block");
        $.get("resource/data/ClaimData.csv",function(data){
             data = csvJSON(data);
             var keys = Object.keys(data[0]);
             
             var htmlvar = "";
                 htmlvar +="<table id='modalClaimTable' class='table cell-border compact hover stripe'>";
                 htmlvar +="<thead>"
                 htmlvar +="<tr style='background-color:#1e88e5;color:white'>";
                 for(var i in keys){
                 htmlvar +="<th style='border:1px solid #d4d4d4'>"+keys[i]+"</th>";    
                 }
                 htmlvar +="</tr>";
                 htmlvar +="</thead>";
                 htmlvar +="<tbody>";
                 for(var j in data){
                 htmlvar +="<tr>";
                     for(var k in keys){
                      htmlvar +="<td>"+data[j][keys[k]]+"</td>";   
                     }
                 htmlvar +="</tr>";    
                 }
                 htmlvar +="</tbody>";
                 htmlvar +="</table>";
                 $("#modalData4").html(htmlvar);
                 $('#modalClaimTable').DataTable({
      dom: 'Brtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
        })
        
          setTimeout(function(){
          
        $("#claimShowEngine").removeClass("disabled") 
        $(".claimFloatBarG").css("display","none") 
         },5000);
         if(count>1){
            $("#redirectDataMart").removeClass("disabled");
        }
    }
}


    function redirectToDataMart(){
    var first = $(location).attr('pathname');
    first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        first = "/" + first + "/dataMart.html";
        window.location.href = first;
    }
    function redirectToFraudAnalysis(){
    var first = $(location).attr('pathname');
    first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        first = "/" + first + "/fraudAnalysis.html";
        window.location.href = first;
    }
  
function appendUserInfo(){
    var userInfo = JSON.parse(document.cookie);
   
    var htmlvar ="";
    $.getJSON("resource/json/userInfo.json",function(data){
        for(var i in data){
           if(data[i]["Username"]== userInfo[0]["Username"] && data[i]["password"]==userInfo[0]["password"]){
           htmlvar += "<div >";
               htmlvar += "<a class='dropdown-button ' href='#' data-activates='dropdown1'>"+data[i]["Username"]+"</a>";
               htmlvar += " <ul id='dropdown1' class='dropdown-content'  style='font-size: smaller;'>";
               htmlvar += " <li></li>";
               htmlvar += " <li style='border-bottom: 1px solid #d4d4d4;'><a align='center' style=''><i class='material-icons prefix'>account_circle</i> "+data[i]["Username"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>First Name: "+data[i]["firstName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'>Last Name: "+data[i]["lastName"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: small;'><i class='material-icons prefix'>phone</i> "+data[i]["Mobile"]+"</a></li>";
               htmlvar += " <li><a align='center' style='font-size: smaller;'><i class='material-icons prefix'>email</i> "+data[i]["Email"]+"</a></li>";
               htmlvar += "</ul>";
               htmlvar += "</div>";    
           }
        }
        $(".userLoginLandingUI2").html(htmlvar)
        $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    })
     $(".userLoginLandingUI2").css("display","block")
        })
    
}

function changeTab(id){
  var first = $(location).attr('pathname');
    first.indexOf(1);
        first.toLowerCase();
        first = first.split("/")[1];
        if(id=="icr"){
        first = "/" + first + "/";
        }
        else if(id=="dataMart"){
        first = "/" + first + "/dataMart.html";    
        }
        else{
        first = "/" + first + "/fraudAnalysis.html";     
        }
        window.location.href = first;  
}

function changeFraudContent(id){
    if(id=="visual"){
        $("#tableauDiv").css("display","block");
        $("#DescriptiveDiv").css("display","none");
    }else{
        $("#tableauDiv").css("display","none");
        $("#DescriptiveDiv").css("display","block");   
        $.get("resource/data/FraudAnalysis.csv",function(data){
          data = csvJSON(data);
          buildTable(data,"DescriptiveDiv")
        })
    }
}