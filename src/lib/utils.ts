"use client";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useGeolocation } from "@uidotdev/usehooks";
import { ChallengeType } from "./challenges";
import { GeolocationState } from "@uidotdev/usehooks";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function dl(difficulty: number) {
    return difficulty <= 2 ? 0 : difficulty <= 4 ? 1 : 2;
}

export function challenge_dist(
    challenge: ChallengeType,
    location: GeolocationState
) {
    let distance = 0;

    if (!location.loading && !location.error) {
        distance = Math.sqrt(
            Math.pow(location.latitude! - challenge.latitude!, 2) +
            Math.pow(location.longitude! - challenge.longitude, 2)
        );
    }
    return distance;
}

export const mediaUploader = async (files: File[]) => {
    const media = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "preset1");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dotconon/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            media.push(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return media;
};
