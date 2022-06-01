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
  console.log(sensorFilter[0]?.data.date.toDate().toLocaleDateString());
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="cardBox">
            <div className="cardBox-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>Name</h4>
                  <p className="text-secondary mb-1">Patient</p>
                  <p className="text-muted font-size-sm">Address</p>
                  <button className="btn btn-primary">Follow</button>
                  <button className="btn btn-outline-primary">Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="cardBox mb-3">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <h6>
                  {dataFilter[0]?.data?.firstName} {""}
                  {dataFilter[0]?.data?.last_name}
                </h6>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <h6>{dataFilter[0]?.data?.email}</h6>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Phone</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.tel}</h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.address}</h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Age</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.age}</h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Weight</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.weight}</h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Room</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.room}</h6>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">RFID</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {" "}
                <h6>{dataFilter[0]?.data?.RFID}</h6>
              </div>
            </div>
            <hr />
          </div>
          {/* table */}

          <div className="row ">
            <div className="col-md-12 col-sm-12 text-center">
              <h3>Result</h3>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Spo2</th>
                    <th scope="col">Temperature</th>
                    <th scope="col">Glucose</th>
                    <th scope="col">Hb</th>
                    <th scope="col">Heart Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorFilter?.map((sensor, i) => (
                    <tr key={sensor.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{sensor?.data.date.toDate().toLocaleDateString()}</td>
                      <td>{sensor?.data.oxygen.toFixed(2)}</td>
                      <td>{sensor?.data.temp.toFixed(2)}</td>
                      <td>{sensor?.data.glucose.toFixed(2)}</td>
                      <td>{sensor?.data.hb.toFixed(2)}</td>
                      <td>{sensor?.data.heart.toFixed(2)}</td>
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
