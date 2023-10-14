import { Group, Stack, Text, Progress, Button } from '@mantine/core';
import Module_1 from "./Module_1"
import Navbar from './Navbar'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import tpw from "../styles/tpw.jpg"
import Image from 'next/image'
import Link from 'next/link';
import hpw from "../styles/hpw.jpg"
import abt from "../styles/abt.jpg"
const Ind=()=>{
  return ( 
    <>
    <Navbar/>
    <div style={{backgroundImage: `url("https://img.freepik.com/free-vector/abstract-colorful-soft-watercolor-texture-background_1035-18958.jpg?w=900&t=st=1674406027~exp=1674406627~hmac=7bd4810119ebf6bc7c6f2e4fd23d04c7116d035d610ba49c6c1d90657cabf587")`}}>
      <div className='container-fluid d-flex justify-content-center'>
      <div className='row'>
      <div className='col-md-4'>
      <div className="card text-center shadow">
        <div className='overflow'>
          <Image src={tpw} alt="Img1" className='card-img-top'/>
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title">Type-written documents Extraction</h4>
          <p className="card-text text-secondary">
            A extraction method for type written documents using tesseract API
          </p>
          < button className='btn btn-light'><Link href="./Module_1" className='btn xbtn-outline-success'>Take me there</Link></button>
          </div>  
      </div>
      </div>

      <div className='col-md-4'>
      <div className="card text-center shadow">
        <div className='overflow'>
          <Image src={hpw} alt="Img2" className='card-img-top'/>
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title">Hand-written character Recognition</h4>
          <p className="card-text text-secondary">
            A Module for hand-written character recognition developed by using machine learning model
          </p>
         < button className='btn btn-light'><Link href="http://127.0.0.1:5000/" className='btn xbtn-outline-success'>Take me there</Link></button>
          </div>  
      </div>
      </div>

      <div className='col-md-4'>
      <div className="card text-center shadow">
        <div className='overflow'>
          <Image src={abt} alt="Img3" className='card-img-top'/>
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title">About</h4>
          <p className="card-text text-secondary">
            Description of the project with the overview of technology used for development
          </p>
          < button className='btn btn-light'><Link href="./about" className='btn xbtn-outline-success'>Take me there</Link></button>
          </div>  
      </div>
      </div>



      </div>
      </div>


    </div>
    </>
  )
}
export default Ind;