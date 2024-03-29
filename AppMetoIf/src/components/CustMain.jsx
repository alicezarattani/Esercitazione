import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Search_Icon from "../Images/Icons/search.png";
import Clear_Icon from "../Images/Icons/clear.png";
import Cloud_Icon from "../Images/Icons/cloud.png";
import Drizzle_Icon from "../Images/Icons/drizzle.png";
import Snow_Icon from "../Images/Icons/snow.png";
import Rain_Icon from "../Images/Icons/Rain.png";
import Wind_Icon from "../Images/Icons/wind.png";
import Humidity_Icon from "../Images/Icons/humidity.png";
import moment from "moment";

function Main() {
  let api_key = "a7c18d8f0c760dc2d008770529ee33da";

  //setto gli stati per memorizzare l'icona del tempo corrente e le previsioni per i giorni futuri
  const [wicon, setWicon] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  //funzione asincrona che viene chiamata quando si fa click sul bottone di ricerca
  const search = async () => {
    //recupero il valore inserito dall'utente nella casella di input
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=Metric&APPID=${api_key}`;
    let response = await fetch(url);
    //response aspetta una risposta dall'url che fa la chiamata api per ottenere i dati meteo della città inserita e li memorizza
    //data memorizza la risposta ricevuta in json
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidityPercent");
    const wind = document.getElementsByClassName("windRate");
    const temperature = document.getElementsByClassName("temp");
    const location = document.getElementsByClassName("weatherLocation");

    //la funzione groupedData raggruppa i dati di ogni giorno in un array
    const groupedData = data.list.reduce((acc, item) => {
      const day = moment(item.dt_txt).format("YYYY-MM-DD");
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    }, {});

    //estraggo i dati relativi al giorno di oggi
    const todayData = groupedData[moment().format("YYYY-MM-DD")];

    if (!todayData || todayData.length === 0) {
      //funzione di controllo nel caso i dati non siano disponibili
      return;
    }

    //recupero dal file json i diversi dati che poi verranno inseriti in HTML
    humidity[0].innerHTML = todayData[0].main.humidity + "%";
    wind[0].innerHTML = todayData[0].wind.speed + "km/h";
    temperature[0].innerHTML = todayData[0].main.temp + "°C";
    location[0].innerHTML = data.city.name;

    //setWicon utilizza la funzione getForecastIcon per impostare l'icona del meteo del giorno corrente
    setWicon(getForecastIcon(todayData[0].weather[0].main));

    //estraggo i dati relativi ai giorni successivi
    const nextDaysData = Object.values(groupedData)
      .filter((dayData) => dayData[0].dt_txt !== todayData[0].dt_txt) //li filtro per escludere quelli del giorno corrente
      .slice(0, 4); //con lo slice prendo solo i dati dei prossimi 4 giorni

    //setto i dati relativi ai giorni successivi e faccio uno slice per prendere solo i dati relativi a un giorno alla volta
    setForecastData(nextDaysData.flatMap((dayData) => dayData.slice(1, 2)));
  };

  return (
    <>
      <input
        type="text"
        className="cityInput"
        placeholder="Inserisci la città"
      />
      <img
        src={Search_Icon}
        alt="Search Icon"
        className="Search-Icon px-2"
        onClick={() => {
          search();
        }}
      ></img>

      <div>
        <h1 className="weatherLocation"></h1>
        <p>
          {moment().format("dddd")}, <br />
          {moment().format("LL")}
        </p>
      </div>
      <Container>
        <Row className="d-flex align-items-center justify-content-center my-2">
          <Col xs={6}>
            <div>
              <img src={wicon} alt=""></img>
            </div>
          </Col>
          <Col xs={6}>
            <p className="temp"></p>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center my-4">
          <Col xs={6}>
            <img src={Humidity_Icon} alt=""></img>
            <p className="humidityPercent"></p>
          </Col>
          <Col xs={6}>
            <img src={Wind_Icon} alt=""></img>
            <p className="windRate"></p>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center my-3">
          <div className="my-3 border-bottom text-uppercase fs-2 fw-semibold">
            Previsioni della Settimana
          </div>
          {forecastData.map((forecastDay, index) => (
            <Col
              key={index}
              xs={3}
              className="badge bg-info bg-opacity-50 text-light fs-4 fw-semibold"
            >
              <img
                className="next"
                src={getForecastIcon(forecastDay.weather[0].main)}
                alt=""
              ></img>
              <p>{forecastDay.main.temp}°C</p>
              {/* <p>{getDayFromDate(forecastDay.dt_txt)}</p> */}
              <p>{moment(forecastDay.dt_txt).format("dddd")}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

//funzione che permette di ottenere l'icona in base alle condizioni meteorologiche, utilizza lo switch case per settare ogni condizione sulla base della parola che trova nel file json
const getForecastIcon = (weatherMain) => {
  switch (weatherMain) {
    case "Clear":
      return Clear_Icon;
    case "Clouds":
      return Cloud_Icon;
    case "Snow":
      return Snow_Icon;
    case "Drizzle":
      return Drizzle_Icon;
    case "Rain":
      return Rain_Icon;
    default:
      return Cloud_Icon;
  }
};

export default Main;
