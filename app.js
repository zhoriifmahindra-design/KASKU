let dataKas = JSON.parse(localStorage.getItem("dataKas")) || [];

/* TAMPILKAN TANGGAL */
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

/* SIMPAN DATA */
function simpan(){

localStorage.setItem("dataKas",JSON.stringify(dataKas));

}

/* FORMAT RUPIAH */
function rupiah(angka){

return new Intl.NumberFormat('id-ID').format(angka);

}

/* HAPUS FORMAT RUPIAH */
function bersihAngka(teks){

return parseInt(teks.replace(/[^0-9]/g,'')) || 0;

}

/* TAMBAH DATA */
function tambahData(){

const tanggal = document.getElementById("tanggalInput").value;

const ket = document.getElementById("keterangan").value.trim();

/* ambil angka tanpa format */
const masuk = bersihAngka(document.getElementById("masuk").value);

const keluar = bersihAngka(document.getElementById("keluar").value);

if(tanggal === ""){
alert("Tanggal harus dipilih");
return;
}

if(ket === ""){
alert("Keterangan harus diisi");
return;
}

if(masuk === 0 && keluar === 0){
alert("Masukkan kas masuk atau kas keluar");
return;
}

dataKas.push({
tanggal:tanggal,
ket:ket,
masuk:masuk,
keluar:keluar
});

hitungSaldo();

simpan();

tampilData();

document.getElementById("tanggalInput").value="";
document.getElementById("keterangan").value="";
document.getElementById("masuk").value="";
document.getElementById("keluar").value="";
}

/* HITUNG SALDO */
function hitungSaldo(){

let saldo = 0;

dataKas.forEach(d => {

saldo = saldo + d.masuk - d.keluar;

d.saldo = saldo;

});

}

/* TAMPILKAN DATA */
function tampilData(){

const tabel = document.getElementById("tabelData");

tabel.innerHTML="";

dataKas.forEach((d,i)=>{

const row = tabel.insertRow();

row.insertCell(0).innerText = d.tanggal;
row.insertCell(1).innerText = d.ket;
row.insertCell(2).innerText = "Rp " + rupiah(d.masuk);
row.insertCell(3).innerText = "Rp " + rupiah(d.keluar);
row.insertCell(4).innerText = "Rp " + rupiah(d.saldo);

/* tombol aksi */
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

};

const btnHapus = document.createElement("button");
btnHapus.innerText="Hapus";

btnHapus.onclick=function(){

if(confirm("Hapus data ini?")){

dataKas.splice(i,1);

hitungSaldo();

simpan();
tampilData();

}

};

aksi.appendChild(btnEdit);
aksi.appendChild(btnHapus);

});

document.getElementById("saldoCard").innerText =
"Saldo : Rp " + rupiah(dataKas.length ? dataKas[dataKas.length-1].saldo : 0);
}

/* LOAD DATA */
hitungSaldo();
tampilData();
