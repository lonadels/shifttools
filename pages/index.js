import {Box, Container} from "@mui/material";
import Link from "../components/Link";
import LordIcon from "../components/LordIcon";
import Button from "@mui/material/Button";

export default function Home() {

    return (
        <div>
            <Container maxWidth="md">
                <Box>
                    <Button startIcon={<LordIcon state="hover-1"
                                                 src="syzergpm"
                                                 trigger="loop-on-hover"
                                                 target="#about"/>}
                            color={"primary"} id="about"
                            variant="contained"
                            component={Link}
                            size={"large"}
                            noLinkStyle
                            href="/about">
                        Информация
                    </Button>
                </Box>
            </Container>
        </div>

    )
}
