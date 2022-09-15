import "./Loading.scss";
import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="app__loading">
      <div className="m-auto">
        <CircularProgress size={65} />
      </div>
    </div>
  );
};

export default Loading;
