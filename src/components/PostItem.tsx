import { Avatar, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import moment from "moment";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  PostSnippetFragment,
  useLikeMutation,
  useLikePostInGroupMutation,
} from "../generated/graphql";
import { UserContext } from "../utils/useAuth";
import styled from "styled-components";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Image } from "./Image";
import { InteractiveBar } from "./InteractiveBar";
interface PostProps {
  groupName?: string;
  groupId?: string;
  post: PostSnippetFragment;
}

export const PostItem: React.FC<PostProps> = (props) => {
  const router = useHistory();
  const [likePost] = useLikeMutation();
  const [likePostInGroup] = useLikePostInGroupMutation();
  const { openMore } = useContext(UserContext);
  const { groupName, groupId } = props;

  return (
    <>
      <div
        className="post"
        onClick={() =>
          router.replace(
            !groupId
              ? `/posts/${props.post.id}`
              : `/postgroup/${groupId}&post=${props.post.id}`
          )
        }
      >
        <Link
          to={`/users/${props.post.username}`}
          className="post__avatar"
          onClick={(e) => e.stopPropagation()}
        >
          <Avatar src={props.post.avatar || ""} />
        </Link>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                <Link
                  to={`/users/${props.post.username}`}
                  className="link link--none"
                  onClick={(e) => e.stopPropagation()}
                >
                  {groupName ? (
                    <Name>
                      {props.post.displayname}
                      <span
                        style={{
                          display: "inline-block",
                          verticalAlign: "-0.25em",
                        }}
                      >
                        <Icon />
                      </span>
                      {groupName}
                    </Name>
                  ) : (
                    props.post.displayname
                  )}
                  <span className="post__headerSpecial">
                    {props.post.verified && (
                      <VerifiedUserIcon className="post__badge" />
                    )}
                    @{props.post.username}
                  </span>
                </Link>
                <time className="post__time">
                  {moment(props.post.createdAt).format("l")}
                </time>
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
              <p>{props.post.body}</p>
            </div>
          </div>
          {props?.post.image?.length ? (
            <Image image={props.post.image} />
          ) : null}
          <div className="post__footer">
            <InteractiveBar
              groupId={groupId}
              commentCount={props.post.commentCount}
              likeCount={props.post.likeCount}
              likeList={props.post.likes}
              item={props}
              likePost={async () =>
                !groupId
                  ? await likePost({
                      variables: { id: props.post.id },
                    })
                  : await likePostInGroup({
                      variables: {
                        postId: props.post.id,
                        groupId: groupId,
                      },
                      update: (cache) => {
                        cache.evict({ id: "Group:" + groupId });
                      },
                    })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Name = styled.span`
  display: block;
`;

const Icon = styled(PlayArrowIcon)`
  width: 16px;
  height: 16px;
  color: #606770;
`;
