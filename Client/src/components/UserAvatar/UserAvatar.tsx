import { Gender } from "../../types/enums/Gender";
import { Avatar, SxProps } from "@mui/material";

const UserAvatar = ({
    gender,
    firstName,
    lastName,
    sx,
}: {
    gender?: string;
    firstName?: string;
    lastName?: string;
    sx?: SxProps;
}) => {

    return (
        <Avatar
            sx={
                {
                    ...sx,
                    bgcolor: `${gender === Gender.FEMALE ? "#ff6961" : "#A7C7E7"}`,
                }
            }
        >
            {
                (firstName?.charAt(0) || "").toLocaleUpperCase() + "" + (lastName?.charAt(0) || "").toLocaleUpperCase()
            }
        </Avatar>
    );
};

export default UserAvatar;