import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import typography from "../../constants/typography";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import Text from "../commons/Text";
import TextInput from "../commons/TextInputs";
import { mustNotBeEmptyOrSpace } from "../../utils/validators";
import { updateProfile } from "../../services/api";

type Props = {
    style?: React.CSSProperties,
    user: any,
    setUser: React.Dispatch<React.SetStateAction<any>>,
}

type Inputs = {
    fullName: string,
    age: string,
    bio: string,
}

export default function ProfileInfoForm({ user, setUser, style }: Props) {
    const { register, handleSubmit, watch, trigger, reset, formState: { errors, isDirty, isSubmitting }} = useForm<Inputs>({
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
        
        try {
            const result = await updateProfile(payload);
            setUser(result.user);
            reset();
            toast.success('Profile updated');
        } catch(e: any) {
            toast.error(e.message);
            console.error('Failed API call ', e);
        }
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
        <form style={Object.assign({}, styles.formWrapper, style)}>
            <div
                style={{
                    ...styles.form,
                    width: '100%',
                }}
            >
                <Text
                    variant="heading"
                    style={styles.text}
                >
                    Full name
                </Text>
                <TextInput
                    style={styles.fields}
                    textProps={{
                        ...register('fullName', {
                            validate: {
                                mustNotBeEmptyOrSpace,
                            }
                        })
                    }}
                    error = {errors.fullName?.message}
                />
                <Text
                    variant="heading"
                    style={styles.text}
                >
                    Age
                </Text>
                <TextInput
                    style={styles.fields}
                    textProps={{
                        ...register("age", {
                            validate: {
                                mustBeANumber: (val: string) =>
                                    !isNaN(Number(val)) || "Age must be a number",
                                minAge: (val: string) =>
                                    Number(val) >= 18 || 'You must be at least 18 years old',
                                maxAge: (val: string) =>
                                    Number(val)<= 99 || 'Age must be under 100. No elves allowed unless you are Frieren.'
                            },
                        }),
                    }}
                    error = {errors.age?.message}
                />
                <Text
                    variant="heading"
                    style={styles.text}
                >
                    Bio
                </Text>
                <TextInput
                    style={{
                        ...styles.fields
                    }}
                    textProps={{
                        placeholder: 'No bio yet',
                        ...register('bio'),
                        onChange: (e) => {
                            register('bio').onChange(e);
                            trigger('bio')
                        },
                        maxLength: 150,
                    }}
                    error = {errors.bio?.message}
                />
                <p style={styles.p}>
                    {bio.length} / 150 Characters
                </p>
                <div
                    style={styles.footer}
                >
                    <div
                        style={{
                            ...styles.submitButton,
                            opacity: !isDirty || isSubmitting ? 0.5 : 1,
                            pointerEvents: !isDirty || isSubmitting ? 'none' : 'auto',
                            cursor: !isDirty || isSubmitting ? 'not-allowed' : 'pointer',
                        }}
                        onClick={!isDirty || isSubmitting ? undefined : handleSubmit(onSubmit)}
                    >
                        <Text variant="caption" style={{ margin: 0 }}>
                            Save Changes
                        </Text>
                    </div>
                </div>
            </div>
        </form>
    )
}

const styles: {[key: string]: React.CSSProperties} = {
    formWrapper: {
        // border: '1px solid red',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        padding: 20,
    },
    form: {
        // border: '1px solid red',
        width: '60%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    },
    text: {
        // border: '1px solid red',
        margin: '15px 0px'
    },
    fields: {
        borderRadius: '8px',
        height: 35,
    },
    p: {
        // border: '1px solid red',
        marginTop: 5,
        paddingLeft: 15,
        fontSize: typography.caption,
        fontFamily: 'Poppins-SemiBold',
        color: colors.textSecondary,
    },
    footer: {
        // border: '1px solid red',
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    submitButton: {
        border: `3px solid ${colors.darkBorder}`,
        padding: '5px 25px',
        borderRadius: '12px',
    }
}