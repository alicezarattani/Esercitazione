import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState } from "react";
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

  const [wicon, setWicon] = useState(Cloud_Icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=Metric&APPID=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidityPercent");
    const wind = document.getElementsByClassName("windRate");
    const temperature = document.getElementsByClassName("temp");
    const location = document.getElementsByClassName("weatherLocation");

    humidity[0].innerHTML = data.list[0].main.humidity + "%";
    wind[0].innerHTML = data.list[0].wind.speed + "km/h";
    temperature[0].innerHTML = data.list[0].main.temp + "°C";
    location[0].innerHTML = data.city.name;

    let weatherMain;

    for (let i = 0; i < 3; i++) {
      const dayIndex = i * 8; // Ogni oggetto ogni 8 ore, quindi 0, 8, 16, ...
      const dayElement = document.getElementsByClassName(`nextDay${i + 1}`);
      dayElement[0].innerHTML = moment(data.list[dayIndex].dt_txt).format(
        "dddd"
      );

      const tempElement = document.getElementsByClassName(`nextTemp${i + 1}`);
      tempElement[0].innerHTML = data.list[dayIndex].main.temp + "°C";

      const weatherMain = data.list[dayIndex].weather[0].main;
      let icon;

      switch (weatherMain) {
        case "Clear":
          icon = Clear_Icon;
          break;
        case "Clouds":
          icon = Cloud_Icon;
          break;
        case "Snow":
          icon = Snow_Icon;
          break;
        case "Drizzle":
          icon = Drizzle_Icon;
          break;
        case "Rain":
          icon = Rain_Icon;
          break;
        default:
          icon = Cloud_Icon;
      }
      // Aggiorna l'icona in base alla previsione per ciascun giorno
      const nextIconElement = document.getElementsByClassName(
        `next nextDay${i + 1}`
      );
      nextIconElement[0].src = icon;
    }

    // Imposta l'icona principale in base alla condizione meteorologica attuale
    switch (weatherMain) {
      case "Clear":
        setWicon(Clear_Icon);
        break;
      case "Clouds":
        setWicon(Cloud_Icon);
        break;
      case "Snow":
        setWicon(Snow_Icon);
        break;
      case "Drizzle":
        setWicon(Drizzle_Icon);
        break;
      case "Rain":
        setWicon(Rain_Icon);
        break;
      default:
        setWicon(Cloud_Icon);
    }
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
        <h1 className="weatherLocation">Monaco</h1>
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
            <p className="temp">47°C</p>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center my-4">
          <Col xs={6}>
            <img src={Humidity_Icon} alt=""></img>
            <p className="humidityPercent">34%</p>
          </Col>
          <Col xs={6}>
            <img src={Wind_Icon} alt=""></img>
            <p className="windRate">43.56 km/h</p>
          </Col>
        </Row>
        {/* <Row className="d-flex align-items-center justify-content-center my-3">
          <div className="my-2 border-bottom">Previsioni della Settimana</div>
          <Col xs={6}>
            <img className="next" src={wicon} alt=""></img>
          </Col>
          <Col xs={6}>
            <p>GRADI MAIN WEATHER</p>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center my-3">
          <Col xs={6}>
            <img className="next" src={wicon} alt=""></img>
          </Col>
          <Col xs={6}>
            <p>GRADI MAIN WEATHER</p>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-center my-3">
          <Col xs={6}>
            <img className="next" src={wicon} alt=""></img>
          </Col>
          <Col xs={6}>
            <p>GRADI MAIN WEATHER</p>
          </Col>
        </Row> */}

        {/* Aggiungi div per le previsioni dei prossimi 3 giorni */}
        <Row className="d-flex align-items-center justify-content-center my-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Col xs={6} key={index}>
              <img
                className={`next nextDay${index + 1}`}
                src={wicon}
                alt=""
              ></img>
              <p className={`next nextTemp${index + 1}`}>PROSSIMI GIORNI</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Main;
