import React from 'react';
import { useAuth } from "../firebase";

const Dashboard = () => {
	const { logout } = useAuth();
	return (<>
		<div>Dashboard</div>
		<button onClick={logout}>log out</button></>
	)
};

export default Dashboard;