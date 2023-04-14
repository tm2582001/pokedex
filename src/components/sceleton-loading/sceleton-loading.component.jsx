import { forwardRef } from "react";
import { ReactComponent as PokeballSvg } from "../../assets/pokeball.svg";
import "./sceleton-loading.styles.css";

const SceletonLoading = forwardRef(({ apiLimit }, ref) => {
  return Array.from(Array(apiLimit), (e, i) => {
    return (
      <div
        className="render-pokemon-wrapper"
        key={i}
        ref={i === 0 ? ref : null}
      >
        {/* <div className="render-pokemon-img sceleton-loading-image sceleton-animation" /> */}
        <PokeballSvg className="render-pokemon-img sceleton-loading-image" />
        <span className="render-pokemon-id sceleton-loading-id sceleton-animation"></span>
        <span className="render-pokemon-name sceleton-loading-name sceleton-animation"></span>
        <div>
          {Array.from(Array(2), (e, i) => (
            <span
              key={i}
              className="render-pokemon-type sceleton-loading-type sceleton-animation"
            ></span>
          ))}
        </div>
      </div>
    );
  });
});

export default SceletonLoading;
