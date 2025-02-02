import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import {useQuery} from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function RelatedVideos({channelId}) {
    const {youtube} = useYoutubeApi();
    const { isLoading, error, data: videos } = useQuery({queryKey:['related', channelId], queryFn:()=>youtube.relatedVideos(channelId)});
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong </p>}
            {console.log(error)}
                  
            {videos &&( 
                <ul>
                    {videos.map(video=> <VideoCard key={video.id} video={video} type='list'/>)}
                </ul>)}
        </>
    );
}

