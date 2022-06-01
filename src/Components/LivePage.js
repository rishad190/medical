import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import firebaseConfig from "../firebase.Config";
import "firebase/compat/database";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase.Config";

import "./LivePage.css";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let oxygenBox = [];
let glucoseBox = [];
let tempBox = [];
let heartBox = [];
let hbBox = [];
let avgOxygen = 0;
let avgTemp = 0;
let avgGlucose = 0;
let avgHeart = 0;
let avgHb = 0;
const LivePage = () => {
  const [dataValue, setDataValue] = useState({});
  const [tasks, setTasks] = useState([]);
  const [dateValue] = useState(new Date());

  useEffect(() => {
    const q = query(collection(db, "user"), orderBy("RFID", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  useEffect(() => {
    firebase
      .database()
      .ref("/medical/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        setDataValue(data);
      });
  }, []);
  const rfidFilter = tasks.some((task) => task.data.RFID === dataValue.card);
  const userFilter = tasks.find((task) => task.data.RFID === dataValue.card);

  //  call all function
  const handleOxygenData = () => {
    if (dataValue?.oxygen > 70) {
      oxygenBox.push(dataValue?.oxygen);
    } else {
      console.log("NO Hand");
    }
    avgOxygen =
      oxygenBox.reduce((sum, curr) => sum + Number(curr), 0) / oxygenBox.length;
  };
  const handleGlucoseData = () => {
    if (dataValue?.glucose > 3) {
      glucoseBox.push(dataValue?.glucose);
    } else {
      console.log("NO Hand");
    }
    avgGlucose =
      glucoseBox.reduce((sum, curr) => sum + Number(curr), 0) /
      glucoseBox.length;
  };
  const handleTempData = () => {
    if (dataValue.temp > 32) {
      tempBox.push(dataValue.temp);
    } else {
      console.log("NO Hand");
    }
    avgTemp =
      tempBox.reduce((sum, curr) => sum + Number(curr), 0) / tempBox.length;
  };
  const handleHeartData = () => {
    if (dataValue?.heart > 50) {
      heartBox.push(dataValue?.heart);
    } else {
      console.log("NO Hand");
    }
    avgHeart =
      heartBox.reduce((sum, curr) => sum + Number(curr), 0) / heartBox.length;
  };
  const handleHbData = () => {
    if (dataValue?.hb > 2) {
      hbBox.push(dataValue?.hb);
    } else {
      console.log("NO Hand");
    }
    avgHb = hbBox.reduce((sum, curr) => sum + Number(curr), 0) / hbBox.length;
  };
  const handleSaveData = async () => {
    try {
      await addDoc(collection(db, "sensor"), {
        email: userFilter.data.email,
        RFID: userFilter.data.RFID,
        date: new Date(),
        temp: avgTemp,
        oxygen: avgOxygen,
        glucose: avgGlucose,
        heart: avgHeart,
        hb: avgHb,
      });
      firebase.database().ref("/medical/").update({
        oxygen: 0,
      });
      firebase.database().ref("/medical/").update({
        temp: 0,
      });
      firebase.database().ref("/medical/").update({
        glucose: 0,
      });

      firebase.database().ref("/medical/").update({
        heart: 0,
      });

      firebase.database().ref("/medical/").update({
        hb: 0,
      });

      firebase.database().ref("/medical/").update({
        card: "",
      });
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };
  handleOxygenData();
  handleTempData();
  handleGlucoseData();
  handleHeartData();
  handleHbData();
  return (
    <div className="container">
      {!rfidFilter && (
        <div className="row">
          <div className="col-md-12 ">
            <h2 className="text-uppercase text-center bg-success text-white">
              Please Use Your RFID To get Live Data
            </h2>
          </div>
        </div>
      )}

      {rfidFilter && (
        <div className="row">
          <div className="col-md-12 ">
            <div className="row">
              <div className="col-md-12">
                <div className="card text-center">
                  <div className="card-header"></div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {userFilter?.data.firstName} {userFilter?.data.last_name}
                    </h5>
                    <p className="card-text">
                      Email : {userFilter?.data.email} RFID :{" "}
                      {userFilter?.data.RFID}
                    </p>
                    <p className="card-text"></p>
                  </div>
                  <div className="card-footer text-muted">
                    {dateValue.toLocaleDateString("eng")}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="box_container_data">
                <div
                  className="card text-primary  border-primary  mb-3 m-5"
                  style={{ width: "300px" }}
                >
                  <div className="card-header text-center">Device Data</div>
                  <div className="card-body text-primary  text-center">
                    <h5 className="card-title">Heart Rate</h5>
                    <p className="card-text">{dataValue?.heart}</p>
                  </div>
                </div>
                <div
                  className="card text-primary  border-primary  mb-3 m-5"
                  style={{ width: "300px" }}
                >
                  <div className="card-header text-center">Device Data</div>
                  <div className="card-body text-primary  text-center">
                    <h5 className="card-title">Sp02</h5>
                    <p className="card-text">{dataValue?.oxygen} </p>
                  </div>
                </div>
                <div
                  className="card text-primary  border-primary  mb-3 m-5"
                  style={{ width: "300px" }}
                >
                  <div className="card-header text-center">Device Data</div>
                  <div className="card-body text-primary  text-center">
                    <h5 className="card-title">Temperature</h5>
                    <p className="card-text">{dataValue?.temp}C</p>
                  </div>
                </div>
                <div
                  className="card text-primary  border-primary  mb-3 m-5"
                  style={{ width: "300px" }}
                >
                  <div className="card-header text-center">Device Data</div>
                  <div className="card-body text-primary  text-center">
                    <h5 className="card-title">Hb</h5>
                    <p className="card-text">{dataValue?.hb}</p>
                  </div>
                </div>
                <div
                  className="card text-primary  border-primary  mb-3 m-5"
                  style={{ width: "300px" }}
                >
                  <div className="card-header text-center">Device Data</div>
                  <div className="card-body text-primary  text-center">
                    <h5 className="card-title">Glucose</h5>
                    <p className="card-text">{dataValue?.glucose}</p>
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
                        <td>{avgHeart.toFixed(2)}</td>
                        <td>{avgOxygen.toFixed(2)}</td>
                        <td>{avgTemp.toFixed(2)}</td>
                        <td>{avgHb.toFixed(2)}</td>
                        <td>{avgGlucose.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center mt-5">
                  <div
                    className="card text-primary  border-primary  mb-3"
                    style={{ width: "200px" }}
                  >
                    <div className="card-header text-center">
                      Control Device Data
                    </div>
                    <div className="card-body text-primary ">
                      <p className="card-text text-center">
                        <button
                          type="button"
                          className="btn btn-outline-success me-2 text-primary"
                          onClick={handleSaveData}
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
      )}
    </div>
  );
};

export default LivePage;
