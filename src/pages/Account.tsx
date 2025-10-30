import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import { useAuth } from "../providers/AuthProvider";
import { useForm, SubmitHandler } from "react-hook-form";

import SideNavBar from "../components/navigation/SideNavBar";
import Container from "../components/commons/Container";
import Text from "../components/commons/Text";
import ProfileInfoForm from "../components/account/ProfileInfoForm";
import ProfilePhotoForm from "../components/account/ProfilePhotoForm";

type Inputs = {
    fullName: string,
    age: string,
    bio: string,
}

export default function Account() {
    const { user, setUser } = useAuth();
    const [preview, setPreview] = useState<string | null>(null);
    const { register, handleSubmit, watch, trigger, reset, formState: { errors, isDirty }} = useForm<Inputs>({
        defaultValues: {
            fullName: user?.fullName,
            age: user?.age,
            bio: user?.bio
        }
    });
    const bio = watch('bio', '');
    
    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const payload: {
            fullName: string,
            age: string,
            bio: string,
        } = {
            fullName: data.fullName,
            age: data.age,
            bio: data.bio,
        };
    }

    useEffect(() => {
        if (user) {
            reset({
                fullName: user?.fullName,
                age: user?.age,
                bio: user?.bio
            });
        }
    }, [user, reset]);

    return (
        <div style={styles.root}>
            <div style={styles.body}>
                <div style={styles.sidebar}>
                    <SideNavBar />
                </div>
                <div style={styles.maincard}>
                    <Container style={styles.profileSettings}>
                        <div style={styles.header}>
                            <Text
                                variant="heading"
                                style={{ marginTop: 0, }}
                            >
                                Public Profile
                            </Text>
                        </div>
                        <div style={styles.form}>
                            <div style={{ width: '50%', minWidth: '300px' }}>
                                <ProfilePhotoForm user={user} setUser={setUser} />
                            </div>
                            <div style={{ width: '100%', minWidth: '350px', borderLeft: `3px solid ${colors.darkBorder}` }}>
                                <ProfileInfoForm user={user} setUser={setUser} />
                            </div>
                        </div>
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
        overflowX: 'auto',
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
    profileSettings: {
        width: '80%',
        minWidth: '700px',
        height: '80%',
        border: `3px solid ${colors.background}`,
        padding: 20,
    },
    header: {
        // border: '1px solid red',
        textAlign: 'left',
    },
    form: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
    }
}