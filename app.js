let data = JSON.parse(localStorage.getItem("kas")) || [];

let chart;

function render(){

let masuk=0;
let keluar=0;

let html="";

data.forEach((t,i)=>{

if(t.jenis=="MASUK"){
masuk+=t.jumlah;
}else{
keluar+=t.jumlah;
}

html+=`
<li>

<div>
<strong>${t.ket}</strong>
</div>

<div>

Rp ${t.jumlah}

<button onclick="hapus(${i})">❌</button>

</div>

</li>
`;

});

let saldo=masuk-keluar;

document.getElementById("saldo").innerText=saldo;
document.getElementById("masuk").innerText=masuk;
document.getElementById("keluar").innerText=keluar;

document.getElementById("list").innerHTML=html;

localStorage.setItem("kas",JSON.stringify(data));

drawChart(masuk,keluar);

}

function tambah(){

let ket=document.getElementById("ket").value;
let jenis=document.getElementById("jenis").value;
let jumlah=Number(document.getElementById("jumlah").value);

data.push({
ket,
jenis,
jumlah
});

render();

}

function hapus(i){

data.splice(i,1);

render();

}

function darkMode(){
document.body.classList.toggle("dark");
}

function drawChart(masuk,keluar){

let ctx=document.getElementById("chart");

if(chart){
chart.destroy();
}

chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Masuk","Keluar"],
datasets:[{
data:[masuk,keluar]
}]
}
});

}

render();