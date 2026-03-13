let dataKas = JSON.parse(localStorage.getItem("dataKas")) || [];

function tampilkanTanggal(){

const hari = new Date();

const opsi = {
weekday:'long',
year:'numeric',
month:'long',
day:'numeric'
};

document.getElementById("tanggal").innerText =
hari.toLocaleDateString('id-ID',opsi);

}

tampilkanTanggal();

function simpan(){

localStorage.setItem("dataKas",JSON.stringify(dataKas));

}

function tambahData(){

const ket = document.getElementById("keterangan").value;
const masuk = parseInt(document.getElementById("masuk").value) || 0;
const keluar = parseInt(document.getElementById("keluar").value) || 0;

const tanggal = new Date().toLocaleDateString('id-ID');

let saldo = 0;

if(dataKas.length>0){
saldo = dataKas[dataKas.length-1].saldo;
}

saldo = saldo + masuk - keluar;

dataKas.push({
tanggal: tanggal,
ket: ket,
masuk: masuk,
keluar: keluar,
saldo: saldo
});

simpan();
tampilData();

}

function tampilData(){

const tabel = document.getElementById("tabelData");

tabel.innerHTML="";

dataKas.forEach((d,i)=>{

const row = tabel.insertRow();

row.insertCell(0).innerText=d.tanggal;
row.insertCell(1).innerText=d.ket;
row.insertCell(2).innerText=d.masuk;
row.insertCell(3).innerText=d.keluar;
row.insertCell(4).innerText=d.saldo;

const aksi = row.insertCell(5);

const btnEdit = document.createElement("button");
btnEdit.innerText="Edit";

btnEdit.onclick=function(){

const baru = prompt("Edit keterangan",d.ket);

if(baru){
dataKas[i].ket = baru;
simpan();
tampilData();
}

}

const btnHapus = document.createElement("button");
btnHapus.innerText="Hapus";

btnHapus.onclick=function(){

dataKas.splice(i,1);

simpan();
tampilData();

}

aksi.appendChild(btnEdit);
aksi.appendChild(btnHapus);

});

}

tampilData();
