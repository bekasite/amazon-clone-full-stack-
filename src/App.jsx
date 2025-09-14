import { useContext, useEffect } from 'react';
import './App.css';
// import ComponentA from './ComponentA';
// import ComponentB from './ComponentB';
import Routing from './Router';
// import { ThemeProvider } from './contextProvider';
import { DataContext } from './components/DataProvider/DataProvider';
import { Type } from './utility/action.type';
import {auth} from './utility/firebase';

function App() {
  const [{user, basket}, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // console.log(user)
 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        })
      }
    });
    
    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch]); // Add dispatch to dependency array//to automatically show user unless signed out when refreshing the page

  return (
    <>
      <Routing />
      {/* <ThemeProvider>
        {' '}
        <ComponentA />
        <ComponentB />
      </ThemeProvider> */}
    </>
  );
}

export default App;
