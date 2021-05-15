/*eslint-disable*/ // << eslint 무시
import React from "react";
import { moviesApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"), // includes > pathname안에 /movie/가 있다 true or false
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id); // parseInt = 특정 진수의 정수 반환 문자 = NaN
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({
          data: result, // data가 result이다.  == result.data ()안에 넣었기 때문에 위의 result = null과 다름
        } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Cant't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
