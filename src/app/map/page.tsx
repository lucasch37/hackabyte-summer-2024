"use client";

import { useGeolocation } from "@uidotdev/usehooks";
import { ThreeDots } from "react-loader-spinner";
import { AdvancedMarker, APIProvider, Map, Marker, Pin } from "@vis.gl/react-google-maps";
import { Earth, MapIcon, Star } from "lucide-react";
import React from "react";

type Props = {};

const App = (props: Props) => {
    const location = useGeolocation();

    if (location.loading) {
        return (<div className="flex flex-col flex-1 justify-center items-center">
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
        </div>)
    }

    if (location.error) {
        return <p className="flex flex-col flex-1 justify-center items-center">Enable permissions to access your location data</p>;
    }

    return (
        <div className="flex flex-col flex-1">
            <APIProvider apiKey={"AIzaSyC1WsyCrqz8L7g7mAi2S-6qAqFpHc7myLo"} >
                <Map
                    style={{ width: '100vw', height: '80vh' }}
                    defaultCenter={{ lat: location.latitude!, lng: location.longitude! }}
                    defaultZoom={19.5}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId="map"
                >
                    <Marker position={{ lat: location.latitude!, lng: location.longitude! }} />
                    <AdvancedMarker position={{ lat: 47.6517222222, lng: -122.140861111 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 47.65225, lng: -122.14275 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 47.6532222222, lng: -122.142888889 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 47.6534722222, lng: -47.6534722222 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 47.6534444444, lng: -122.142638889 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 47.6528333333, lng: -122.141777778 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                    <AdvancedMarker position={{ lat: 47.6534444444, lng: -122.141222222 }}>
                        <Star fill="yellow" />
                    </AdvancedMarker>
                </Map>
            </APIProvider >
        </div>
    )
};
//47.6530992 -122.1425876
export default App;
