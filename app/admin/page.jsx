"use client";
import { faCalendarAlt, faChalkboardTeacher, faSpinner, faUsersBetweenLines, faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';  // Import calendar styles

export default function Admin() {

    const [summaryData, setSummaryData] = useState({});
    const [summaryLoading, setSummaryLoading] = useState(false);

    const [eventsData, setEventsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(new Date()); // For calendar selection

    // Display event title on the calendar tile
    const tileContent = ({ date, view }) => {
        if (eventsData.length === 0) {
            // No events data loaded yet, return nothing
            return null;
        }

        const event = eventsData.find(event => new Date(event.eventDate).toDateString() === date.toDateString());
    
        if (view === 'month' && event) {
            return (
                <div className="bg-blue-600 text-white text-xs p-2 rounded">
                    <span>{event.title}</span>
                </div>
            );
        }
        return null;  // Return null if no event is found for the tile
    };

    useEffect(() => {
        const getSummaryData = async () => {
            setSummaryLoading(true);
            try {
                const response = await fetch(`/api/summary/admin`);
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
                setSummaryData(responseData);
            } catch (e) {
                console.log(e);
            } finally {
                setSummaryLoading(false);
            }
        };

        const getEventsData = async () => {
            setLoading(true);  // Use `setLoading` instead of `setSummaryLoading`
            try {
                const response = await fetch(`/api/calendar/term/events`);
                const responseData = await response.json();
                if (!response.ok) {
                    toast.error(responseData.message);
                    return;
                }
                setEventsData(responseData);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);  // Use `setLoading` instead of `setSummaryLoading`
            }
        };

        getSummaryData();
        getEventsData();
    }, []);

    return (
        <div className="">
            <div>
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                <p className="flex gap-1.5 text-sm">
                    <span>Home</span>
                    <span>{'>'}</span>
                    <span className="text-blue-600">Admin</span>
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="bg-blue-600 text-white flex items-center justify-between p-4 rounded-md shadow-md">
                    <FontAwesomeIcon icon={faUsersLine} className="text-4xl" width={30} height={30} />
                    <div className="flex flex-col items-end justify-between mt-2">
                        <p>Total Students</p>
                        <span>{summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summaryData.studentCount}</span>
                    </div>
                </div>

                <div className="bg-teal-600 text-white flex items-center justify-between p-4 rounded-md shadow-md">
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="text-2xl" width={30} height={30} />
                    <div className="flex flex-col items-end justify-between mt-2">
                        <p>Total Teachers</p>
                        <span>{summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summaryData.teacherCount}</span>
                    </div>
                </div>

                <div className="bg-green-600 text-white flex justify-between items-center p-4 rounded-md shadow-md">
                    <FontAwesomeIcon icon={faUsersBetweenLines} className="text-2xl" width={30} height={30} />
                    <div className="flex flex-col items-end justify-between mt-2">
                        <p>Parents</p>
                        <span>{summaryLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : summaryData.parentCount}</span>
                    </div>
                </div>
            </div>

            {/* Calendar */}
            <div className="mt-5 calendar-container">
                <Calendar
                    value={value}
                    onChange={setValue}
                    tileContent={tileContent}  // Mark attendance and events on the calendar
                    className="full-width-calendar"
                />
            </div>

        </div>
    );
}
