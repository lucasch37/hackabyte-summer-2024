import React from "react"
import { Star } from "lucide-react"
import Image from "next/image";

type Props = {}

const page = (props: Props) => {
    return (
        <div className="flex flex-col flex-1 gap-4">
            <div className="flex flex-col gap-8 p-6">
                <p className="text-4xl">
                    The Global
                    <span className="font-black"> Leaderboard</span>
                </p>
                <div className="grid grid-cols-3 items-end">
                    <div className="flex flex-col bg-gray-300 rounded-l-lg h-32 items-center p-3">
                        <div className="flex bg-white rounded-full items-center justify-center w-8 h-8 text-amber-600 font-semibold border-2 border-amber-600">3</div>
                        <p className="font-semibold">Amelia</p>
                        <div className="flex flex-row gap-1 items-center text-amber-600">
                            <Star
                                size={18}
                                absoluteStrokeWidth={true} />
                            <p>124</p>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-200 rounded-t-lg h-48 items-center p-3">
                        <div className="flex bg-white rounded-full items-center justify-center w-8 h-8 text-amber-400 font-semibold border-2 border-amber-400">1</div>
                        <p className="font-semibold">Aakash</p>
                        <div className="flex flex-row gap-1 items-center text-amber-400">
                            <Star
                                size={18}
                                absoluteStrokeWidth={true} />
                            <p>124</p>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-300 rounded-r-lg h-40 items-center p-3">
                        <div className="flex bg-white rounded-full items-center justify-center w-8 h-8 text-slate-400 font-semibold border-2 border-slate-400">2</div>
                        <p className="font-semibold">Lucas</p>
                        <div className="flex flex-row gap-1 items-center text-slate-400">
                            <Star
                                size={18}
                                absoluteStrokeWidth={true} />
                            <p>124</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-4 bg-[#f3f3f1] h-56 overflow-auto">
                <div className="flex bg-slate-700 mx-8 h-[0.5px] my-3" />
                <div className="flex flex-row px-12 justify-between">
                    <p>4</p>
                    <p className="font-semibold">Ronav</p>
                    <div className="flex flex-row gap-1 items-center">
                        <Star
                            size={18}
                            absoluteStrokeWidth={true} />
                        <p>124</p>
                    </div>
                </div>
                <div className="bg-slate-700 mx-8 h-[0.5px] my-3" />
                <div className="flex flex-row px-12 justify-between">
                    <p>5</p>
                    <p className="font-semibold">Aditya</p>
                    <div className="flex flex-row gap-1 items-center">
                        <Star
                            size={18}
                            absoluteStrokeWidth={true} />
                        <p>124</p>
                    </div>
                </div>
                <div className="bg-slate-700 mx-8 h-[0.5px] my-3" />
                <div className="flex flex-row px-12 justify-between">
                    <p>6</p>
                    <p className="font-semibold">Ronav</p>
                    <div className="flex flex-row gap-1 items-center">
                        <Star
                            size={18}
                            absoluteStrokeWidth={true} />
                        <p>124</p>
                    </div>
                </div>
                <div className="bg-slate-700 mx-8 h-[0.5px] my-3" />
                <div className="flex flex-row px-12 justify-between">
                    <p>6</p>
                    <p className="font-semibold">Ronav</p>
                    <div className="flex flex-row gap-1 items-center">
                        <Star
                            size={18}
                            absoluteStrokeWidth={true} />
                        <p>124</p>
                    </div>
                </div>
                <div className="bg-slate-700 mx-8 h-[0.5px] my-3" />
                <div className="flex flex-row px-12 justify-between">
                    <p>6</p>
                    <p className="font-semibold">Ronavs</p>
                    <div className="flex flex-row gap-1 items-center">
                        <Star
                            size={18}
                            absoluteStrokeWidth={true} />
                        <p>124</p>
                    </div>
                </div>
                <div className="bg-slate-700 mx-8 h-[0.5px] my-3" />
                <div className="flex flex-row px-12 justify-between">
                    <p>6</p>
                    <p className="font-semibold">Ronavs</p>
                    <div className="flex flex-row gap-1 items-center">
                        <Star
                            size={18}
                            absoluteStrokeWidth={true} />
                        <p>124</p>
                    </div>
                </div>
                <div className="bg-slate-700 mx-8 h-[0.5px] my-3" />
            </div>
        </div>
    )
}

export default page;