import React, { useContext } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useLikeMutation, usePostQuery } from "../../../generated/graphql";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Avatar, Box } from "@material-ui/core";
import { Image } from "../../../components/Image";
import { InteractiveBar } from "../../../components/InteractiveBar";
import { Comment } from "./Comment";
import { Loading } from "../../../components/Loading";
import gql from "graphql-tag";
import { UserContext } from "../../../utils/useAuth";

interface DetailsPostProps {}

export const DetailsPost: React.FC<DetailsPostProps> = () => {
  const postID: any = useRouteMatch();
  const router = useHistory();
  const { data, loading } = usePostQuery({
    variables: { id: postID.params.id },
  });
  const [likePost] = useLikeMutation();
  const { user } = useContext(UserContext);
  const formatDate = (date: any) => {
    let d: any = new Date(date);
    d = `${d.getDate()} Tháng ${d.getMonth()} ${d.getFullYear()}`;
    return d;
  };
  
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
                  <Avatar src="" />
                  <div className="name">
                    <span>{data?.getPost.displayname}</span>
                    <span>@{data?.getPost?.username}</span>
                  </div>
                </div>
                <div className="postSingle__header--right">
                  <MoreHorizIcon />
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
                    likePost={async () =>
                      await likePost({
                        variables: { id: data!.getPost.id },
                        update: (cache) => {
                          cache.modify({
                            fields: {
                              likes(existingLikeRefs = [], { readField }) {
                                const newLikeRefs = cache.writeFragment({
                                  data: {
                                    username: user.username,
                                  },
                                  fragment: gql`
                                    fragment NewLike on Like {
                                      username
                                    }
                                  `,
                                });
                                if (
                                  existingLikeRefs.some(
                                    (ref: any) =>
                                      readField("username", ref) ===
                                      user.username
                                  )
                                ) {
                                  return existingLikeRefs;
                                }

                                return [...existingLikeRefs, newLikeRefs];
                              },
                            },
                          });
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="postSingle__listComment">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </div>
        </div>
      )}
    </div>
  );
};
