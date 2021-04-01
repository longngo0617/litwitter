import { Avatar, Box, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { useContext } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Image } from "../../../components/Image";
import { InteractiveBar } from "../../../components/InteractiveBar";
import { Loading } from "../../../components/Loading";
import { useLikeMutation, usePostQuery } from "../../../generated/graphql";
import { formatDate } from "../../../utils/toErrorMap";
import { UserContext } from "../../../utils/useAuth";
import { Comment } from "./Comment";

interface DetailsPostProps {}

export const DetailsPost: React.FC<DetailsPostProps> = () => {
  const postID: any = useRouteMatch();
  const router = useHistory();
  const { openMore } = useContext(UserContext);
  const { data, loading } = usePostQuery({
    variables: { id: postID.params.id },
  });
  const [likePost] = useLikeMutation();

  return (
    <div className="feed">
      <div className="feed__header">
        <ArrowBackIcon
          className="feed__header--icon"
          onClick={() => router.replace("/")}
        />
        <h2>Tweet</h2>
      </div>

      {!data && loading ? (
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Loading blue />
        </Box>
      ) : (
        <div className="wrap">
          <div className="postSingle__wrap">
            <div className="postSingle">
              <div className="postSingle__header">
                <div className="postSingle__header--left">
                  <Avatar src={data?.getPost.avatar || ""} />
                  <div className="name">
                    <span>{data?.getPost.displayname}</span>
                    <span>@{data?.getPost?.username}</span>
                  </div>
                </div>
                <div className="postSingle__header--right">
                  <IconButton
                    aria-label="more"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMore(
                        {
                          x: `${e.pageX}px`,
                          y: `${e.pageY}px`,
                        },
                        data?.getPost
                      );
                    }}
                  >
                    <MoreHorizIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
              <div className="postSingle__body">
                <div className="postSingle__text">
                  <span>{data?.getPost.body}</span>
                </div>
                <Image image={data?.getPost.image} />
                <div className="postSingle__date">
                  <span>{formatDate(data?.getPost?.createdAt)}</span>
                  <span style={{ padding: "0 4px" }}>.</span>
                  <span>Twitter for website</span>
                </div>
                <div className="postSingle__bar">
                  <div className="postSingle__barItem">
                    <div>
                      <Link to="" className="postSingle__barItem--link">
                        <span>{data?.getPost?.commentCount}</span>
                        <span>Comments</span>
                      </Link>
                    </div>
                  </div>
                  <div className="postSingle__barItem">
                    <div>
                      <Link to="" className="postSingle__barItem--link">
                        <span>{data?.getPost?.likeCount}</span>
                        <span>Likes</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="postSingle__footer">
                <div className="postSingle__interactive">
                  <InteractiveBar
                    commentCount={data?.getPost?.commentCount}
                    likeCount={data?.getPost?.likeCount}
                    likeList={data?.getPost.likes}
                    item={data?.getPost}
                    likePost={async () =>
                      await likePost({
                        variables: { id: data!.getPost.id },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="postSingle__listComment">
            {data?.getPost.comments.map((cm, i) => (
              <Comment key={i} {...cm} postId={data.getPost.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
