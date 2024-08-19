import { backendAxiosInstance } from "@/axios/backendInstance";
import EditField from "@/components/EditField/EditField";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";
import { Gender } from "@/types/enums/Gender";
import { UserDTO } from "@/types/user";
import { Box, Card, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const Profile = () => {
    const { userId } = useAuth();
    const queryClient = useQueryClient()

    const { data: user } = useQuery<UserDTO>({
        queryKey: ["users", userId],
        queryFn: async () => {
            const user = (await backendAxiosInstance.get(`/users/${userId}`)).data;
            return {
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                gender: user.gender,
                birthdate: user.birthdate,
            } as UserDTO;
        }
    });

    const upadteUserMutation = useMutation({
        mutationFn: async (updateBody: { field: string, value: string }) => await backendAxiosInstance.patch(`/users/${userId}`,
            {
                [updateBody.field]: updateBody.value

            }
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users', userId] })
        }
    })

    const handleSave = async (field: string, value: string) => {
        if (value) {
            upadteUserMutation.mutate({ field, value })
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            <Card
                sx={{
                    p: 3,
                    maxWidth: "90vw",
                    width: 600,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography gutterBottom variant="h4">
                        Profile
                    </Typography>
                    <UserAvatar
                        {...user}
                        sx={{ width: 100, height: 100, fontSize: 40 }}
                    />
                </Box>
                <EditField
                    label="first name"
                    value={user?.firstName ?? ""}
                    onSave={(value) => handleSave("first_name", value)}
                />
                <EditField
                    label="last name"
                    value={user?.lastName ?? ""}
                    onSave={(value) => handleSave("last_name", value)}
                />
                <EditField
                    label="email"
                    value={user?.email ?? ""}
                    onSave={(value) => handleSave("email", value)}
                />
                <EditField
                    isPassword
                    label="password"
                    value="********"
                    onSave={(value) => handleSave("password", value)}
                />
                <EditField
                    isDate
                    label="birthdate"
                    value={user?.birthdate?.toLocaleString() ?? ""}
                    onSave={(value) => handleSave("birthdate", value)}
                />
                <EditField
                    value={user?.gender}
                    options={Object.values(Gender)}
                    label="gender"
                    onSave={(value) => handleSave("gender", value)}
                />
            </Card>
        </Box>
    )
}