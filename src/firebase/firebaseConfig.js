
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlYjx2651WIZM6Fz9l-SRy_I9uNibnu7o",
  authDomain: "tienda-productos-467d3.firebaseapp.com",
  projectId: "tienda-productos-467d3",
   storageBucket: "tienda-productos-467d3.appspot.com",
  messagingSenderId: "336301268177",
  appId: "1:336301268177:web:c76b145126640ddcb8b9f0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
export default app;