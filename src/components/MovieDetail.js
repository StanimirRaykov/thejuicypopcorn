import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();

  return <div>Movie not found</div>;
};

export default MovieDetail;
