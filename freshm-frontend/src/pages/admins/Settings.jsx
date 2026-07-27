// import React from "react";

// import {
// Box,
// Typography
// } from "@mui/material";


// export default function Settings(){

// return(

// <Box>

// <Typography
// variant="h4"
// fontWeight={700}
// >

// Settings

// </Typography>


// </Box>

// )

// }




import React from "react";

import {
    Box,
    Typography
} from "@mui/material";

const palette = {
    forestDeep: "#0B2F22",
    forest: "#0F2E20",
    gold: "#C9A24B",
    goldLight: "#E7CD8B",
    paper: "#FAF6EC",
    paperDim: "#F3EDDF",
    ink: "#17231C",
    inkSoft: "#4B5A50",
    line: "rgba(201,162,75,0.35)",
};

export default function Settings() {

    return (

        <Box
            sx={{
                p: 4,
                background: palette.paperDim,
                minHeight: "100vh",
            }}
        >
            <Typography
                sx={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 34,
                    fontWeight: 600,
                    color: palette.ink,
                }}
            >
                Settings
            </Typography>


        </Box>

    )

}


