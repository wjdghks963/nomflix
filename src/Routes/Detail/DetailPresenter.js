import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";

const Cotainer = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  font-size: 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  padding-bottom: 10px;
`;

const DBLink = styled.a`
  font-weight: 700;
`;

const LogoContainer = styled.div`
  padding-top: 15px;
  display: relative;
`;

const Logo = styled.img`
  width: 50px;
  height: 30px;
`;

const Company = styled.div`
  display: flex;
`;

const VideoContainer = styled.div`
  display: flex;
  padding-top: 150px;
`;

const Video = styled.iframe`
  padding-right: 25px;
`;

const ThumContainer = styled.div``;

const Thum = styled.img`
  width: 150px;
  height: 150px;
`;
const Seasons = styled.div``;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Cotainer>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`http://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `http://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.PNG")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>-</Divider>
            <Item>{result.runtime || result.episode_run_time}min</Item>
            <Divider>-</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  // index는 장르의 갯수이고
                  index === result.genres.length - 1 // 마지막 장르
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <LogoContainer>
              {result.production_companies.map((logo) =>
                logo.logo_path === null ? null : (
                  <Company>
                    <text>{logo.name}</text>
                    <Logo
                      src={`http://image.tmdb.org/t/p/w500${logo.logo_path}`}
                    />
                  </Company>
                )
              )}
              {console.log(result.production_companies)}
            </LogoContainer>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <DBLink href={`https://www.imdb.com/title/${result.imdb_id}`}>
            Go to IMDB Detail
          </DBLink>
          <VideoContainer>
            {result.videos.results.length === 0 ? null : result.videos.results
                .length > 1 ? (
              <>
                <Video
                  src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                />
                <Video
                  src={`https://www.youtube.com/embed/${result.videos.results[1].key}`}
                />
              </>
            ) : (
              <>
                <Video
                  src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                />
              </>
            )}
          </VideoContainer>
        </Data>
        {console.log(result.seasons.map((name) => name))}
        <Seasons>
          {result.seasons.map((thum) =>
            thum === 0 || thum.poster_path === null ? null : (
              <ThumContainer>
                <Title>{thum.name}</Title>
                <Thum
                  src={`http://image.tmdb.org/t/p/w300/${thum.poster_path}`}
                />
              </ThumContainer>
            )
          )}
        </Seasons>
      </Content>
    </Cotainer>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
