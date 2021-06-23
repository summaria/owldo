import React, { useState } from 'react';
import { useAuth } from "../firebase";
import {
	Grid,
	Typography,
	Card
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SessionCard from "../components/SesssionCard";
import NavLayout from "../Layouts/NavLayout";

const data = {
	sessions: [
		{
			title:"The well being research",
			date: "23rd February"
		},
		{
			title:"Capstone research",
			date: "20th February"
		},
	]
}

const useDashboardStyles = makeStyles(()=>({
	title: {

	},
	date: {

	},
	image:{
		height:60,
		width:60
	}
}));

const Dashboard = () => {
	const { logout } = useAuth();
	
	const [ sessions, setSessions ] = useState(data.sessions);

	const classes = useDashboardStyles();
	return (
	<>
		<NavLayout>
			<Grid container>
				<Grid xs={6}>
					<Typography>
						Continue from where you left of
					</Typography>
					{
						sessions?.map(session => <SessionCard {...session} />)
					}
				</Grid>
				<Grid xs={6}>

				</Grid>
			</Grid>
			<button onClick={logout}>log out</button>
		</NavLayout>
	</>
	)
};

export default Dashboard;