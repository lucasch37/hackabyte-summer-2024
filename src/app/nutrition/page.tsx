"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Wheat } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";
import {
    MinChatUiProvider,
    Message,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader,
} from "@minchat/react-chat-ui";
import { createCompletion } from "@/lib/actions/createCompletion";

type Props = {};

const page = (props: Props) => {
    const [msgs, setMsgs] = React.useState([
        {
            text: "Hello, I'm Ronnie! How may I help you with your nutrition today?",
            user: {
                id: "ronnie",
                name: "Ronnie"
            },
        },
    ]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-row justify-between py-6 px-6 font-medium">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center">
                        <p className="text-4xl">
                            Nutrition?
                            <span className="font-black"> Just ask!</span>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 -mb-4">
                    <Wheat
                        size={30}
                        className="text-[#f3f3f1]"
                        fill="#f3f3f1"
                        strokeWidth={1}
                    />
                    <Wheat
                        size={50}
                        className="text-[#f3f3f1] col-span-4"
                        fill="#f3f3f1"
                        strokeWidth={1}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1 p-2 gap-3 min-h-0 justify-center">
                <div className="flex-grow flex justify-center w-full items-center">
                    {!isLoading ? (<MainContainer style={{ flex: "1 1 0%", width: "100%" }} >
                        <MessageContainer>
                            <MessageList
                                currentUserId="user"
                                messages={msgs}
                            />
                            <MessageInput
                                placeholder="Type message here"
                                onSendMessage={async (msg) => {
                                    setMsgs([
                                        ...msgs,
                                        {
                                            text: msg,
                                            user: {
                                                id: "user",
                                                name: "You"
                                            },
                                        },
                                    ]);
                                    const text = await createCompletion(msg);
                                    setMsgs([
                                        ...msgs,
                                        {
                                            text: msg,
                                            user: {
                                                id: "user",
                                                name: "You"
                                            },
                                        },
                                        {
                                            text: text,
                                            user: {
                                                id: "ronnie",
                                                name: "Ronnie"
                                            },
                                        },
                                    ]);
                                }}
                                showSendButton
                                showAttachButton={false}
                            />
                        </MessageContainer>
                    </MainContainer>
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;
