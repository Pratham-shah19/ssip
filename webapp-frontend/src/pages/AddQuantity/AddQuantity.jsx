import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import QuantityBars from '../../components/QuantityBars/QuantityBars'
import './AddQuantity.css'
import * as ItemsActions from '../../store/actions/items'
import {useSelector,useDispatch} from 'react-redux'
const AddQuantity = () => {
  const [value, setValue] = React.useState(0);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ onRefreshing, setOnRefreshing ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  //const [allitems,setAllitems] = React.useState([]);
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(ItemsActions.setAllProducts());
   // window.location.reload()
  },[])
  

  
  const AllItems = useSelector((state) => state.items.AllItems);
  const allitems = AllItems.data.data;
  console.log('allItems',allitems);

//   const loadProductsHot = React.useCallback(
//       () => {
//            setError(null);
//         setOnRefreshing(true);
//      try {
//           console.log('entered_menu');
//           dispatch(ItemsActions.setAllProducts);

//      } catch (err) {
//                console.log('error',err);
//                setError(err.message);
//      }
//            setOnRefreshing(false);
//    },
//    [dispatch]
//  );
//  React.useEffect(  //It will be called for Hot Beverages only
//  () => {
//      setIsLoading(true);
//      loadProductsHot().then(() => setIsLoading(false));
//      console.log('Products loaded successfully');
//  },
//  [ dispatch, loadProductsHot ]
// );
 

    



  

  return (
    <div className="owner-or-dashboard-container">
      
      <div className="owner-or-inner-container">
      
        <div className="owner-or-left">
          <Sidebar/>
        </div>
        <div className="owner-or-right">
          <div className="quantity-top">
            <h3 className='quantity-title'>Item Quantity</h3>
          </div>
          <div className="quantity-bars">
          {
            allitems.map((item) => {
              return <QuantityBars id={item._id} url={item.imageUrl} name={item.name} quantity={item.quantity}/>;
            })
          } 
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuantity