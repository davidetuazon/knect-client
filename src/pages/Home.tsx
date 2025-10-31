import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import { discover, like, me, skip } from '../services/api';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { toast } from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../utils/constants";
import { ConnectSocket } from "../services/socket";

import SideNavBar from "../components/navigation/SideNavBar";
import UserCard from "../components/people/UserCard";
import Instructions from "../components/people/Instructions";

export default function Home() {
    const { setUser } = useAuth();
    const [people, setPeople] = useState<any[]>([]);
    const [currIdx, setCurrIdx] = useState(0);
    const [cursor, setCursor] = useState<string | null>(null);

    const x = useMotionValue(0);
    const opacity = useTransform(x, [-250, 0, 250], [0.4, 1, 0.4]);
    const rotate = useTransform(x, [-250, 250], [-18, 18]);

    const handleDragEnd = () => {
        const xValue = x.get();
    
        if (Math.abs(xValue) > 125) {
            const dir = xValue > 0 ? 'right' : 'left';
            handleSwipe(dir, people[currIdx]);
        }
    }

    const init = async () => {
        try {
            const result = await discover();
            setPeople(prev => [...prev, ...result.users]);

            const res = await me();
            setUser(res);
        } catch (e) {
            console.error('Failed API call: ', e);
        }
    }

    const handleSwipe = async (dir: "left" | "right", person: any) => {
        if (!person) return;
        
        try {
            if (dir === 'right') {
                const result = await like(person._id);
                
                if (result.matched) {
                    toast.success(
                        `It's a match with ${person.fullName}!`, {
                            duration: 1250,
                            style: {
                                backgroundColor: colors.primary,
                                color: colors.background,
                            },
                    });
                } else {
                    toast( `You've sent a like to ${person.fullName}.`, {
                        duration: 1000,
                        style: {
                                backgroundColor: colors.secondary,
                                color: colors.background,
                            },
                    });
                    
                }
            } else {
                await skip(person._id);
                toast( `You've skipped on ${person.fullName}.`, {
                    duration: 1000,
                    style: {
                            backgroundColor: colors.accent,
                            color: colors.background,
                        },
                });
            }
        } catch (e) {
            toast.error('Failed to perform action. Please try again.');
            console.error('Failed API call: ', e);
        } finally {
            setCurrIdx(prev => prev + 1);
        }
    };

    const person = people[currIdx];

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        if(people.length <= 5) {
            init();
        }
    }, [people.length]);

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <motion.div
                        style={{
                            cursor: cursor === null ? 'grab' : 'grabbing',
                            x,
                            opacity,
                            rotate,
                        }}
                        drag='x'
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        onDragEnd={handleDragEnd}
                        onMouseDown={() => setCursor('grabbing')}
                        onMouseUp={() => setCursor(null)}
                        onMouseLeave={() => setCursor(null)}
                    >
                        <UserCard person={person} />
                    </motion.div>
                    <Instructions />
                </div>
            </div>
        </div>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
    },
    body: {
        // border: '1px solid red',
        display: 'flex',
        flex: 1,
        width: 'inherit',
        height: 'inherit',
        flexDirection: 'row',
        backgroundColor: colors.primaryLight,

    },
    sidebar: {
        backgroundColor: colors.background,
        width: '20%',
        minWidth: '150px',
        zIndex: 10,
        padding: '0px 20px'
    },
    maincard: {
        padding: '40px 0px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}