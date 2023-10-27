import ExchangeWallet from './components/ExchangeWallet';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-1">
				<Header />
				<ExchangeWallet />
			</div>
			<Footer />
		</div>
	);
};

export default App;
