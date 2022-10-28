import React, { useState } from 'react';
import FooterMenu from '../components/FooterMenu';
import PacientesScreen from './pacientes/PacientesScreen';
import ReservasScreen from './reservas/ReservasScreen';
import FichasScreen from './fichas/FichasScreen';
import { TABS } from '../constants/tabs';

const HomeScreen = () => {

	const [activeTab, setActiveTab] = useState(TABS.PACIENTES);

	return (
		<>
			{
				activeTab === TABS.PACIENTES &&
				<PacientesScreen />
			}

			{
				activeTab === TABS.RESERVAS &&
				<ReservasScreen />
			}

			{
				activeTab === TABS.FICHAS &&
				<FichasScreen />
			}
			<FooterMenu changeTab={setActiveTab} active={activeTab} />
		</>
	);
};

export default HomeScreen;
