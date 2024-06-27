import React, {useState, useEffect} from 'react';
import {Container, Card, CardContent, makeStyles, Grid} from '@material-ui/core';

import QrReader from 'react-qr-reader';
import Swal from 'sweetalert2'



function App() { 

  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [scanResultWebCam2, setScanResultWebCam2] =  useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [checksuccess, setCheckSuccess] = useState(true)
  const [openQr, setOpenQr] = useState(true);


  const classes = useStyles();

 
  function handleSubmit(e) {
    setScanResultWebCam('')
    setScanResultWebCam2('')
    setIsLoading(false)
    setCheckSuccess(true)
    setOpenQr(!openQr)
  }


  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if(result){
      if(scanResultWebCam === ''){
      
        Swal.fire({
          title: "สแกนสำเร็จ",
          icon: "success"
        });
      console.log(result)
        setScanResultWebCam(result);
        setTimeout(() => {
        setIsLoading(true)
      }, 6000);
      }
  
      if(isLoading === true){
        
      console.log("scanResultWebCam2",scanResultWebCam2)
      setScanResultWebCam2(result);
      setIsLoading(false)
      }

      if(scanResultWebCam !=='' && scanResultWebCam2 !=='' ){
      if(checksuccess === true){
          if(scanResultWebCam === scanResultWebCam2){
            Swal.fire({
              title: "ข้อมูลตรงกัน",
              icon: "success"
            });
            setOpenQr(!openQr)
            setCheckSuccess(false)
          }
          if(scanResultWebCam !== scanResultWebCam2){
            Swal.fire({
              title: "ข้อมูลไม่ตรงกัน",
              icon: "success"
            });
            setOpenQr(!openQr)
            setCheckSuccess(false)

          }
        }
      }
   
    }


   }
  return (
    <Container className={classes.conatiner}>
          <Card>
              <h2 className={classes.title}> Scan QR Code </h2>
             
              <CardContent>
                  <Grid container spacing={2}>                 
                    
                      <Grid className={classes.conatinerQr} item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <h3>Qr Code Scan by Web Cam</h3>
                         {/* {timer} */}
                         <div>
                         <button  className={classes.btn} variant="contained" color="secondary"  onClick={handleSubmit}>
        {openQr ? "Close" : "Open"} QR Scanner
      </button>
      { openQr && <QrReader  delay={200}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam} />}
    </div>
                         <h3 >barcode 1: {scanResultWebCam}</h3>
                         <h3>barcode 2: {scanResultWebCam2}</h3>
                       
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10,   
    },
    conatinerQr: {
      background: '#DBDEF2',
        },
    title: {     
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      padding: 5,
      color: '#3f51b5',
      borderRadius: 50,
      marginTop: 10,
      marginBottom: 10
    } 

}));
export default App;
