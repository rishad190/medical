import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.Config";
import { UserContext } from "../App";
const Dashboard = () => {
  const [user] = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [sensorValue, setSensorValue] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "user"), orderBy("email", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    const p = query(collection(db, "sensor"), orderBy("email", "desc"));
    onSnapshot(p, (querySnapshot) => {
      setSensorValue(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const dataFilter = tasks.filter((task) => task.data.email === user.email);
  const sensorFilter = sensorValue.filter(
    (sensor) => sensor.data.email === user.email
  );
  console.log(sensorFilter);
  return (
    <div class="container">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="cardBox">
            <div class="cardBox-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  class="rounded-circle"
                  width="150"
                />
                <div class="mt-3">
                  <h4>Name</h4>
                  <p class="text-secondary mb-1">Patient</p>
                  <p class="text-muted font-size-sm">Address</p>
                  <button class="btn btn-primary">Follow</button>
                  <button class="btn btn-outline-primary">Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="cardBox mb-3">
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Full Name</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <h6>
                  {dataFilter[0]?.data?.firstName} {""}
                  {dataFilter[0]?.data?.last_name}
                </h6>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Email</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                <h6>{dataFilter[0]?.data?.email}</h6>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Phone</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.tel}</h6>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Address</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.address}</h6>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Age</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.age}</h6>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Weight</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.weight}</h6>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Room</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.room}</h6>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">RFID</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.RFID}</h6>
              </div>
            </div>
            <hr />
          </div>
          {/* table */}

          <div class="row ">
            <div class="col-md-12 col-sm-12 text-center">
              <h3>Result</h3>
              <table class="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Spo2</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Glucose</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorFilter?.map((sensor, i) => (
                    <tr key={sensor.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{sensor.data.oxygen}</td>
                      <td>{sensor.data.temp}</td>
                      <td>{sensor.data.glucose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
