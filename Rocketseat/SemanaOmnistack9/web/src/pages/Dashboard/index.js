import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import api from "../../services/api";

// CSS
import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://192.168.0.52:3001", {
        query: { user_id }
      }),
    [user_id]
  );

  // When [<filter>] get changed, execute function ()=>{}
  // If [] is empty executes only one time
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: {
          user_id
        }
      });
      console.log(response.data);
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  useEffect(() => {
    socket.on("booking_request", data => {
      setRequests([...requests, data]);
    });
    console.log(requests);
  }, [requests, socket]);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);
    console.log(requests);
    setRequests(requests.filter(request => request._id !== id));
    console.log(requests);
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }
  return (
    <>
      <ul className='notifications'>
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data:{" "}
              <strong>{request.date}</strong>
            </p>
            <button
              className='accept'
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </button>
            <button
              className='reject'
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </button>
          </li>
        ))}
      </ul>

      <ul className='spot-list'>
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to='/New'>
        <button className='btn'>Cadastrar novo spot</button>
      </Link>
    </>
  );
}
