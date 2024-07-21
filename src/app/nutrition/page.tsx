"use client";

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { Wheat } from "lucide-react";
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
    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex flex-row justify-between py-6 px-6 font-medium">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center">
                        <p className="text-4xl">
                            Nutrition?
                            <span className="font-black"> Just ask!</span>
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <Wheat
                        size={30}
                        className="text-[#f3f3f1]"
                        fill="#f3f3f1"
                        strokeWidth={1}
                    />
                    <Wheat
                        size={80}
                        className="text-[#f3f3f1] col-span-4"
                        fill="#f3f3f1"
                        strokeWidth={1}
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1 p-2 gap-3 min-h-0">
                <MainContainer style={{ height: "58vh" }}>
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
            </div>
        </div>
    );
};

export default page;
