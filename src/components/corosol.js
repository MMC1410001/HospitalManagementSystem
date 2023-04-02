import { useState } from "react";
import { Carousel } from "react-bootstrap";
import img1 from "../assets/corosole1.jpeg";
//import img2 from "../assets/corosole2.jpeg";
import img3 from "../assets/corosole3.jpg";
import img4 from "../assets/HospitalImg01.jpeg";
import img5 from "../assets/hospitalsaloon.jpg";
import img6 from "../assets/hospitalBuilding.jpg"

function CreateCorosol() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{ height: "160px", width: "220px" }}
    >
      <Carousel.Item>
        <img
          style={{
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "20px",
            borderWidth: "5px",
            height: "160px",
            width: "220px",
          }}
          className="d-block w-100"
          src={img6}
          alt=""
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "20px",
            borderWidth: "5px",
            height: "160px",
            width: "220px",
          }}
          className="d-block w-100"
          src={img3}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "20px",
            borderWidth: "5px",
            height: "160px",
            width: "220px",
          }}
          className="d-block w-100"
          src={img5}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            borderStyle: "solid",
            borderColor: "black",
            borderRadius: "20px",
            borderWidth: "5px",
            height: "160px",
            width: "220px",
          }}
          className="d-block w-100"
          src={img4}
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CreateCorosol;
