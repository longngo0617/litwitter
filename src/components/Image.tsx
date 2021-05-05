import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";


interface ImageProps {
  image: any;
  close?: boolean;
  callback?: () => void;
}

export const Image: React.FC<ImageProps> = ({ image, close, callback }) => {
  return (
    <div className="post__image--wrap">
      <div className="post__image--wrap">
        <div className="post__image--wrap post__image">
          <div className="post__image--wrap">
            <div className="post__image--wrap overflow">
              <div
                className="full-width block"
                style={{ paddingBottom: "56.25%" }}
              ></div>
              <div className="post__image--body">
                <div
                  className="post__image--big"
                  style={{ marginBottom: "-21%" }}
                >
                  <div
                    className="post__image--background"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                  <img src={image} alt="" className="post__image--hide" />
                </div>
              </div>
              {close ? (
                <div className="post__image--close">
                  <div className="post__image--closeButton">
                    <CancelIcon
                      className="post__image--cancel"
                      onClick={callback}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            {/* <a href="#" className="post__image--wrap post__image--link">
              
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};
