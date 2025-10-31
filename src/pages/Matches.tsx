import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import { motion, MotionValue, motionValue, useMotionValue, useTransform } from 'framer-motion';

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";
import { getMatchList } from "../services/api";
import MatchCard from "../components/people/MatchCard";

type Props = {
    style?: React.CSSProperties,
}

export default function Matches(props: Props) {
    const [matches, setMatches] = useState<any>([]);
    const [cursor, setCursor] = useState<string | null>(null);

    const init = async () => {
        try {
            const result = await getMatchList();
            setMatches(result.docs);
        } catch (e) {
            console.error('Failed API call: ',e);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.matchesCard}>
                        {matches.length === 0 ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text variant="heading">
                                    Working on your potential matches... Hang tight!
                                </Text>
                            </div>
                        ) : (
                            matches?.map((m: any, idx: number) => (
                                <div
                                    key={idx}
                                    style={styles.userCard}
                                >
                                    <MatchCard
                                        matches={m}
                                    />
                                </div>
                            ))
                        )}
                    </Container>
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
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    caption: {
        border: '1px solid red',
        margin: 0,
        color: colors.surface,
    },
    matchesCard: {
        width: '80%',
        height: '80%',
        display: 'flex',
        overflowY: 'auto',
    },
    userCard: {
        cursor: 'pointer',
    }
}