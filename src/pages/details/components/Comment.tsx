import { Avatar } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

interface CommentProps {
    username?:string,
    body?:string,
    createdAt?: string,
}

export const Comment: React.FC<CommentProps> = ({username,body}) => {
        return (
            <div className="comment__wrap">
                <div className="comment__box">
                    <div className="comment__box--left">
                        <Avatar src=""/>
                    </div>
                    <div className="comment__box--right">
                        <div className="comment__box--name">
                            <div className="name">
                                <Link to="">
                                    <div className="fullname">Lasse Angantyr</div>
                                    <div className="username">@{username}</div>
                                </Link>
                                <span className="dot">.</span>
                                <span className="day">
                                    Mar 25
                                </span>
                            </div>
                            <div className="more">
                                <MoreHorizIcon/>
                            </div>
                        </div>
                        <div className="comment__box--content">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        );
}