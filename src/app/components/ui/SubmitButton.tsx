import { Button, CircularProgress } from "@mui/material";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    label: string;
}

export function SubmitButton({ label }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            fullWidth
            type="submit"
            variant="contained"
            disableElevation
            disabled={pending}
            sx={{
                backgroundColor: "#333",
                color: "#fff",
                textTransform: "none",
                borderRadius: "50px",
                py: 1,
                mb: 3,
                fontSize: "16px",
                "&:hover": {
                    backgroundColor: "#aaa",
                },
            }}
        >
            {pending ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : label}
        </Button>
    );
}
