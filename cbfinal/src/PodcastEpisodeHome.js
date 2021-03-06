import React from "react";
import "./App.css";
// import styled from "styled-components/macro";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";

import TopFigma from "./TopFigma";
import TopSearch from "./TopSearch";
import Player from "./Player";

import Scrolltext from "./Scrolltext";

import {
  updateShouldTranslationsAutoPlay,
  updateClickMeHasBeenClicked,
} from "./actions";

import { markEnglishAsPlaying, changeTranslation } from "./actions";

function PodcastEpisodeHome() {
  //eslint-disable-next-line
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(markEnglishAsPlaying(0.0, "TBD"));
    dispatch(changeTranslation(true));
    dispatch(updateShouldTranslationsAutoPlay(true));
    dispatch(updateClickMeHasBeenClicked(false));
    //eslint-disable-next-line
  }, []);

  return (
    <FleXApp className="App">
      {/* <AppProvider i18n={enTranslations}> */}
      <TopDivs>
        {/* {resizeListener} */}

        <TopFigma />
        <Player />
        <TopSearch />
      </TopDivs>
      <Scrolltext></Scrolltext>
      {/* </AppProvider> */}
    </FleXApp>
  );
  // }
}

const TopDivs = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const FleXApp = styled.div`
  min-width: 500px;
  max-width: 900px;
  margin: auto;
`;

export default PodcastEpisodeHome;
