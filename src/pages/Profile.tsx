import React from "react";
import colors from "../constants/colors";
import { useAuth } from "../providers/AuthProvider";

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.profileSettings}>
                        <Text
                            variant="heading"
                        >
                            {user?.fullName}
                        </Text>
                    </Container>
                </div>
            </div>
        </div>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        overflowY: 'auto',
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
        border: '1px solid black',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSettings: {
        width: '80%',
        height: '80%',
    },
}