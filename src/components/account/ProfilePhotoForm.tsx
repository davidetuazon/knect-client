import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import profileIcon from '../../assets/icons/profile.svg';

import Text from "../commons/Text";
import { updatePhoto } from "../../services/api";

type Props = {
    style?: React.CSSProperties,
    user: any,
    setUser: React.Dispatch<React.SetStateAction<any>>,
}

type Inputs = {
    profilePhoto: FileList,
}

export default function ProfilePhotoForm({ user, setUser, style }: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { register, handleSubmit, watch, trigger, reset, formState: { errors, isDirty }} = useForm<Inputs>({
        defaultValues: {
            profilePhoto: user?.profilePhoto,
        }
    });
    
    const onSubmit: SubmitHandler<Inputs> = async () => {
        if (!selectedFile) {
            toast.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('profilePhoto', selectedFile);

        const result = await updatePhoto(formData);
        setUser(result.user);
        toast.success("Photo updated!");
    };

    useEffect(() => {
        if (user) {
            reset({
                profilePhoto: user?.profilePhoto,
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
                    style={{
                        ...styles.text,
                        paddingLeft: 15,
                    }}
                >
                    Profile Photo
                </Text>
                <div style={{ padding: 10 }}>
                    <img
                        src={
                        preview ||
                        user?.profilePhoto ||
                        profileIcon
                        }
                        alt="Profile"
                        style={styles.profileImg}
                    />
                    <div style={styles.footer}>
                        <label htmlFor="profilePhoto">
                            <Text
                                variant="caption"
                                style={styles.uploadLabel}
                            >
                                Choose File
                            </Text>
                        </label>
                        <div
                            onClick={handleSubmit(onSubmit)}
                        >
                            <Text
                                variant="caption"
                                style={styles.submitButton}
                            >
                                Save
                            </Text>
                        </div>
                    </div>
                    <input
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        {...register("profilePhoto")}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                             if (file) {
                                setSelectedFile(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
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
    },
    form: {
        // border: '1px solid red',
        width: '60%',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    },
    profileImg: {
        width: '90%',
        height: '100%',
        maxHeight: '300px',
        border: `3px solid ${colors.darkBorder}`,
        borderRadius: '12px',
        padding: 10,
        objectFit: 'cover',
    },
    uploadLabel: {
        border: `3px solid ${colors.darkBorder}`,
        textAlign: 'center',
        padding: '5px 35px',
        borderRadius: '12px',
        cursor: 'pointer',
        minWidth: '67.5px',
    },
    text: {
        // border: '1px solid red',
        margin: '15px 0px'
    },
    fields: {
        borderRadius: '8px',
        height: 35,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    submitButton: {
        border: `3px solid ${colors.darkBorder}`,
        padding: '5px 25px',
        borderRadius: '12px',
        cursor: 'pointer',
    }
}