import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Rooms from './components/Rooms';
import Roomq from './components/Room';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bill from './components/Bill';
import { BrowserView, MobileView } from 'react-device-detect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

console.log(process.env);
console.log(process.env.BACK_URL);
const queryClient = new QueryClient();

root.render(
  // <div>
  //   <BrowserView>
  //               <h1>This is rendered only in browser</h1>
  //           </BrowserView>
  //           <MobileView>
  //               <h1>This is rendered only on mobile</h1>
  //           </MobileView>
  // </div>
  // <div>
  //           <MultiTableDrag />
  //       </div>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <BrowserView>
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route path=":id" element={<Roomq />} />
          <Route path=":id/bill" element={<Bill />} />
        </Routes>
      </BrowserView>
      <MobileView>
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route path=":id" element={<Roomq />} />
          <Route path=":id/bill" element={<Bill />} />
        </Routes>
      </MobileView>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
