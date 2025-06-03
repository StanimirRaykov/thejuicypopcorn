// pages/MovieDetail.jsx
import { useParams } from "react-router-dom";
// or your source

const MovieDetail = () => {
  const { id } = useParams();

  return <div>Movie not found</div>;
};

export default MovieDetail;
