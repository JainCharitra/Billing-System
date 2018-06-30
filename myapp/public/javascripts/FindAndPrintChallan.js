"use strict"
var myApp = angular.module('ChallanPrint',[]);
myApp.controller('ChallanPrintCTRL',function($scope,$http){
	$scope.firmName = "lalWala.html";

	$scope.printPage = function (divName="printIt") {
		let data = {};
		data.challanNumGt = document.getElementById('_idStart').value; 
		data.challanNumLt = document.getElementById('_idEnd').value;
		
		var printContents = document.getElementById(divName).innerHTML;     
	    var originalContents = document.body.innerHTML;       
	    document.body.innerHTML = printContents;      
	    window.print();      
	    document.body.innerHTML = originalContents;
	    document.getElementById('_idStart').value = data.challanNumGt; 
		document.getElementById('_idEnd').value = data.challanNumLt;
	}

	$scope.numToWord = function (num) {
		var num2 = num.split(',').join('');
		var word = RsPaise(num2);
		return word;
	}
	$scope.findChallan = function(){

		let data  = {};
		data.challanNumGt = Number(document.getElementById('_idStart').value); 
		data.challanNumLt = Number(document.getElementById('_idEnd').value);
		if(data.challanNumGt && data.challanNumLt){
			console.log(typeof data.challanNumGt,"  ",data.challanNumLt)
			$http.post('/getDataToPrint',data).then(function (response) {
				if(response.data.success)
					$scope.challanList = response.data.result;
				console.log(response.data.result);
			},function (error) {
				console.log(error);
			});
		}else{
			alert("Please enter both values first");
		}
	};
});


function Rs(amount){
var words = new Array();
words[0] = 'Zero';words[1] = 'One';words[2] = 'Two';words[3] = 'Three';words[4] = 'Four';words[5] = 'Five';words[6] = 'Six';words[7] = 'Seven';words[8] = 'Eight';words[9] = 'Nine';words[10] = 'Ten';words[11] = 'Eleven';words[12] = 'Twelve';words[13] = 'Thirteen';words[14] = 'Fourteen';words[15] = 'Fifteen';words[16] = 'Sixteen';words[17] = 'Seventeen';words[18] = 'Eighteen';words[19] = 'Nineteen';words[20] = 'Twenty';words[30] = 'Thirty';words[40] = 'Forty';words[50] = 'Fifty';words[60] = 'Sixty';words[70] = 'Seventy';words[80] = 'Eighty';words[90] = 'Ninety';var op;
amount = amount.toString();
var atemp = amount.split(".");
var number = atemp[0].split(",").join("");
var n_length = number.length;
var words_string = "";
if(n_length <= 9){
var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var received_n_array = new Array();
for (var i = 0; i < n_length; i++){
received_n_array[i] = number.substr(i, 1);}
for (var i = 9 - n_length, j = 0; i < 9; i++, j++){
n_array[i] = received_n_array[j];}
for (var i = 0, j = 1; i < 9; i++, j++){
if(i == 0 || i == 2 || i == 4 || i == 7){
if(n_array[i] == 1){
n_array[j] = 10 + parseInt(n_array[j]);
n_array[i] = 0;}}}
 var value = "";
for (var i = 0; i < 9; i++){
if(i == 0 || i == 2 || i == 4 || i == 7){
value = n_array[i] * 10;} else {
value = n_array[i];}
if(value != 0){
words_string += words[value] + " ";}
if((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)){
words_string += "Crores ";}
if((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)){
words_string += "Lakhs ";}
if((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)){
words_string += "Thousand ";}
if(i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)){
words_string += "Hundred and ";} else if(i == 6 && value != 0){
words_string += "Hundred ";}}
words_string = words_string.split(" ").join(" ");}
return words_string;}
function RsPaise(n){
var nums = n.toString().split('.')
var whole = Rs(nums[0])
if(nums[1]==null)nums[1]=0;
if(nums[1].length == 1 )nums[1]=nums[1]+'0';
if(nums[1].length> 2){nums[1]=nums[1].substring(2,length - 1)}
if(nums.length == 2){
if(nums[0]<=9){nums[0]=nums[0]*10} else {nums[0]=nums[0]};
var fraction = Rs(nums[1])
var op="";
if(whole=='' && fraction==''){op= 'Zero only';}
if(whole=='' && fraction!=''){op= ' ' + fraction + ' paise only';}
if(whole!='' && fraction==''){op=' ' + whole + 'Rupees only';} 
if(whole!='' && fraction!=''){op=' ' + whole + ' Rupees and ' + fraction + ' paise only';}
return op;
}
}