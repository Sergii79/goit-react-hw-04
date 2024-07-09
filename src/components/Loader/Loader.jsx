import { ThreeDots } from "react-loader-spinner";
import css from "../Loader/Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <ThreeDots
        visible={true}
        height={50}
        width={50}
        color="#493db8"
        radius={9}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
