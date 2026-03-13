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

/* TAMBAH DATA */
function tambahData(){

const ket = document.getElementById("keterangan").value.trim();
const masuk = parseInt(document.getElementById("masuk").value) || 0;
const keluar = parseInt(document.getElementById("keluar").value) || 0;

if(ket === ""){
alert("Keterangan harus diisi");
return;
}

if(masuk === 0 && keluar === 0){
alert("Masukkan kas masuk atau kas keluar");
return;
}

const tanggal = new Date().toLocaleDateString('id-ID');

dataKas.push({
tanggal: tanggal,
ket: ket,
masuk: masuk,
keluar: keluar
});

/* hitung saldo ulang */
hitungSaldo();

simpan();
tampilData();

/* kosongkan input */
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
row.insertCell(2).innerText = rupiah(d.masuk);
row.insertCell(3).innerText = rupiah(d.keluar);
row.insertCell(4).innerText = rupiah(d.saldo);

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

}

/* LOAD DATA */
hitungSaldo();
tampilData();
