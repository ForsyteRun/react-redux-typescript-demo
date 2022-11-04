import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const dataBase = () => {
   const firebaseConfig = {
      apiKey: "AIzaSyCzHvmNhwDNOXGI_lL7pI3gZ6uerIp59Kc",
      authDomain: "usstore-e64da.firebaseapp.com",
      databaseURL: "https://usstore-e64da-default-rtdb.firebaseio.com",
      projectId: "usstore-e64da",
      storageBucket: "usstore-e64da.appspot.com",
      messagingSenderId: "125949904426",
      appId: "1:125949904426:web:eff97dcd40575bdf226553"
};

   const app = initializeApp(firebaseConfig);
   return getDatabase(app);  
}

export default dataBase;