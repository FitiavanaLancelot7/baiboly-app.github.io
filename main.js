import { baiboly } from "./db/baibol.js";
import { bible } from "./db/bible.js";
import { fihirana } from "./db/ffpm.js";

const outputList = document.querySelector(".outputList"),
  listChapters = document.querySelector(".listChapters"),
  outputChapters = document.querySelector(".outputChapters"),
  outputFihirana = document.querySelector(".outputFihirana"),
  output = document.querySelector(".output"),
  nav = document.querySelector("nav"),
  section = document.querySelector("section"),
  outside = document.querySelector(".outside"),
  search = document.querySelector(".search"),
  inputSearch = document.getElementById("inputSearch"),
  btnSearch = document.getElementById("btnSearch"),
  iconBaiboly = document.getElementById("baiboly"),
  iconFihirana = document.getElementById("fihirana");
let oldTest = baiboly.filter((x, i) => i < 39);
let newTest = baiboly.filter((x, i) => i >= 39);
let displayOutput = true;
let displayFihirana = true;
let displayBar = true;
let displaySearch = true;
let choiceSong = 0;
let choiceBoky = 0;
let toPrevent = false;
let arr = []

outputChapters.innerHTML = "<span>Tesatementa Taloha</span>" + oldTest.map((dt, i) => (`<p class="b" id="${dt.id}">${dt.boky}</p>`)).join("") + "<span>Tesatementa Vaovao</span>" + newTest.map((dt, i) => (`<p class="b" id="${dt.id}">${dt.boky}</p>`)).join("");


const datalist = document.createElement("datalist");
datalist.setAttribute("id","level-lists");
search.insertBefore(datalist, btnSearch);
baiboly.map((x,i)=>{
  const option = document.createElement("option");
  // option.setAttribute("bible", i);
  option.value = x.boky;
  datalist.appendChild(option);
});
console.log(fihirana);

function searchFunction() {
  if (displaySearch) {
    search.style.display = "none";
    toPrevent = false;
  } else {
    search.style.display = "flex";
  }
}
function barFunction() {
  if (displayBar) {
    outside.style.display = "none";
    nav.style.display = "none";
    section.style.marginLeft = "3.5rem";
  } else {
    section.style.marginLeft = "9rem";
    nav.style.display = "flex"
    outside.style.display = "block";
  }
}
function outputFihiranaFun () {
    if (displayFihirana) {
      outputFihirana.style.display = "none"
      outputChapters.style.display = "none"
      outputList.style.display = "none"
      outside.style.display = "none";
      displayOutput =! displayOutput;
    } else {
      output.style.display = "none";
      listChapters.style.display = "none";
      outputFihirana.style.display = "block"
      outputChapters.style.display = "none"
      outputList.style.display = "flex";
      outside.style.display = "block";
    }
  }
  function outputFunction() {
    if (displayOutput) {
      outputFihirana.style.display = "none";
      outputChapters.style.display = "none";
      outputList.style.display = "none";
      outside.style.display = "none";
      displayFihirana =! displayFihirana;
      listChapters.style.display = "grid";
    } else {
    output.style.display = "block";
    outputChapters.style.display = "block"
    outputFihirana.style.display = "none"
    outputList.style.display = "flex";
    outside.style.display = "block";
  }
}
function outputFunctionNone() {
  outputChapters.style.display = "none"
  outputList.style.display = "none"
  outside.style.display = "none";
}
btnSearch.addEventListener('click', (e)=> {
  let regex = new RegExp(inputSearch.value, "gi");
  let position = baiboly.map((x,i)=> x.boky.search(regex));
  // filter 0
  let ito = position.map((x,i)=>{
    if (x == 0){
      return i;
    }
  });
  choiceBoky = Number(ito.join(""));
  // ---------------------------------------
  boky.forEach(b=> {
    b.classList.remove("active");
  });
  boky[choiceBoky].classList.add("active");
  fetchData(choiceBoky);
});
outside.addEventListener('click', (e) => {
  outputFunctionNone();
});

document.addEventListener("keypress", (e) => {
  let btn = e.key;
  if (btn == "") {
    displaySearch = !displaySearch;
    toPrevent = true;
    searchFunction();
  }
  if (btn == "") {
    displayBar = !displayBar;
    displayOutput = !displayOutput;
    barFunction();
    outputFunction();
  }
});
for (let x in fihirana){
  fihirana[x].hira[0].tononkira.replace(/(.*?\n)/m, filterFihirana);
  function filterFihirana(match){
    arr.push(`<p class="c" id="${"ffpm_"+fihirana[x].laharana}">${fihirana[x].laharana} - ${match}</p>`);
  }
}
outputFihirana.innerHTML = arr.join("");

const song = document.createElement("p");
song.setAttribute("id","outputSong");
section.insertBefore(song, output);
const songs = document.createElement("p");
iconFihirana.addEventListener("click", () => {
  // songs.removeChild(song);
  const fihi = document.querySelectorAll(".c");
  fihi.forEach(t => t.addEventListener("click", (e) => {
    const musicList = document.querySelectorAll(".c");
    let choiceFihirana = e.target.id;
    choiceSong = 0;
    song.innerHTML = fihirana[choiceFihirana].hira[choiceSong].tononkira;
    song.appendChild(songs);
    window.addEventListener("keydown", (event)=>{
      let btn = event.key;
      let lenghtSong = fihirana[choiceFihirana].hira.length;
      if (btn == "ArrowLeft") {
        if (choiceSong <= 0) {
          choiceSong = 0;
        }
        choiceSong -= 1;
        song.innerHTML = fihirana[choiceFihirana].hira[choiceSong].tononkira;
        song.appendChild(songs);
      }
      if (btn == "ArrowRight") {
        if (choiceSong >= lenghtSong - 1) {
          choiceSong = lenghtSong - 1;
        }
        choiceSong += 1;
        song.innerHTML = fihirana[choiceFihirana].hira[choiceSong].tononkira;
        song.appendChild(songs);
      }
    });
    // --------------------------------------------------------------------------------

// console.log(fihirana[choiceFihirana].hira.map(x=>x.tononkira).join("\n\n"));
}));
    displayFihirana = !displayFihirana;
    outputFihiranaFun();
  });
  iconBaiboly.addEventListener("click", () => {
  displayOutput = !displayOutput;
  outputFunction();
});
const boky = document.querySelectorAll(".b");
boky.forEach((b) => b.addEventListener("click", (e) => {

  listChapters.style.display = "grid";
  choiceBoky = Number(e.target.id);
  boky.forEach(b=> {
    b.classList.remove("active");
  });
  boky[choiceBoky].classList.add("active");
  fetchData(choiceBoky);
}));
async function fetchData(choiceBoky) {
  const res = await fetch("./db/baiboly.json", {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    dataType: "json",
  });
  // const data = await res.json();
  const data = bible
  listChapters.innerHTML = `<div class="load">
      <svg width="75" height="75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle  cx="12" cy="12" r="10" stroke="#9333ea" stroke-width="4"></circle>
      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>`;
  setTimeout(() => {
    renderData(data, choiceBoky);
  });
}
function renderData(datas, choiceBoky) {
  document.querySelector("svg").style.display = "none";
  const field = datas[choiceBoky].chapters;
  let choiceToko = 0;
  listChapters.innerHTML = field.map((dt, i) => (`<p class="t" id="${i}">${dt.index}</p>`)).join("");
  const toko = document.querySelectorAll(".t");

  toko[choiceToko].classList.add("active");
  let field_chap = datas[choiceBoky].chapters[choiceToko].verses;
  regexPrint(field_chap);
  window.addEventListener("keydown", (event) => {
    let btn = event.key;
    if(toPrevent){
      return null;
    } else {
      if (btn == "ArrowLeft") {
        if (choiceToko <= 0) {
          choiceToko = 1;
        }
        choiceToko -= 1;
        printContent(choiceToko, lenghToko);
      } else if (btn == "ArrowRight") {
        if (choiceToko > lenghToko - 1) {
          choiceToko = lenghToko - 1;
        }
        choiceToko += 1;
        printContent(choiceToko, lenghToko);
      }
    }
  });

  const lenghToko = toko.length;
  toko.forEach(t => t.addEventListener("click", (e) => {
    choiceToko = Number(e.target.id);
    printContent(choiceToko, lenghToko);
    chooseKey(choiceToko, lenghToko);
  }));
  function chooseKey(choiceToko,lenghToko) {
    window.addEventListener("keydown", (event) => {
      let btn = event.key;
      if(toPrevent){
        return null;
      } else {
        if (btn == "ArrowLeft") {
          if (choiceToko <= 0) {
            choiceToko = 1;
          }
          choiceToko -= 1;
          printContent(choiceToko, lenghToko);
        } else if (btn == "ArrowRight") {
          if (choiceToko > lenghToko - 1) {
            choiceToko = lenghToko - 1;
          }
          choiceToko += 1;
          printContent(choiceToko, lenghToko);
        }
      }
    });
  }
    function regexPrint(field_chap) {
      output.innerHTML = field_chap.map((dt, i) => {
        let content = dt.content;
            // --------------------------------
            let pattern = /\[(.*?)\]/g;
            let pattern2 = /\*(.*)/g;
            let pattern3 = /(.*)/g;
            function filterSymbole(match, $1, $2, offset){
              if (match.includes("*")) {
    
              let information = match.replace(pattern,`<i>$1</i>`);
              let indice = information.replace(pattern2, "<b>~$1</b>");
              return `${indice}`
    
              } else {
            
                  if ($1.includes("Na:")) {
                    let naText = $1.replace(pattern3,`<i>$1</i>`)
                    return `${naText}`
                  }
            
                return `<i>' ${$1} '</i><br>`;
              }
            }
            // --------------------------------
            let format = content.replace(/\[(.*?)\]/g, filterSymbole);
        return `<span>${dt.index}</span>${format}<br>`}).join("");
    }
    function printContent(choiceToko, lenghToko) {
      if (choiceToko < 0) {
        field_chap = datas[choiceBoky].chapters[choiceToko].verses;
      } else if (choiceToko > lenghToko) {
        field_chap = datas[choiceBoky].chapters[choiceToko].verses;
      } else {
        toko.forEach(t=> {
          t.classList.remove("active");
        });
        toko[choiceToko].classList.add("active");
        field_chap = datas[choiceBoky].chapters[choiceToko].verses;
        regexPrint(field_chap);
      }      
    }
}
