import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route} from 'react-router-dom';
import SignIn from './routes/sign-in/sign-in.component';
const App = () => { 
  return(
  <Routes>
    <Route path = '/' element ={<Navigation/>}>
      <Route index element={<Home/>}/>
      <Route path='shop' element={<Shop/>}/>  
      <Route path='signIn' element={<SignIn/>}/>                
    </Route> 
    
  </Routes>
  
  )
}
// <Rounte index make the component as default show in the parent route
const Shop =()=>{
  return(
    <h1>I am the shop Page</h1>

  )
}


//This Rountes works because App was wrapped by <BrowserRouter></BrowserRouter>
export default App;
