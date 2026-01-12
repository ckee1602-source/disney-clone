import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecommend } from "../features/movie/movieSlice";

const Recommends = () => {
  const movies = useSelector(selectRecommend);
  console.log(movies, ":🛢");

  // Disney+ style carousel settings (without dots)
  const settings = {
    dots: false, // Removed dots
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <h4>Recommended for You</h4>
      <Carousel {...settings}>
        {movies &&
          movies.map((movie, key) => (
            <Wrap key={key}>
              <Link to={`/detail/${movie.id}`}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </Wrap>
          ))}
      </Carousel>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 0 0 26px;
`;

const Carousel = styled(Slider)`
  margin-top: 20px;
  position: relative;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 2;
    transition: opacity 0.3s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  &:hover button {
    opacity: 1;
  }

  .slick-list {
    overflow: hidden;
  }
`;
const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Ensure all images have the same height */
  
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 4px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Ensures the image fills the area */
      border-radius: 4px;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;






export default Recommends;
