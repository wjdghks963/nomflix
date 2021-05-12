/*eslint-disable*/
import React from "react";
import { moviesApi } from "api";

import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    movieDetail: null,
    loading: true,
  };

  async componentDidMount() {
    // componentDidMount()는 컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출됩니다DOM 노드가 있어야 하는 초기화 작업은 이 메서드에서 이루어지면 됩니다. 외부에서 데이터를 불러와야 한다면, 네트워크 요청을 보내기 적절한 위치입니다.
    try {
      const {
        data: { results: nowPlaying }, // data 안 results를 nowPlaying으로 이름 바꿈
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        nowPlaying, // = nowPlaying: nowPlaying
        upcoming,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movies information.",
      });
    } finally {
      // try or catch 둘 중 하나가 되면 실행
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upcoming, popular, error, loading } = this.state;
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}

/*
container : data, state(상태값)을 가지고 api를 불러와 모든 로직처리 (데이터담당)
presenter : container가 처리한 data들을 보여주는 함수형 컴포넌트, state,api,class 다루지 않음 (스타일 담당)
*/
