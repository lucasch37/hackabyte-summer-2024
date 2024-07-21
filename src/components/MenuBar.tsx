"use client";

import { House, Map, Trophy, Salad } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {};

const MenuBar = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="flex flex-row h-20 items-center px-4">
            <div
                className="flex flex-col flex-1"
                onClick={() => router.push("/leaderboard")}
            >
                <Trophy
                    className={`${pathname === "/leaderboard" && "text-blue-500"
                        } text-center w-full`}
                    size={30}
                    absoluteStrokeWidth={true}
                />
                <p
                    className={`${pathname === "/leaderboard" && "text-blue-500"
                        } text-xs text-center w-full`}
                >
                    Leaderboard
                </p>
            </div>
            <div
                className="flex flex-col flex-1"
                onClick={() => router.push("/")}
            >
                <House
                    className={`${pathname === "/" && "text-blue-500"
                        } text-center w-full`}
                    size={30}
                    absoluteStrokeWidth={true}
                />
                <p
                    className={`${pathname === "/" && "text-blue-500"
                        } text-xs text-center w-full`}
                >
                    Home
                </p>
            </div>
            <div
                className="flex flex-col flex-1"
                onClick={() => router.push("/map")}
            >
                <Map
                    className={`${pathname === "/map" && "text-blue-500"
                        } text-center w-full`}
                    size={30}
                    absoluteStrokeWidth={true}
                />
                <p
                    className={`${pathname === "/map" && "text-blue-500"
                        } text-xs text-center w-full`}
                >
                    Map
                </p>
            </div>
            <div
                className="flex flex-col flex-1"
                onClick={() => router.push("/nutrition")}
            >
                <Salad
                    className={`${pathname === "/nutrition" && "text-blue-500"
                        } text-center w-full`}
                    size={30}
                    absoluteStrokeWidth={true}
                />
                <p
                    className={`${pathname === "/nutrition" && "text-blue-500"
                        } text-xs text-center w-full`}
                >
                    Nutrition
                </p>
            </div>
        </div>
    );
};

export default MenuBar;
