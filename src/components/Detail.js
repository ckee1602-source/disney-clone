import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../features/movie/movieSlice";
import Recommends from "./Recommends";

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const docRef = doc(db, "movies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document in Firebase 🔥");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <Container>
      <Background>
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </Background>

      <ImageTitle>
        <img alt={detailData.title} src={detailData.titleImg} />
      </ImageTitle>

      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>

          <TrailerButton
            onClick={() => {
              if (detailData.trailer) {
                window.open(
                  detailData.trailer,
                  "_blank",
                  "noopener,noreferrer"
                );
              } else {
                alert("Trailer not available");
              }
            }}
          >
            <img src="/images/play-icon-white.png" alt="Play Icon" />
            <span>Trailer</span>
          </TrailerButton>

          <AddListWrapper>
            <AddList onClick={() => {
              dispatch(addToWatchlist(detailData));
              setShowAddedPopup(true);
              setTimeout(() => {
                setShowAddedPopup(false);
                navigate('/watchlist');
              }, 5000); // Show popup for 5 seconds
            }}>
              <span />
              <span />
            </AddList>

            {showAddedPopup && (
              <AddedPopup>
                <PopupContent>
                  <CheckIcon>✓</CheckIcon>
                  <PopupText>Added to Watchlist!</PopupText>
                </PopupContent>
              </AddedPopup>
            )}
          </AddListWrapper>

          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>

        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>

      {showTrailer && (
        <TrailerModal>
          <CloseButton onClick={() => setShowTrailer(false)}>X</CloseButton>
          <iframe
            width="100%"
            height="100%"
            src={detailData.trailer}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </TrailerModal>
      )}

      {detailData.genre && <Recommends genre={detailData.genre} />}
    </Container>
  );
};

export default Detail;


/* Styled Components */
const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  opacity: 0.8;
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;
  }
`;

const ImageTitle = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  background: rgb(249, 249, 249);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const TrailerButton = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
`;

/* Trailer Modal */
const TrailerModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 50%;
`;
const AddListWrapper = styled.div`
  position: relative;
  margin-right: 16px;
`;

const AddList = styled.div`
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const GroupWatch = styled.div`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;

  div {
    height: 40px;
    width: 40px;
    background: rgb(0, 0, 0);
    border-radius: 50%;

    img {
      width: 100%;
    }
  }
`;


const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
`;

const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(249, 249, 249);
`;

const AddedPopup = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  padding: 6px 10px;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  margin-top: 8px;
`;

const PopupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 6px;
`;

const CheckIcon = styled.div`
  font-size: 16px;
  color: #00ff00;
`;

const PopupText = styled.div`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;