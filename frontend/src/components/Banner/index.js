import "./Banner.css";
import { useRef } from "react";

export default function Banner() {
  const bannerImgPath = process.env.PUBLIC_URL + "/book-banner.jpg";
  const arrowImgPath = process.env.PUBLIC_URL + "/arrow-icon.png";
  const logoImgPath =
    process.env.PUBLIC_URL + "/the-petshop-logo-transparent.png";

  const menuItems = document.querySelectorAll('.menu a[href^="#');
  console.log(menuItems);

  const elementoRef = useRef(null);

  const rolarParaElemento = () => {
    elementoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/book-banner.jpg)`,
      }}
    >
      <div className="slogan">
        <h1 className="slogan-1">Bibliotequinha</h1>
        <h3 className="slogan-2">A biblioteca virtual de todos, para todos.</h3>
      </div>
      <div className="arrow">
        <img
          onClick={rolarParaElemento}
          src={arrowImgPath}
          ref={elementoRef}
        ></img>
      </div>
    </div>
  );
}
