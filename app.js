var form = `<form action="" id="user_form" class="row col-12 mt-5 border p-5" autocomplete="off">
<div class=" mt-5 col-lg-6 col-md-12 col-xs-12 ">
<label for="firstName" class="form-label fw-bolder">Name</label>
<input type="text" class="form-control shadow p-3" id="firstName" placeholder="Enter name" name="name" >
<span class="h6 text-secondary">This field is required</span>
</div>
<div class="mb-5 mt-5 col-lg-6 col-md-12 col-xs-12 ">
<label for="lastName" class="form-label fw-bolder">Surname</label>
<input type="text" class="form-control shadow p-3" id="lastName" name="surname" placeholder="Enter surname" >
<span class="h6 text-secondary">This field is required</span>
</div>
<div class="mb-5 col-12 col-xs-12">
<label for="address" class="form-label fw-bolder">Address</label>
<input type="text" class="form-control shadow p-3" id="address" name="address" placeholder="Enter Address">
<span class="h6 text-secondary">Only 35 characters</span>
</div>

<div class="mb-5 col-lg-6 col-md-12 col-xs-12">
<label for="dateOfBirth" class="form-label fw-bolder"> Date of Birth</label>
<input type="date" name="dateOfBirth" class="form-control shadow p-3" id="dateOfBirth">
<span class="h6 text-secondary">Select not required</span>
</div>

<div class="mb-5 col-lg-6 col-md-12 col-xs-12">
<label for="gender" class="form-label fw-bolder ">Gender</label>
<select id="gender" name="gender" class="form-select shadow p-3">
<option selected hidden>Choose</option>
<option class="option_gender" value="Male">Male</option>
<option class="option_gender" value="Female">Female</option>
</select>
<span class="h6 text-secondary">Select not required</span>
</div>

</select>
<div class="mb-5 mt-5 col-12">
<label for="notes" class="form-label fw-bolder">Notes</label>
<textarea name="notes" class="form-control shadow p-3" id="notes" mb-5 rows="3"></textarea>
<span class="h6 text-secondary">Not required</span>
</div>
</div>
<button id="submitBtn" type="submit" class="btn btn-success mb-5 mt-5 col-12 fw-bolder shadow p-3" value="submit" onclick="save()">Save</button>
</div>
</form>
<dialog class ="modal active"class="mt-2 mb-3 h4 border p-4 d-flex justify-content-center" >
</dialog>`;

let btn_warning_el=document.querySelector('btn-warning');

function table() {
let table = `<div class="d-flex justify-content-center col-lg-12 col-md-12 col-xs-12 mt-5 mb-5">
<table class="table col-12 h6 table-striped fw-bolder table-dark">
<thead class="col-12">
<tr class="users" >
<th id="id">ID</th>
<th >Name</th>
<th >Surname</th>
<th >address</th>
<th >Birthday</th>
<th >Gender</th>
<th >Actions</th>
</tr>
</thead>
<tbody class="tr-popup">`;

for (let i = 0; i < details.length; i++){

table = table +  `<tr id=row-${i} onclick="getIdFromTable(event)">

<td id="id">${i+1}</td>
<td>${details[i].name}</td>
<td>${details[i].surname}</td>
<td>${details[i].address}</td>
<td>${details[i].dateOfBirth}</td>
<td>${details[i].gender}</td>
<td hidden id="notes">${details[i].notes}</td>
<td><button type="button" class=" btn btn-danger delete" deleteBtn  onclick="deleteData(${i})">Delete</button></td></tr>`;
};
table = table+`</tbody>


</table>`;
document.getElementById("table").innerHTML = table;
};
let detailsId = 1;
document.getElementById("form").innerHTML = form;
let details = [];
getData();
table();
function getData(){
let Data = localStorage.getItem("details");
if (Data) {
details = JSON.parse(Data);
} else {
setData();
};
};
function setData() {
localStorage.setItem("details", JSON.stringify(details));
};
//modal function
function getIdFromTable(e) {
const dialog_el=document.querySelector('.modal');
const element = e.path[1].id ;
const splitted = element.split('-')[1]; 
dialog_el.textContent=`Notes: ${details[splitted].notes}`
}

//validate
const maxLength=/^[\s\S]{1,35}$/i;

//submit
function save() {
let firstName_el=document.querySelector("#firstName");
let lastName_el=document.querySelector("#lastName");
let address_el=document.querySelector("#address");
let dateBirth_el=document.querySelector("#dateOfBirth");
let gender_el=document.querySelector("#gender");
let notes_el=document.querySelector("#notes");

if (firstName_el.value == 0) {
alert("name is Empty!");
return
}else if
(lastName_el.value == 0) {
alert("Surname is Empty!");
return
}else if
(address_el.value == 0) {
alert("Address is Empty!");
return
} else if
(!address_el.value.match(maxLength)){
alert("Only 35 characters!");
return
}
alert('User added succesfully');

let data = {
name: firstName_el.value,
surname: lastName_el.value,
address: address_el.value,
dateOfBirth: dateBirth_el.value,
gender: gender_el.value,
notes: notes_el.value,
};

details.push(data);
setData();
table();

firstName_el.value = "";
lastName_el.value = "";
address_el.value = "";
dateBirth_el.value = "";
gender_el.value = "";
notes_el.value = "";
};


//popup
const container_el = document.querySelector('.container');
const tr_popup_el = document.querySelector(".tr-popup");
const notes_el=document.querySelector(".notes");
const deleteBtn_el=document.querySelector(".deleteBtn");
const active_el=document.querySelector(".active");
const notes=document.querySelector("#notes");
const row_el=document.querySelector("#row");
const delete_el=document.querySelector('.delete');
const form2_el=document.getElementById('form2');
const id_el=document.querySelector('#id');
const dialog_el=document.querySelector('.modal');

//delete data

function deleteData(index) {
  details.splice(index, 1);
setData();
table();

};




//popup

tr_popup_el.addEventListener('click',()=>{
container_el.classList.add('active');
dialog_el.classList.remove('active');

});

dialog_el.addEventListener('click', ()=>{
container_el.classList.remove('active');
dialog_el.classList.add('active');
})







