import React, { useEffect, useState } from "react";
import "./App.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Loader from "./components/loader/Loader";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState(null);
  const [title, setTitle] = useState(null);
  const [info, setInfo] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  // Postdata function
  const postData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
        setTitle(null);
        setInfo(null);
        setIsDone(false);
        setShowModal(false);
        toast.success("The new plan successful added");
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
        toast.warning("The new plan successful deleted");
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
        setTitle(null);
        setInfo(null);
        setIsDone(false);
      })
      .catch((error) => console.error(error));
  };
  return (
    <header>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
            {isLoading && <Loader />}

            {plans?.map((item) => {
              return (
                <div key={item.id} className="plan">
                  <div>
                    <h2>Title: {item.sarlavha}</h2>
                    <p>Ma`lumot: {item.izoh}</p>
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
