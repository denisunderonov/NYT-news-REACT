import { useEffect, useState } from "react";
import "./main.css";
import likeIcon from "./img/like.svg";

export default function Main({ setLikeCounter, likeCounter }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [activeCardInfo, setActiveCardInfo] = useState({});

  const openModal = (obj) => {
    setActiveCardInfo(obj);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch(
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=32IrJSZalanhaRq5LgMuLO3QHxwmJUUX"
    )
      .then((response) => {
        return response.json().then((data) => {
          console.log(data.results);
          setNewsData(data.results);
        });
      })
      .catch((error) => {
        console.log("Ошибочка вышла: ", error);
      });
  }, []);
  return (
    <main>
      {isModalOpen ? (
        <Modal
          setIsModalOpen={setIsModalOpen}
          infoIndex={activeCardInfo.infoIndex}
          text={activeCardInfo.text}
          image={activeCardInfo.image}
          info={activeCardInfo.info}
        />
      ) : (
        <>
          <MainContainer
            component={
              <>
                <NameSection text="" />
                <NewsList
                  component={newsData.map((item, index) => {
                    return (
                      <NewsItem
                        likeCounter={likeCounter}
                        setLikeCounter={setLikeCounter}
                        info={newsData}
                        openModal={openModal}
                        cardIndex={index}
                        key={index}
                        image={
                          newsData[index].media[0]
                            ? newsData[index].media[0]["media-metadata"][2].url
                            : `#`
                        }
                        text={newsData[index].title}
                      />
                    );
                  })}
                />
              </>
            }
          />
        </>
      )}
    </main>
  );
}

function MainContainer({ component }) {
  return <div className="news-container">{component}</div>;
}

function NewsList({ component }) {
  return <ul className="news__list">{component}</ul>;
}

function NewsItem({
  image,
  text,
  cardIndex,
  openModal,
  info,
  setLikeCounter,
  likeCounter,
}) {
  return (
    <li className={`news__item news__item-${cardIndex}`}>
      <img className="news__item--image" src={image} alt="Картинка новости" />
      <div className="news__item--description">
        <h2 className="news__desctiption--news-name">{text}</h2>
        <div className="news__description--buttons">
          <button
            className={`news__buttons--product-more card-button-index-${cardIndex}`}
            onClick={() => {
              let obj = {
                infoIndex: cardIndex,
                info: info,
                text: text,
                image: image,
              };
              openModal(obj);
            }}
          >
            More information
          </button>
          <button
            onClick={(e) => {
              activateLike(e, setLikeCounter);
            }}
            className="news__description--like-button-href"
          >
            <img
              src={likeIcon}
              className="news__buttons--like-button"
              alt="Кнопка лайка"
            />
          </button>
        </div>
      </div>
    </li>
  );
}

function NameSection({ text }) {
  return <h1>{text}</h1>;
}

function Modal({ image, text, info, infoIndex, setIsModalOpen }) {
  console.log(info);
  return (
    <div className="modal-card">
      <img className="modal-card__image" src={image} alt="card image" />
      <h2 className="modal-card__main-text">{text}</h2>
      <div className="modal-card__buttons">
        <a href={info[infoIndex].url} className="modal-card__nyt-button">
          Read New on official NYT website
        </a>
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="modal-card__back-button"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

function activateLike(e, setLikeCounter) {
  if (e.target.style.background === "red") {
    e.target.style.background = "none";
    setLikeCounter((prev) => prev - 1);
  } else {
    e.target.style.background = "red";
    setLikeCounter((prev) => prev + 1);
  }
}
