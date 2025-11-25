import './index.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppWithProviders() {
	const [DevtoolsComp, setDevtoolsComp] = useState(null);

	useEffect(() => {
		// Charger dynamiquement les Devtools uniquement en dev si installés
		if (process.env.NODE_ENV === 'development') {
			import('@tanstack/react-query-devtools')
				.then((mod) => {
					if (mod && mod.ReactQueryDevtools) setDevtoolsComp(() => mod.ReactQueryDevtools);
				})
				.catch(() => {
					// ignore si le paquet n'est pas installé
				});
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<App />
			{DevtoolsComp ? <DevtoolsComp initialIsOpen={false} position="bottom-right" /> : null}
		</QueryClientProvider>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWithProviders />);