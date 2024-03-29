import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component';
import { Routes, Route} from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
const App = () => { 
  return(
  <Routes>
    <Route path = '/' element ={<Navigation/>}>
      <Route index element={<Home/>}/>
      <Route path='shop' element={<Shop/>}/>  
      <Route path='auth' element={<Authentication/>}/>
      <Route path ='checkout' element= {<Checkout/>}/>                
    </Route> 
    
  </Routes>
  
  )
}
// <Rounte index make the component as default show in the parent route
// const Shop =()=>{
//   return(
//     <h1>I am the shop Page</h1>

//   )
// }


//This Rountes works because App was wrapped by <BrowserRouter></BrowserRouter>
export default App;
