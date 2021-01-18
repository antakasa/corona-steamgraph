import { calculations } from "./utils/calculations";
export const generateSlides = () => [
  {
    annotations: [],
    text: [
      "<b><x-large>KUINKA IKÄ NÄKYY TARTUNTATILASTOISSA?</x-large></b>",
      "<small>Skrollaa alaspäin ⬇</small>"
    ],
  },
  {
    annotations: [],
    text: [
      "Kuviossa näkyy covid-19-viruksen raportoidut tartunnat viiteen ikäryhmään jaoteltuna.", "Tartunnoilla tarkoitetaan rekisteröityjä positiivisia testituloksia.",
    ],
  },
  {
    highlightedLayers: ["20-39"],
    annotations: [],
    text: [
      "Yksi alue (väri) edustaa kuviossa yhtä ikäryhmää.", "Parhaillaan korostettuna näkyy tartuntamäärässä mitattuna suurin ryhmä eli 20–39-vuotiaat.",
    ],
  },
  {
    annotations: [
      {
        date: "10.11.2020",
        categories: ["0-19"],
        text: `${calculations.calculateByDateAndCategory("10.11.2020", [
          "00-10",
          "10-20",
        ])} kpl`,
        orientation: "up",
      },
      {
        date: "10.11.2020",
        categories: ["20-39"],
        text: `${calculations.calculateByDateAndCategory("10.11.2020", [
          "20-30",
          "30-40",
        ])} kpl`,
        orientation: "down",
      },
      {
        date: "10.11.2020",
        categories: ["40-59"],
        text: `${calculations.calculateByDateAndCategory("10.11.2020", [
          "40-50",
          "50-60",
        ])} kpl`,
        orientation: "up",
      },
      {
        date: "10.11.2020",
        categories: ["60-79"],
        text: `${calculations.calculateByDateAndCategory("10.11.2020", [
          "60-70",
          "70-80",
        ])} kpl`,
        orientation: "down",
      },
      {
        date: "10.11.2020",
        categories: ["80-"],
        text: `${calculations.calculateByDateAndCategory("10.11.2020", [
          "80-",
        ])} kpl`,
        orientation: "up",
      },
    ],
   
    text: [
      'Päivittäisen heilunnan tasaamiseksi tartuntoja kuvaavat datapisteet on laskettu kuviossa <a href="https://fi.wikipedia.org/wiki/Liukuva_keskiarvo" target="_blank">liukuviksi keskiarvoiksi</a> seitsemän päivän ajalta. ',
      "Teksteissä tartuntojen kappalemäärillä viitataan kuitenkin absoluuttisiin lukuihin.",
    ],
  },
  {
    annotations: [],
    text: ["Kunkin alueen leveys suhteessa muihin kuvaa tartuntojen lukumäärää.",
    "Mitä leveämpi alue, sitä enemmän tartuntoja."],
  },
  {
    highlightedLayers: ["0-19", "20-39"],
    annotations: [],
    text: [
      `Alle 40-vuotiaiden osuus kaikista varmistetuista tartunnoista on noin ${Math.round(
        calculations.under40()
      )} % &#185;.`,
      `<span style="font-size: 12px">&#185;Ryhmän noin 2,5 miljoonaa jäsentä kattaa ${Math.round(
        calculations.under40ShareInPopulation()
      )} % Suomen väestöstä.</font>`,
    ],
  },
  (()=> {
    const data = calculations.mostInfectionsOnADateByGroups(["00-10", "10-20", "20-30", "30-40"])
    const date = data.date.date 
    const text = [`Suurimmillaan tartuntojen rekisteröinnit olivat ${data.date.date}`]
    const annotations = [
      {
        date,
        categories: ["0-19", "20-39"],
        text: `${data.maxValue} kpl`,
        orientation: "up"
      }
    ];
    return ({
      highlightedLayers: ["0-19", "20-39"],
      text,
      annotations
    })
  })(),
  (()=> {
    const data = calculations.mostInfectionsOnADateByGroups(["40-50", "50-60", "60-70", "70-80", "80-"])
    const date = data.date.date 
    const text = ['Myös vanhemmilla ikäryhmillä nähtiin samoihin aikoihin huomattavaa kasvua.']
    console.log(date)
    const annotations = [
      {
        date,
        categories: ["40-59", "60-79", "80-"],
        text: `${data.maxValue} kpl`,
        orientation: "down"
      }
    ];
    return ({
      highlightedLayers: ["40-59", "60-79", "80-"],
      text,
      annotations
    })
  })(),
  (()=> {
    const data = calculations.mostInfectionsOnADateByGroups(["00-10", "10-20", "20-30", "30-40"], "1.8.2020", "28.10.2020")
    const date = data.date.date 
    const text = [
      `Keskimäärin eri ikäryhmien muutokset mukailevat melko hyvin toisiaan.`,
      `Syksyllä alle 40-vuotiaiden ryhmässä nähtiin kuitenkin hieman muita korkeampia lukuja.`]
    const annotations = [
    ];
    return ({
      highlightedLayers: ["0-19", "20-39"],
      text,
      annotations
    })
  })(),
  (()=> {
    const data = calculations.mostInfectionsOnADateByGroups(["00-10", "10-20", "20-30", "30-40"], "1.8.2020", "28.10.2020")
    const data2 = calculations.mostInfectionsOnADateByGroups(["20-30"], "1.8.2020", "28.10.2020")
    console.log(data2)
    const date = data.date.date 
    const text = [
      `Korkeakoulujen alettua rekisteröitiin korkeimmillaan ${data.maxValue} tartuntaa alle 40-vuotialla (${date})`, `Tästä luvusta 
      ${data2.maxValue} rekisteröitiin 20–30-vuotiaiden osaryhmässä.`]
    const annotations = [
      {
        date,
        categories: ["0-19", "20-39"],
        text: `${data.maxValue} kpl`,
        orientation: "up"
      }
    ];
    return ({
      highlightedLayers: ["0-19", "20-39"],
      text,
      annotations
    })
  })(),
  (()=> {
    const data = calculations.mostInfectionsOnADateByGroups(["40-50", "50-60", "60-70", "70-80", "80-"], "10.10.2020", "20.10.2020")
    const date = data.date.date 
    const text = [
      `Kaikilla yli 40-vuotialla rekisteröitiin samoihin aikoihin enimmillään ${data.maxValue} tartuntaa.`]
    const annotations = [
      {
        date,
        categories: ["40-59", "60-79", "80-"],
        text: `${data.maxValue} kpl`,
        orientation: "up"
      }
    ];
    return ({
      highlightedLayers: ["0-19", "20-39"],
      text,
      annotations
    })
  })(),
  {
    highlightedLayers: ["0-19"],
    annotations: [
    ],
    text: ["Alle 20-vuotiaiden tartuntamäärissäkin näkyi selkeää kasvua syksyn aikana.","Tätä taustaa vasten myös lasten ja nuorten harrastustoimintaan kohdistuneet rajoitustoimet näyttävät perustellummilta."],
  }
];
