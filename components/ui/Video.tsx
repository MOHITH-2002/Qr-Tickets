"use client";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

interface VideoProps {
    url: string;
    className?: string;
}

export default function Video({ url, className }: VideoProps) {
    const [pause, setPause] = useState<boolean>(false);
    const [mute, setMute] = useState<boolean>(false);

    const handlePlayback = () => setPause((prev) => !prev);
    const handleVolume = () => setMute((prev) => !prev);

    return (
        <div
            className={`${className} relative z-0 w-full h-[250px] md:h-[600px] lg:h-full`}
        >
            <ReactPlayer
                volume={0} // Always muted
                height="100%"
                width="100%"
                url={url}
                playing
                loop
                muted // Ensure the video is muted
            />
        </div>
    );
}
