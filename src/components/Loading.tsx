import { CircularProgress } from '@material-ui/core'
import React from 'react'

interface LoadingProps {
    blue?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({blue}) => {
        return (
            <CircularProgress className={`progress ${blue ? "blue": ""}`} />
        );
}