import express from "express";
import cors from "cors";

const server = express();
server.use(cors());

const date = new Date();
const today = date.toLocaleDateString("en-us");

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" },
];

server.get("/holidays", (req, res) => {
  res.send(holidays);
});

server.get("/is-today-holiday", (req, res) => {
  let currentHoliday;
  const currentDay = holidays.filter((day) => {
    if (day.date === today) {
      currentHoliday = day.name;
      return true;
    }
    return false;
  });

  if (currentDay.length < 1) {
    res.send("Não, hoje não é feriado");
  } else {
    res.send(`Sim, hoje é ${currentHoliday}`);
  }
});

server.get("/holidays/:month", (req, res) => {
  const month = req.params.month;
  const monthHolidays = holidays.filter((day) => {
    let currentMonth = day.date.slice(0, day.date.indexOf("/"));
    return currentMonth === month;
  });
  res.send(monthHolidays);
});

server.listen(4000);
