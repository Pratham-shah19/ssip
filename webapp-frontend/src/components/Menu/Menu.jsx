//Tab Options 
// import React, {useState, useEffect,useCallback } from 'react'
import MenuCardList from '../MenuCardsList/MenuCardList'
import ColdBeverages from '../../DummyData/ColdBeverages'
import HotBeverages from '../../DummyData/HotBeverages'
import Starters from '../../DummyData/Starters'
import { useSelector, useDispatch } from 'react-redux';
import Dessert from '../../DummyData/Dessert'

import * as itemsAction from '../../store/actions/items'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import {useSelector, useDispatch} from 'react-redux';

import './Menu.css'

// const Menu = () => {

//     const [ isLoading, setIsLoading ] = useState(false);
// 	const [ onRefreshing, setOnRefreshing ] = useState(false);
//     const [ error, setError ] = useState(false);
    
//     const [hotBeverage, setHotBeverage] = useState(true);
//     const [coldBeverage, setColdBeverage] = useState(false);
//     const [starter, setStarter] = useState(false);
//     const [dessert, setDessert] = useState(false);


//     const items = useSelector((state)=>state.items.ColdBeverages);
//     console.log('first',items);
//     const dispatch = useDispatch();
//     // const loadProductsCold = useCallback(
// 	// 	async () => {
// 	// 		setError(null);
// 	// 		setOnRefreshing(true);
// 	// 		try {
// 	// 			dispatch(itemsAction.setDummyCold());
// 	// 		} catch (err) {
// 	// 			setError(err.message);
// 	// 		}
// 	// 		setOnRefreshing(false);
// 	// 	},
// 	// 	[dispatch]
// 	// );

//     const loadProductsHot = useCallback(
// 		async () => {
// 			setError(null);
// 			setOnRefreshing(true);
// 			try {
// 				await dispatch(itemsAction.setDummyHot());
// 			} catch (err) {
// 				setError(err.message);
// 			}
// 			setOnRefreshing(false);
// 		},
// 		[dispatch]
// 	);

//     // const loadProductsStart = useCallback(
// 	// 	async () => {
// 	// 		setError(null);
// 	// 		setOnRefreshing(true);
// 	// 		try {
// 	// 			dispatch(itemsAction.setDummyStart());
// 	// 		} catch (err) {
// 	// 			setError(err.message);
// 	// 		}
// 	// 		setOnRefreshing(false);
// 	// 	},
// 	// 	[dispatch]
// 	// );

//     // const loadProductsDes = useCallback(
// 	// 	async () => {
// 	// 		setError(null);
// 	// 		setOnRefreshing(true);
// 	// 		try {
// 	// 			dispatch(itemsAction.setDummyDes());
// 	// 		} catch (err) {
// 	// 			setError(err.message);
// 	// 		}
// 	// 		setOnRefreshing(false);
// 	// 	},
// 	// 	[dispatch]
// 	// );
    

//     useEffect(  //It will be called for Hot Beverages only
// 		() => {
// 			setIsLoading(true);
// 			loadProductsHot().then(() => setIsLoading(false));
//             console.log('Products   loaded successfully');
// 		},
// 		[ dispatch, loadProductsHot ]
// 	);

//     if (isLoading) {
//         console.log('Loading.....');
// 		// return (
// 		// 	<div className="div_loading"><h2>Loading.....</h2></div>
// 		// );
// 	}

//     if (items.length === 0) {
//         console.log('Products not loaded Successfully');
// 		// return (
// 		// 	<div className="empty">
//         //         <p>No Products ):</p>
//         //         {/* <button 
//         //         clasName="Maybe"
//         //         onClick={loadProducts}>
//         //           lol  
//         //         </button> */}
//         //     </div>
// 		// );
// 	}


//     // const handleHotBeverage = () => {
//     //     setHotBeverage(true);
//     //     setColdBeverage(false);
//     //     setDessert(false);
//     //     setStarter(false);
//     // }

//     // const handleColdBeverage = () => {
//     //     setHotBeverage(false)
//     //     setColdBeverage(true);
//     //     setDessert(false);
//     //     setStarter(false);
//     // }

//     // const handleStarters = () => {
//     //     setHotBeverage(false)
//     //     setColdBeverage(false);
//     //     setDessert(false);
//     //     setStarter(true);
//     // }

//     // const handleDessert = () => {
//     //     setHotBeverage(false)
//     //     setColdBeverage(false);
//     //     setDessert(true);
//     //     setStarter(false);
//     // }

//     // let data = HotBeverages;

//     // if(hotBeverage === true){
//     //     data = HotBeverages
//     // }
//     // else if(coldBeverage === true){
//     //     data = ColdBeverages
//     // }
//     // else if(starter === true){
//     //     data = Starters
//     // }
//     // else if(dessert === true){
//     //     data = Dessert
//     // }

//   return (
//     <div className='menu-container'>
        
//         <div className="categories-list">

//             <div className='tab-ele-container'>
//             <div className="category" onClick={loadProductsHot}>
//             <div className='tab-img'>
//                 <img 
//                     src="https://cdn-icons-png.flaticon.com/512/3141/3141698.png"
//                     alt=""
//                     className="tab-image"
//                 />
//                 <div className='tab-name'><p>Hot Beverages</p></div>
//             </div>
//             </div>
//             </div>



//             <div className='tab-ele-container'>
//             <div className="category">
//             <div className='tab-img'>
//                 <img 
//                     src="https://cdn-icons-png.flaticon.com/128/3289/3289600.png"
//                     alt=""
//                     className="tab-image"
//                 />
//                 <div className='tab-name'><p>Cold Beverages</p></div>
//             </div>
//             </div>
//             </div>


//             <div className='tab-ele-container'>
//             <div className="category">
//             <div className='tab-img'>
//                 <img 
//                     src="https://cdn-icons-png.flaticon.com/512/286/286987.png"
//                     alt=""
//                     className="tab-image"
//                 />
//                 <div className='tab-name'><p>Starters</p></div>
//             </div>
//             </div>
//             </div>



//             <div className='tab-ele-container'>
//             <div className="category">
//             <div className='tab-img'>
//                 <img 
//                     src="https://cdn-icons-png.flaticon.com/128/1588/1588999.png"
//                     alt=""
//                     className="tab-image"
//                 />
//                 <div className='tab-name'><p>Desserts</p></div>
//             </div>
//             </div>
//             </div>
//         </div>
//         <div className="menu-list">
//             <MenuCardList data={items}/>
//         </div>
//     </div>
//   )
// }

// export default Menu





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Menu = () => {
  const [value, setValue] = React.useState(0);
      const [ isLoading, setIsLoading ] = React.useState(false);
	const [ onRefreshing, setOnRefreshing ] = React.useState(false);
    const [ error, setError ] = React.useState(false);
//   console.log("Ice creame",IceCreams)
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //dispatch(itemsAction.setDummyHot());
  const IceCreams = useSelector((state) => state.items.IceCream);
  console.log('icerea',IceCreams);
  const MainCourse = useSelector((state) => state.items.MainCourse);
  const Starters = useSelector((state) => state.items.Starter);
  console.log('starter',Starters);
  //     const loadProductsHot = useCallback(
// 		async () => {
// 			setError(null);
// 			setOnRefreshing(true);
// 			try {
// 				await dispatch(itemsAction.setDummyHot());
// 			} catch (err) {
// 				setError(err.message);
// 			}
// 			setOnRefreshing(false);
// 		},
// 		[dispatch]
// 	);
  
  const loadProductsHot = React.useCallback(
		 async () => {
            setError(null);
 			setOnRefreshing(true);
			try {

                console.log('entered_menu');
				dispatch(itemsAction.setDummyHot());
			} catch (err) {
                console.log('error',err);
                setError(err.message);
			}
            setOnRefreshing(false);
		},
		[dispatch]
	);
  // const loadProductsHot = async () => {
  //           setError(null);
 	// 		      setOnRefreshing(true);
	// 		try {

  //               console.log('entered_menu');
	// 			dispatch(itemsAction.setDummyHot());
	// 		} catch (err) {
  //               console.log('error',err);
  //               setError(err.message);
	// 		}
  //           setOnRefreshing(false);
	// 	};
		


    // React.useEffect(()=>{
    // const interval=setInterval(()=>{
    //   loadProductsHot()
    //  },10000)
    //  return()=>clearInterval(interval)
    // },[])

    React.useEffect(  //It will be called for Hot Beverages only
    () => {
        setIsLoading(true);
        loadProductsHot().then(() => setIsLoading(false));
        console.log('Products   loaded successfully');
        console.log('icrem',IceCreams);
    },
    [ dispatch, loadProductsHot ]
	);

    

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="IceCream" {...a11yProps(0)} />
          <Tab label="MainCourse" {...a11yProps(1)} />
          <Tab label="Starter" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>

        <MenuCardList data={IceCreams}/>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <MenuCardList data={MainCourse}/>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <MenuCardList data={Starters}/>
      </TabPanel>
    </Box>
  );
}

export default Menu