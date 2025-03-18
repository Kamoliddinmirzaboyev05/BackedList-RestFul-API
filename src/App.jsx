import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState(null);
  const [title, setTitle] = useState(null);
  const [info, setInfo] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const getData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=FZh6uobQP243mkcN68Q0BmRU3fvWvZmr");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://todoeasy.pythonanywhere.com/rejalar", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlans(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  // Postdata function
  const postData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "csrftoken=FZh6uobQP243mkcN68Q0BmRU3fvWvZmr");

    const raw = JSON.stringify({
      sarlavha: title,
      izoh: info,
      bajarildi: isDone,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://todoeasy.pythonanywhere.com/rejalar/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getData();
        setTitle(null);
        setInfo(null);
        setIsDone(false);
        setShowModal(false);
      })
      .catch((error) => console.error(error));
  };

  // Deletedata function
  const deleteData = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=FZh6uobQP243mkcN68Q0BmRU3fvWvZmr");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://todoeasy.pythonanywhere.com/rejalar/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        getData();
      })
      .catch((error) => console.error(error));
  };

  // GetOneProduct function

  const getOneProduct = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "csrftoken=FZh6uobQP243mkcN68Q0BmRU3fvWvZmr");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://todoeasy.pythonanywhere.com/rejalar/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTitle(result.sarlavha);
        setInfo(result.izoh);
        setIsDone(result.bajarildi);
      })
      .catch((error) => console.error(error));
  };

  // Update Data function
  const updateData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "csrftoken=FZh6uobQP243mkcN68Q0BmRU3fvWvZmr");

    const raw = JSON.stringify({
      sarlavha: title,
      izoh: info,
      bajarildi: isDone,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://todoeasy.pythonanywhere.com/rejalar/${currentID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        getData();
        setCurrentID(null);
        setShowModal(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <header>
      {showModal && (
        <div className="modal">
          <div className="modal_info">
            <div
              onClick={() => {
                setShowModal(false);
              }}
              className="exit"
            >
              ❎
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (currentID) {
                  updateData();
                } else {
                  postData();
                }
              }}
              action=""
            >
              <label htmlFor="">Sarlavha</label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
              />
              <label htmlFor="">izoh</label>
              <input
                value={info}
                onChange={(e) => {
                  setInfo(e.target.value);
                }}
                type="text"
              />
              <label htmlFor="">Bajarildi</label>
              <input
                checked={isDone}
                onChange={(e) => {
                  setIsDone(e.target.checked);
                }}
                type="checkbox"
              />
              <button>Create</button>
            </form>
          </div>
        </div>
      )}

      <nav>
        <div className="container">
          <h1>Plans</h1>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create
          </button>
        </div>
      </nav>
      <div className="hero">
        <div className="container">
          <div className="plans">
            {plans?.map((item) => {
              return (
                <div key={item.id} className="plan">
                  <div>
                    <h2>title: {item.sarlavha}</h2>
                    <p>Malumot: {item.izoh}</p>
                  </div>
                  <div className="icons">
                    <span>
                      <input
                        disabled
                        checked={item.bajarildi}
                        type="checkbox"
                      />
                    </span>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCurrentID(item.id);
                        getOneProduct(item.id);
                      }}
                    >
                      ✏️
                    </span>
                    <span
                      onClick={() => {
                        deleteData(item.id);
                      }}
                    >
                      🗑
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default App;
