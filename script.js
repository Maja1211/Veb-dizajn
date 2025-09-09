let prozorStatistika = document.getElementById("prozor-statistika");
let prozorUputstvo = document.getElementById("prozor-uputstvo");
let prozorPodesavanja = document.getElementById("prozor-podesavanja");

let dugmeStatistika = document.getElementById("dugme-statistika");
let dugmeUputstvo = document.getElementById("dugme-uputstvo");
let dugmePodesavanja = document.getElementById("dugme-podesavanja");

let zatvoriStatistika = document.getElementById("zatvori-statistika");
let zatvoriUputstvo = document.getElementById("zatvori-uputstvo");
let zatvoriPodesavanja = document.getElementById("zatvori-podesavanja");

dugmeStatistika.onclick = function () {
    prozorStatistika.style.display = "block";
};
dugmeUputstvo.onclick = function () {
    prozorUputstvo.style.display = "block";
};
dugmePodesavanja.onclick = function () {
    prozorPodesavanja.style.display = "block";
};

zatvoriStatistika.onclick = function () {
    prozorStatistika.style.display = "none";
};
zatvoriUputstvo.onclick = function () {
    prozorUputstvo.style.display = "none";
};
zatvoriPodesavanja.onclick = function () {
    prozorPodesavanja.style.display = "none";
};

let recnik = [
    "МЛЕКО",
    "КЊИГА",
    "СУНЦЕ",
    "СРЕЋА",
    "ЛОПТА",
    "ПЕСМА",
    "ЈЕСЕН",
    "ТАЊИР",
    "ВОЗАЧ",
    "ПРАВО",
    "ПОШТА",
    "ЈЕЛЕН",
    "ПИСМО",
    "КАРТА",
    "ШКОЛА",
    "РЕЧКО",
    "НОКАТ",
    "КОЦКА",
    "СЛИКА",
    "ЗЛАТО",
    "ИКОНА",
    "АВИОН",
    "ШЕЋЕР",
    "ЈЕЛКА",
    "КОЛАЧ",
    "ЧЕКИЋ",
    "ХРАНА"
];

let indeks = Math.round(Math.random() * (recnik.length - 1));
let tajnaRec = recnik[indeks];

let polja = document.getElementsByClassName("polje");
let poruka = document.getElementById("poruka");

let brojRedova = 6;
let brojSlova = 5;

let trenutniRed = 0;
let trenutnaPozicija = 0;

let igraGotova = false;

let dugmeNovaIgra = document.getElementById("nova-igra");
let novaIgraKontejner = document.getElementById("nova-igra-kontejner");
let dugmeResetStatistika = document.getElementById("reset-statistika");

let statistika = JSON.parse(localStorage.getItem("statistika")) || {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    promasaj: 0
};

function sacuvajStatistiku() {
    localStorage.setItem("statistika", JSON.stringify(statistika));
}

function prikaziStatistiku() {
    for (let i = 1; i <= 6; i++) {
        let broj = statistika[i];
        document.getElementById("stat-broj-" + i).textContent = broj;

        let max = Math.max(...Object.values(statistika));
        let procenat = max > 0 ? (broj / max) * 100 : 0;
        document.getElementById("stat-" + i).style.width = procenat + "%";
    }

    let brojPromasaj = statistika.promasaj;
    document.getElementById("stat-broj-promasaj").textContent = brojPromasaj;

    let max = Math.max(...Object.values(statistika));
    let procenatPromasaj = max > 0 ? (brojPromasaj / max) * 100 : 0;
    document.getElementById("stat-promasaj").style.width = procenatPromasaj + "%";
}

function dodajRezultat(pokusaj) {
    if (pokusaj >= 1 && pokusaj <= 6) {
        statistika[pokusaj]++;
    } else {
        statistika.promasaj++;
    }
    sacuvajStatistiku();
    prikaziStatistiku();
}

function upisiSlovo(slovo) {
    if (igraGotova) return;
    if (trenutnaPozicija < brojSlova) {
        let indexPolja = trenutniRed * brojSlova + trenutnaPozicija;
        polja[indexPolja].textContent = slovo;

        polja[indexPolja].style.backgroundColor = "lightgray";
        polja[indexPolja].style.color = "black";
        polja[indexPolja].style.fontWeight = "bold";

        trenutnaPozicija++;

        poruka.textContent = "";
    }
}

function obrisiSlovo() {
    if (igraGotova) return;
    if (trenutnaPozicija > 0) {
        trenutnaPozicija--;
        let indexPolja = trenutniRed * brojSlova + trenutnaPozicija;
        polja[indexPolja].textContent = "";
        polja[indexPolja].style.backgroundColor = "white";
        polja[indexPolja].style.color = "black";
        poruka.textContent = "";
    }
}


function obojiTaster(slovo, boja) {
    let tasteri = document.querySelectorAll("#tastatura button");
    for (let i = 0; i < tasteri.length; i++) {
        if (tasteri[i].textContent == slovo) {
            if (tasteri[i].style.backgroundColor == "green" && boja != "green") {
                continue;
            }

            if (boja == "green") {
                tasteri[i].style.backgroundColor = "green";
                tasteri[i].style.color = "white";
            } else if (boja == "orange") {
                if (tasteri[i].style.backgroundColor != "green") {
                    tasteri[i].style.backgroundColor = "orange";
                    tasteri[i].style.color = "black";
                }
            } else if (boja == "gray") {
                if (
                    tasteri[i].style.backgroundColor != "green" &&
                    tasteri[i].style.backgroundColor != "orange"
                ) {
                    tasteri[i].style.backgroundColor = "darkgray";
                    tasteri[i].style.color = "white";
                }
            }
        }
    }
}

function proveriRec() {
    if (igraGotova) return;
    if (trenutnaPozicija == brojSlova) {
        let unesenaRec = "";
        for (let i = 0; i < brojSlova; i++) {
            let indexPolja = trenutniRed * brojSlova + i;
            unesenaRec += polja[indexPolja].textContent;
        }

        if (!recnik.includes(unesenaRec)) {
            poruka.textContent = "Реч није у речнику!";
            poruka.style.color = "red";
            return;
        }

        let tajnaKopija = tajnaRec.split("");
        let boje = Array(brojSlova).fill("gray");

        for (let i = 0; i < brojSlova; i++) {
            if (unesenaRec[i] == tajnaKopija[i]) {
                boje[i] = "green";
                tajnaKopija[i] = null;
            }
        }

        for (let i = 0; i < brojSlova; i++) {
            if (boje[i] == "gray") {
                let indeks = tajnaKopija.indexOf(unesenaRec[i]);
                if (indeks != -1) {
                    boje[i] = "orange";
                    tajnaKopija[indeks] = null;
                }
            }
        }

        for (let i = 0; i < brojSlova; i++) {
            let indexPolja = trenutniRed * brojSlova + i;
            if (boje[i] == "green") {
                polja[indexPolja].style.backgroundColor = "green";
                polja[indexPolja].style.color = "white";
                obojiTaster(unesenaRec[i], "green");
            } else if (boje[i] == "orange") {
                polja[indexPolja].style.backgroundColor = "orange";
                polja[indexPolja].style.color = "black";
                obojiTaster(unesenaRec[i], "orange");
            } else {
                polja[indexPolja].style.backgroundColor = "gray";
                polja[indexPolja].style.color = "white";
                obojiTaster(unesenaRec[i], "gray");
            }
        }

        if (unesenaRec == tajnaRec) {
            poruka.textContent = "Браво! Погодили сте реч!";
            poruka.style.color = "green";
            dodajRezultat(trenutniRed + 1);
            novaIgraKontejner.classList.remove("sakriveno");
            igraGotova = true;
        } else {
            trenutniRed++;
            trenutnaPozicija = 0;

            if (trenutniRed == brojRedova) {
                poruka.textContent = "Игра је готова! Тајна реч је била: " + tajnaRec;
                poruka.style.color = "red";
                dodajRezultat(0);
                novaIgraKontejner.classList.remove("sakriveno");
                igraGotova = true;

            }
        }
    } else {
        poruka.textContent = "Унесите свих 5 слова пре провере!";
        poruka.style.color = "red";
    }
}


let tasteri = document.querySelectorAll("#tastatura button");

for (let i = 0; i < tasteri.length; i++) {
    tasteri[i].addEventListener("click", function () {
        let vrednost = tasteri[i].textContent;

        if (vrednost == "ENTER") {
            proveriRec();
        } else if (vrednost == "⌫") {
            obrisiSlovo();
        } else {
            upisiSlovo(vrednost);
        }
        tasteri[i].blur();
    });
}

let dozvoljenaSlova = "АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ";

document.addEventListener("keydown", function (event) {
    let slovo = event.key.toUpperCase();

    if (slovo == "ENTER") {
        proveriRec();
    } else if (slovo == "BACKSPACE") {
        obrisiSlovo();
    } else if (slovo.length == 1 && dozvoljenaSlova.includes(slovo)) {
        upisiSlovo(slovo);
    }
});

dugmeNovaIgra.onclick = function () {
    for (let i = 0; i < polja.length; i++) {
        polja[i].textContent = "";
        polja[i].style.backgroundColor = "white";
        polja[i].style.color = "black";
    }

    trenutniRed = 0;
    trenutnaPozicija = 0;
    igraGotova = false;
    poruka.textContent = "";

    novaIgraKontejner.classList.add("sakriveno");

    indeks = Math.round(Math.random() * (recnik.length - 1));
    tajnaRec = recnik[indeks];

    let tasteri = document.querySelectorAll("#tastatura button");
    for (let i = 0; i < tasteri.length; i++) {
        tasteri[i].style.backgroundColor = "";
        tasteri[i].style.color = "";
    }
};


dugmeResetStatistika.onclick = function () {
    statistika = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, promasaj: 0 };
    sacuvajStatistiku();
    prikaziStatistiku();
    prozorPodesavanja.style.display = "none";
};

prikaziStatistiku();





