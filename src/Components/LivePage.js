import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase.Config";
import "firebase/compat/database";
import "./LivePage.css";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let oxygenBox = [];
let avgOxygen = 0;
let tempBox = [];
let avgTemp = 0;
let glucoseBox = [];
let avgGlucose = 0;
const LivePage = () => {
  const [dataValue, setDataValue] = useState({});

  useEffect(() => {
    firebase
      .database()
      .ref("/medical/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setDataValue(data);
        // let d = new Date();
        // let hour = d.getHours();
        // if (hour > 16 && hour < 23) {
        //   if (dataValue.power1 > dataValue.power2) {
        //     alert("Please  Turn OFF Load 1 ");
        //   } else {
        //     alert("Please  Turn OFF Load 2");
        //   }
        // }
      });
  }, []);

  const handleOxygenData = () => {
    if (dataValue.oxygen > 70) {
      oxygenBox.push(dataValue.oxygen);
    } else {
      console.log("NO Hand");
    }
    avgOxygen =
      oxygenBox.reduce((sum, curr) => sum + Number(curr), 0) / oxygenBox.length;
  };
  const handleTempData = () => {
    if (dataValue.temp > 31) {
      tempBox.push(dataValue.temp);
    } else {
      console.log("NO Hand");
    }
    avgTemp =
      tempBox.reduce((sum, curr) => sum + Number(curr), 0) / tempBox.length;
  };
  handleOxygenData();
  handleTempData();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <h2 className="text-uppercase text-center bg-success text-white">
            Please Use Your RFID To get Live Data
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ">
          <div className="row">
            <div className="box_container_data">
              <div
                class="card text-primary  border-primary  mb-3 m-5"
                style={{ width: "300px" }}
              >
                <div class="card-header text-center">Device Data</div>
                <div class="card-body text-primary  text-center">
                  <h5 class="card-title">Heart Rate</h5>
                  <p class="card-text">{dataValue?.heart}</p>
                </div>
              </div>
              <div
                class="card text-primary  border-primary  mb-3 m-5"
                style={{ width: "300px" }}
              >
                <div class="card-header text-center">Device Data</div>
                <div class="card-body text-primary  text-center">
                  <h5 class="card-title">Sp02</h5>
                  <p class="card-text">{dataValue?.oxygen} </p>
                </div>
              </div>
              <div
                class="card text-primary  border-primary  mb-3 m-5"
                style={{ width: "300px" }}
              >
                <div class="card-header text-center">Device Data</div>
                <div class="card-body text-primary  text-center">
                  <h5 class="card-title">Temperature</h5>
                  <p class="card-text">{dataValue?.temp}C</p>
                </div>
              </div>
              <div
                class="card text-primary  border-primary  mb-3 m-5"
                style={{ width: "300px" }}
              >
                <div class="card-header text-center">Device Data</div>
                <div class="card-body text-primary  text-center">
                  <h5 class="card-title">Hb</h5>
                  <p class="card-text">{dataValue?.pressure}</p>
                </div>
              </div>
              <div
                class="card text-primary  border-primary  mb-3 m-5"
                style={{ width: "300px" }}
              >
                <div class="card-header text-center">Device Data</div>
                <div class="card-body text-primary  text-center">
                  <h5 class="card-title">Glucose</h5>
                  <p class="card-text">{dataValue?.glucose}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <table className="table table-primary text-center">
                  <thead>
                    <tr>
                      <th scope="col">Heart Rate</th>
                      <th scope="col">Spo2</th>
                      <th scope="col">Temperature</th>
                      <th scope="col"> Hb</th>
                      <th scope="col"> Glucose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-primary">
                      <td>{}</td>
                      <td>{avgOxygen}</td>
                      <td>{avgTemp}</td>
                      <td>{}</td>
                      <td>{avgGlucose}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center mt-5">
                <div
                  class="card text-primary  border-primary  mb-3"
                  style={{ width: "200px" }}
                >
                  <div class="card-header text-center">Control Device Data</div>
                  <div class="card-body text-primary ">
                    <p class="card-text text-center">
                      <button
                        type="button"
                        class="btn btn-outline-success me-2 text-primary"
                      >
                        SAVE DATA SERVER
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
