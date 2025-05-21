import * as R from './allFiles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<R.Main />} />
        <Route path="/virtual" element={<R.VirtualScrollList />} />
        <Route path="/normal" element={<R.NormalScrollList />} />
			</Routes>
		</Router>
	)
};

export default App;