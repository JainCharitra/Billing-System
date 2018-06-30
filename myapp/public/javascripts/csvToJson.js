"use strict"
var myApp = angular.module('exportToCsvModule',[]);
var csvData2 ="";
myApp.controller('exportToCsv',function($scope,$http){
	$scope.uploadBtn = true;
	$scope.deleteAll = function () {
        let password = prompt("Are you sure to delete all. Please enter password", "LalWala password");
        if(password == "12345678"){
            alert("All entries are going to delete");
            $http.post('/deleteData',{}).then(
                function(response){
                    console.log(response.data);
                    if(response.data.success)
                        alert("Data delete process done",response.data.result);
                    else
                    alert("Data already deleted")
                },function(error){
                    alert("Data delete process not done",response.data.info)
                    console.log(error);
                }
            );
        }else{
            alert("Please enter correct password");
        }
    }
    $scope.viewData = function(){
		$scope.csvData2 = csvData2;
		if(csvData2.length)
			$scope.uploadBtn = false;
	};

    $scope.relocate = function(url){
        $http.get(url);
    };

	$scope.csvToJson = function(){
		//console.log("controller mfunction called");
		for(let i=0;i<$scope.csvData2.length;i++){
	       $scope.csvData2[i]._id = parseInt($scope.csvData2[i]._id);  
        }
		console.log($scope.csvData2);
        $http.post('/saveData',csvData2).then(
            function(response){
                console.log(response.data);
                alert("Data entrie success",response.data.result)
            },function(error){
                alert("Data entrie Failed",response.data.info)
                console.log(error);
            }
        );
	};
});


function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
		
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
			
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
			
        }
        // Now that we have our value string, let's add
        // it to the data array.
        //console.log(strMatchedValue);
		if(strMatchedValue== "" || strMatchedValue==" "){
			continue;
		}
		arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
	for(let i=arrData.length-1;i>0;i--){
		if(arrData[0].length == arrData[i].length){
			break;
		}else{
			arrData.pop();
		}
	}
	//console.log(arrData);
    return (arrData);
}

function CSV2JSON(csv){
	var array = CSVToArray(csv);
	//console.log("fhfcgvm",array);
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k];
        }
    }

    //var json = JSON.stringify(objArray);
    //var str = json.replace(/},/g, "},\r\n");
	//console.log(objArray);
	return objArray;
	//return str;
	
   // document.getElementById("temp").textContent = str;
}

function ReadFileData(filePath){
	//console.log(filePath);
	var reader = new FileReader();
	reader.readAsText(filePath);
	reader.onload = loadHandler;
	
	
}

function loadHandler(event){
	//console.log("loadhandler");
	var csvData = event.target.result;	
	//console.log(csvData);
	csvData2 = CSV2JSON(csvData);
	
}