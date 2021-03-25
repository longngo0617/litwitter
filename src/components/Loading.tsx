import { CircularProgress } from '@material-ui/core'
import React from 'react'

interface LoadingProps {

}

export const Loading: React.FC<LoadingProps> = ({}) => {
        return (
            <CircularProgress className="progess"/>
        );
}