import React, { useEffect, useState } from 'react'

const Video = ({ url }) => {

    const [embed, setEmbed] = useState(false);

    useEffect(async () => {
        setEmbed(youtubeParser(url));
    }, []);

    return (
        <>
            {embed &&
                <div className="mx-0 my-4 md:mx-24">
                    <div className="embed-responsive responsive-16by9">
                        <iframe src={embed} title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            }
        </>
    )
}

export default Video

const youtubeParser = (url) => {
    console.log(url)
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    console.log(match)
    return (match && match[7].length == 11) ? 'https://www.youtube.com/embed/' + match[7] : false
}

