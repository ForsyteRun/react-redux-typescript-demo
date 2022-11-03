import { initializeApp } from 'firebase/app';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { store } from './redux/redux';
import reportWebVitals from './reportWebVitals';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCzHvmNhwDNOXGI_lL7pI3gZ6uerIp59Kc",
  authDomain: "usstore-e64da.firebaseapp.com",
  databaseURL: "https://usstore-e64da-default-rtdb.firebaseio.com",
  projectId: "usstore-e64da",
  storageBucket: "usstore-e64da.appspot.com",
  messagingSenderId: "125949904426",
  appId: "1:125949904426:web:eff97dcd40575bdf226553"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
 
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
