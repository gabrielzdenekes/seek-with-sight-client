import { Box, Grid, Skeleton } from "@mui/material";

export default function ProductSkeleton() {
    return (
        <Box sx={{ mb: 6 }}>
            <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
            <Grid container spacing={3}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                        <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="text" sx={{ mt: 1.5 }} />
                        <Skeleton variant="text" width="60%" />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
