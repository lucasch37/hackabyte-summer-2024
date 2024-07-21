"use client";

import { useGeolocation } from "@uidotdev/usehooks";
import { ThreeDots } from "react-loader-spinner";
import {
    AdvancedMarker,
    APIProvider,
    Map,
    Marker,
    Pin,
} from "@vis.gl/react-google-maps";
import {
    Earth,
    LoaderCircle,
    LoaderPinwheel,
    MapIcon,
    Star,
    User,
} from "lucide-react";
import React from "react";
import { ChallengeType } from "@/lib/challenges";
import { Button } from "./ui/button";
import { addPoints } from "@/lib/actions/addPoints";
import { deleteChallenge } from "@/lib/actions/deleteChallenge";
import { dl } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

type Props = {
    challenges: ChallengeType[];
    Id: string | null;
};

const GoogleMap = ({ challenges, Id }: Props) => {
    const { toast } = useToast()
    const location = useGeolocation({ enableHighAccuracy: true });
    const [loading, setLoading] = React.useState(false);

    if (location.loading) {
        return (
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="gray"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        );
    }

    if (location.error) {
        return (
            <p className="flex justify-center items-center">
                Enable permissions to access your location data
            </p>
        );
    }

    let selectedChallenge = null;

    if (Id !== null) {
        for (let i = 0; i < challenges.length; i++) {
            if (challenges[i].id === Id) {
                selectedChallenge = challenges[i];
                break;
            }
        }
    }

    return (
        <>
            <APIProvider apiKey={"AIzaSyC1WsyCrqz8L7g7mAi2S-6qAqFpHc7myLo"}>
                <Map
                    style={{
                        maxWidth: "100vh",
                        height: "68vh",
                        overflowX: "hidden",
                        overflowY: "hidden",
                    }}
                    defaultCenter={{
                        lat:
                            selectedChallenge !== null
                                ? selectedChallenge?.latitude!
                                : location.latitude!,
                        lng:
                            selectedChallenge !== null
                                ? selectedChallenge?.longitude!
                                : location.longitude!,
                    }}
                    defaultZoom={19.5}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                    mapId="map"
                >
                    <AdvancedMarker
                        position={{
                            lat: location.latitude!,
                            lng: location.longitude!,
                        }}
                    >
                        <Pin
                            background={"#2563eb"}
                            glyphColor={"#000"}
                            borderColor={"#000"}
                        />
                    </AdvancedMarker>
                    {challenges.map((challenge, i) => (
                        <AdvancedMarker
                            position={{
                                lat: challenge.latitude,
                                lng: challenge.longitude,
                            }}
                            key={i}
                        >
                            <Star fill="yellow" />
                        </AdvancedMarker>
                    ))}
                </Map>
            </APIProvider>
            {challenges.map((challenge, i) => {
                const distance = Math.sqrt(
                    Math.pow(location.latitude! - challenge.latitude!, 2) +
                    Math.pow(location.longitude! - challenge.longitude, 2)
                );
                if (distance < 0.0001) {
                    const d = dl(challenge.difficulty);
                    return (
                        <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-[90vw] flex flex-col gap-2 items-center shadow-2xl ${d === 0
                                ? "easy-border"
                                : d === 1
                                    ? "medium-border"
                                    : "hard-border"
                                }`}
                            key={i}
                        >
                            <div
                                className={`flex bg-gradient-to-r w-full p-3 rounded-t-lg items-center justify-center text-white font-semibold text-2xl border-b-2 ${d === 0
                                    ? "easy-panel"
                                    : d === 1
                                        ? "medium-panel"
                                        : "hard-panel"
                                    }`}
                            >
                                {d === 0 ? "Easy" : d === 1 ? "Medium" : "Hard"} Challenge
                            </div>
                            {/* <div className="flex flex-row pb-2 items-center">
                                <h1 className="font-semibold text-2xl">
                                    {challenge.name}
                                </h1>
                            </div> */}
                            <video
                                controls
                                preload="none"
                                className="max-h-[300px]"
                                autoPlay
                            >
                                <source
                                    src={`/${challenge.id}.mp4?url`}
                                    type="video/mp4"
                                />
                            </video>{" "}
                            <div className="gap-1 flex items-start w-full">
                                <button
                                    className={`w-full py-2 rounded-b-xl border-t-2 ${d === 0
                                        ? "easy-button"
                                        : d === 1
                                            ? "medium-button"
                                            : "hard-button"
                                        } transition duration-150 ease-in-out ${loading
                                            ? "opacity-50 cursor-not-allowed flex items-center gap-2 justify-center"
                                            : ""
                                        }`}
                                    onClick={async () => {
                                        setLoading(true);
                                        await addPoints(challenge.difficulty);
                                        await deleteChallenge(challenge.id);
                                        setLoading(false);
                                        toast({
                                            title: "Congrats!",
                                            description: `You earned ${challenge.difficulty} FitPoints!`,
                                        })
                                    }}
                                >
                                    I'm finished!
                                    {loading && (
                                        <LoaderCircle className="animate-spin" />
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                } else return;
            })}
        </>
    );
};
//47.6530992 -122.1425876
export default GoogleMap;
