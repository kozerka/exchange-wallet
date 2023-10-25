import ExchangeForm from './components/ExchangeForm';
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-1">
				<Header />
				<ExchangeForm />
			</div>
			<Footer />
		</div>
	);
};

export default App;
