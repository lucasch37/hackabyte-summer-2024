"use client";

import { ChallengeType } from "@/lib/challenges";
import { ChevronRight } from "lucide-react";
import { useGeolocation } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { challenge_dist } from "@/lib/utils";
import React from "react";

type Props = {
    challenge: ChallengeType;
};

const Challenge = ({ challenge }: Props) => {
    const router = useRouter();
    const location = useGeolocation({ enableHighAccuracy: true });
    const distance = challenge_dist(challenge, location);

    return (
        <div
            className="flex flex-row rounded-xl border border-slate-300 shadow-md"
            onClick={() => {
                router.push(`/map/${challenge.id}`);
            }}
        >
            <div
                className={`flex rounded-l-xl ${challenge.difficulty < 3
                        ? "bg-green-600"
                        : challenge.difficulty < 5
                            ? "bg-orange-600"
                            : "bg-red-600"
                    } bg-green-600 justify-center items-center py-3 px-4 font-semibold text-white`}
            >
                {challenge.difficulty}
            </div>
            <div className="flex flex-row w-full justify-between items-center pr-2 rounded-r-xl group hover:bg-blue-100 transition duration-150 ease-in-out">
                <div className="flex flex-col flex-1 rounded-r-xl p-4">
                    <p className="group-hover:text-blue-600">
                        <span className="font-bold">Distance:</span>{" "}
                        {location.error || location.loading
                            ? "?"
                            : (distance / 0.0145).toFixed(1)}{" "}
                        mi
                    </p>
                    <p className="group-hover:text-blue-600">
                        <span className="font-bold">Time:</span>{" "}
                        {Number(((distance / 0.0145) * 20).toFixed(0))} minutes
                    </p>
                </div>
                <ChevronRight
                    className="group-hover:text-blue-600"
                    size={36}
                    absoluteStrokeWidth={true}
                />
            </div>
        </div>
    );
};

export default Challenge;
