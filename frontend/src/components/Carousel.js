// React import
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// React Bootstrap import
import Carousel from "react-bootstrap/Carousel";

// Styles
import styles from "../styles/Carousel.module.css";

const Carousel1 = () => {
  const history = useHistory();

  const handleButtonClick = (path) => {
    history.push(path);
  };

  return (
    <Carousel className={styles.Margin}>
      <Carousel.Item>
        <img
          className={styles.Image}
          src="https://res.cloudinary.com/draygqe7t/image/upload/v1691502265/123444577_184051683261535_824802158311214574_n_yjw2zu.jpg"
          alt="Ridetrack"
        />
        <Carousel.Caption>
          <div>
            <button
              className={styles.Transparant}
              onClick={() => handleButtonClick("/posts/create")}
            >
              Share your images with us
            </button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.Image}
          src="https://res.cloudinary.com/draygqe7t/image/upload/c_scale,h_640,w_960/v1698496726/media/images/received_172611130713732_wnbm8r.jpg"
          alt="Rider and a horse"
        />

        <Carousel.Caption>
          <div>
            <button
              className={styles.Transparant}
              onClick={() => handleButtonClick("/createinformation")}
            >
              Share information with others
            </button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.Image}
          src="https://res.cloudinary.com/draygqe7t/image/upload/v1691502351/123466975_184051633261540_2718395644933478477_n_erz6k8.jpg"
          alt="A stable"
        />

        <Carousel.Caption>
          <div>
            <button
              className={styles.Transparant}
              onClick={() => handleButtonClick("/tickets")}
            >
              Contact us!
            </button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousel1;
