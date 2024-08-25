"use client";
import { useEffect, useRef, useState } from "react";

export const EventCard = ({ event }) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [daysLeft, setDaysLeft] = useState(null);
    const descriptionRef = useRef(null);

    // Use effect to detect if the description overflows
    useEffect(() => {
        if (descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight) {
            setShowReadMore(true);
        }
    }, []);

    // Function to format date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const dayName = date.toLocaleString("default", { weekday: "long" });
        return { day, month, year, dayName };
    };

    // Calculate days left until the event
    const calculateDaysLeft = (eventDateStr) => {
        const eventDate = new Date(eventDateStr);
        const today = new Date();
        const timeDifference = eventDate.getTime() - today.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysDifference > 0 ? daysDifference : 0; // If the event date is in the past, return 0
    };

    useEffect(() => {
        const days = calculateDaysLeft(event.date);
        setDaysLeft(days);
    }, [event.date]);

    const { day, month, year, dayName } = formatDate(event.date);

    return (
        <div className="shadow-lg border rounded-lg p-4 bg-gray-100">
            <h1 className="text-3xl font-bold">{day}</h1>
            <p>{`${month}, ${year} - ${dayName}`}</p>
            
            {/* Display days left */}
            <p className="text-red-500 font-semibold">
                {daysLeft} {daysLeft === 1 ? "day" : "days"} left
            </p>

            <div className="mt-5">
                <h3 className="text-xl font-semibold pb-2 border-b mb-3">
                    {event.title}
                </h3>
                <p
                    ref={descriptionRef}
                    className={`overflow-hidden text-ellipsis ${isReadMore ? "line-clamp-none" : "line-clamp-2"}`}
                >
                    {event.description}
                </p>
                {showReadMore && (
                    <button
                        onClick={() => setIsReadMore(!isReadMore)}
                        className="text-blue-500 mt-2"
                    >
                        {isReadMore ? "Show less" : "Read more"}
                    </button>
                )}
            </div>
        </div>
    );
};
