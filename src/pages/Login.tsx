import React, { useCallback, useState } from "react";
import { mustBeValidEmail, mustNotBeEmptyOrSpace } from "../utils/validators";
import { useForm, SubmitHandler } from 'react-hook-form';
import { throttle } from "lodash";
import { login } from "../services/api";
import { ACCESS_TOKEN } from "../utils/constants";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import colors from "../constants/colors";
import { toast } from "react-hot-toast";

import Button from "../components/commons/Button";
import Text from "../components/commons/Text";
import TextInput from "../components/commons/TextInputs";
import Container from "../components/commons/Container";
import { useMediaQuery } from "react-responsive";

type Inputs = {
    email: string,
    password: string,
}

export default function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<Inputs>();
    const [registrationError, setRegistrationError] = useState<string>('');
    const navigate = useNavigate();
    const isBigScreen = useMediaQuery({ minWidth: 769 });

    const onSubmit: SubmitHandler<Inputs> = useCallback(throttle(async (data: Inputs) => {
        await toast.promise(
            login(data.email, data.password)
            .then((response) => {
                Cookies.set(ACCESS_TOKEN, response.accessToken);
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 500);
            }), {
                loading: 'Logging in...',
                success: 'welcome back!',
                error: (e) => {
                    const status = e?.response?.status;
                    switch (status) {
                        case 400:
                            return 'Email or password is incorrect';
                        default:
                            return 'Uknown error occured, please try again';
                    }
                }
            }
        )
    }, 2000, { trailing: true }), []);
    
    return (
        <div style={isBigScreen ? styles.root : styles.rootSmallScreen}>
            <div style={styles.greeting}>
                <Text variant="heading"
                    style={styles.appName}
                    textStyle={{
                        fontSize: 'clamp(3.05rem, 3.5vw, 3.35rem)'
                    }}
                >
                    Knect
                </Text>
                <div style={styles.tagline}>
                    <Text variant="heading"
                    style={styles.catchPhrase}
                >
                    Your next connection is just a swipe away.
                </Text>
                <Text variant="heading"
                    style={styles.catchPhrase}
                >
                    Connect. Match. Knect.
                </Text>
                </div>
            </div>
            <Container 
                style={styles.container}
            >
                <div style={styles.inputs}>
                    <form style={styles.form}>

                        { registrationError && (
                        <Text
                            variant="subtitle"
                            style={{
                            textAlign: 'center',
                            color: 'red'
                            }}
                        >
                            {registrationError}
                        </Text>
                        )}

                        <TextInput
                        style={styles.fields}
                        textProps={{
                            type: "email",
                            placeholder: "email",
                            ...register("email", {
                                validate: {
                                    mustNotBeEmptyOrSpace,
                                    mustBeValidEmail
                                }
                            })
                        }}
                        error = {errors.email?.message}
                        />

                        <TextInput
                            style={styles.fields}
                            textProps={{
                                type: "password",
                                placeholder: "password",
                                ...register("password", {
                                    validate: {
                                        mustNotBeEmptyOrSpace,
                                    }
                                })
                            }}
                            error = {errors.password?.message}
                        />

                        <div style={styles.buttons}>
                            <Button
                                style={{ padding: '20px 10px' }}
                                title="Login"
                                onButtonPress={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                />
                            <Button
                            style={{ backgroundColor: colors.secondary, padding: '20px 10px' }}
                            title="Register"
                            onButtonPress={() => navigate('/register')}
                            disabled={isSubmitting}
                            />
                        </div>

                    </form>
                </div>
            </Container>
        </div>
    );
};


const styles: {[key: string]: React.CSSProperties} = {
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        gap: 10,
    },
    rootSmallScreen: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        gap: 10,
    },
    container: {
        minWidth: '200px',
        overflowY: 'auto',
        margin: 20,
        padding: 30,
        border: `2px solid ${colors.darkBorder}`,
    },
    buttons: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    inputs: {
        // border: '1px solid red',
        margin: 10,
    },
    fields: {
        marginTop: 40,
    },
    greeting: {
        // border: '1px solid red',
        padding: 20,
    },
    appName: {
        color: colors.primary,
        margin: '10px 0px',
        padding: 0,
        textAlign: 'start'
    },
    tagline: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    catchPhrase: {
        color: colors.secondary,
        margin: 0,
    }
}