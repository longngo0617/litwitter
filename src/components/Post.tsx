import { Avatar, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import moment from "moment";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostSnippetFragment, useLikeMutation } from "../generated/graphql";
import { UserContext } from "../utils/useAuth";
import { Image } from "./Image";
import { InteractiveBar } from "./InteractiveBar";

export const Post: React.FC<PostSnippetFragment> = (props) => {
  const router = useHistory();
  const [likePost] = useLikeMutation();
  const { user, openMore } = useContext(UserContext);

  console.log(props.image)
  return (
    <>
      <div
        className="post"
        onClick={() => router.replace(`/posts/${props.id}`)}
      >
        <Link
          to={`/users/${props.username}`}
          className="post__avatar"
          onClick={(e) => e.stopPropagation()}
        >
          <Avatar src={props.avatar || ""} />
        </Link>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                <Link
                  to={`/users/${props.username}`}
                  className="link link--none"
                  onClick={(e) => e.stopPropagation()}
                >
                  {props.displayname}
                  <span className="post__headerSpecial">
                    {props.verified && (
                      <VerifiedUserIcon className="post__badge" />
                    )}
                    @{props.username}
                  </span>
                </Link>
                <time className="post__time">{moment(props.createdAt).format('l')}</time>
              </h3>

              <IconButton
                aria-label="more"
                onClick={(e) => {
                  e.stopPropagation();
                  openMore(
                    {
                      x: `${e.pageX}px`,
                      y: `${e.pageY}px`,
                    },
                    props
                  );
                }}
              >
                <MoreHorizIcon fontSize="small" />
              </IconButton>
            </div>
            <div className="post__headerDescription">
              <p>{props.body}</p>
            </div>
          </div>
          {props?.image?.length ? <Image image={props.image[0]} /> : null}
          <div className="post__footer">
            <InteractiveBar
              commentCount={props.commentCount}
              likeCount={props.likeCount}
              likeList={props.likes}
              item={props}
              likePost={async () =>
                await likePost({
                  variables: { id: props.id },
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
