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
              <div className="post__image--absolute">
                <div className="post__image--flex">
                  {image.length < 3 &&
                    image.map((im: string,index:number) => (
                      <div className={`post__image--item ${index === 0 && image.length !== 1 ? "mr" : ""}`} key={im}>
                        <div className="post__image--body">
                          <div
                            className="post__image--big"
                            style={{ marginBottom: "-21%" }}
                          >
                            <div
                              className="post__image--background"
                              style={{ backgroundImage: `url(${im})` }}
                            ></div>
                            <img
                              src={im}
                              alt=""
                              className="post__image--hide"
                            />
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
                    ))}
                  {image.length === 3 && (
                    <>
                      <div
                        className="post__image--item"
                        style={{ marginRight: "12px" }}
                      >
                        <div className="post__image--body">
                          <div
                            className="post__image--big"
                            style={{ marginBottom: "-21%" }}
                          >
                            <div
                              className="post__image--background"
                              style={{ backgroundImage: `url(${image[0]})` }}
                            ></div>
                            <img
                              src={image[0]}
                              alt=""
                              className="post__image--hide"
                            />
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
                      <div className="post__image--item post__image--column">
                        <div
                          className="post__image--item"
                          style={{ marginBottom: "12px" }}
                        >
                          <div className="post__image--body">
                            <div
                              className="post__image--big"
                              style={{ marginBottom: "-21%" }}
                            >
                              <div
                                className="post__image--background"
                                style={{ backgroundImage: `url(${image[1]})` }}
                              ></div>
                              <img
                                src={image[0]}
                                alt=""
                                className="post__image--hide"
                              />
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
                        <div className="post__image--item">
                          <div className="post__image--body">
                            <div
                              className="post__image--big"
                              style={{ marginBottom: "-21%" }}
                            >
                              <div
                                className="post__image--background"
                                style={{ backgroundImage: `url(${image[2]})` }}
                              ></div>
                              <img
                                src={image[0]}
                                alt=""
                                className="post__image--hide"
                              />
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
                      </div>
                    </>
                  )}
                  {image.length > 3 && (
                    <>
                      <div
                        className="post__image--item post__image--column"
                        style={{ marginRight: "12px" }}
                      >
                        <div
                          className="post__image--item"
                          style={{ marginBottom: "12px" }}
                        >
                          <div className="post__image--body">
                            <div
                              className="post__image--big"
                              style={{ marginBottom: "-21%" }}
                            >
                              <div
                                className="post__image--background"
                                style={{ backgroundImage: `url(${image[0]})` }}
                              ></div>
                              <img
                                src={image[0]}
                                alt=""
                                className="post__image--hide"
                              />
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
                        <div className="post__image--item">
                          <div className="post__image--body">
                            <div
                              className="post__image--big"
                              style={{ marginBottom: "-21%" }}
                            >
                              <div
                                className="post__image--background"
                                style={{ backgroundImage: `url(${image[4]})` }}
                              ></div>
                              <img
                                src={image[0]}
                                alt=""
                                className="post__image--hide"
                              />
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
                      </div>
                      <div className="post__image--item post__image--column">
                        <div
                          className="post__image--item"
                          style={{ marginBottom: "12px" }}
                        >
                          <div className="post__image--body">
                            <div
                              className="post__image--big"
                              style={{ marginBottom: "-21%" }}
                            >
                              <div
                                className="post__image--background"
                                style={{ backgroundImage: `url(${image[1]})` }}
                              ></div>
                              <img
                                src={image[0]}
                                alt=""
                                className="post__image--hide"
                              />
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
                        <div className="post__image--item">
                          <div className="post__image--body">
                            <div
                              className="post__image--big"
                              style={{ marginBottom: "-21%" }}
                            >
                              <div
                                className="post__image--background"
                                style={{ backgroundImage: `url(${image[2]})` }}
                              ></div>
                              <img
                                src={image[0]}
                                alt=""
                                className="post__image--hide"
                              />
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
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* <a href="#" className="post__image--wrap post__image--link">
              
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};
