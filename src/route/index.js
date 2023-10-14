import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from "../component/layout/layout"
const Home = lazy(() => import('../page/product'));
const Page2 = lazy(() => import('../page/page2'));

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/page2" element={<Page2 />} />
                </Route>
            </Routes>
        </Suspense>
    </Router>
);

export default App