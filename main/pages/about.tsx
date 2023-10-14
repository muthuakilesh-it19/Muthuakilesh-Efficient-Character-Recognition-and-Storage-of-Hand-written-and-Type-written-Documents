import Navbar from './Navbar'


const Abt=()=>{
    return(
        <>
         <Navbar/>
         <div style={{backgroundImage: `url("https://img.freepik.com/free-vector/abstract-colorful-soft-watercolor-texture-background_1035-18958.jpg?w=900&t=st=1674406027~exp=1674406627~hmac=7bd4810119ebf6bc7c6f2e4fd23d04c7116d035d610ba49c6c1d90657cabf587")`}}>
      <div className='container-fluid d-flex justify-content-center'>
      <div className='row'>
      <div className="card text-center shadow">
        
        <div className="card-body text-dark">
          <h4 className="card-title">Efficient Character Recognition and Storage of Type-written and Hand-written Documents</h4>
          
          </div>  
      </div>
      <div className='col-md-4'>
      <div className="card text-center shadow">
        
        <div className="card-body text-dark">
          <h4 className="card-title">Vinu Gautam M : Front End</h4>
          <p className="card-text text-secondary">
            My contribution to this project is front-end, I used reactjs running on nextjs and bootstrap for styling.
          </p>
          </div>  
      </div>
      </div>

      <div className='col-md-4'>
      <div className="card text-center shadow">
        
        <div className="card-body text-dark">
          <h4 className="card-title">Muthu Akilesh K : Back End</h4>
          <p className="card-text text-secondary">
            I used tesseract API for the type-written segment and used ML algorithm model for the Hand-written segment.
          </p>
          </div>  
      </div>
      </div>

      <div className='col-md-4'>
      <div className="card text-center shadow">
        
        <div className="card-body text-dark">
          <h4 className="card-title">Ratheesh Varman S P: Database Administrator</h4>
          <p className="card-text text-secondary">
            I modeled the database, the project uses SQL server for database and is connected using prisma ORM.
          </p>
          </div>  
      </div>
      </div>



      </div>
      
      </div>
     

    </div>
    <div style={{backgroundImage: `url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg")`}}>

    <div className='container-fluid d-flex justify-content-center'>

      <div className='row'>
      <div className="card text-center shadow">
        
        <div className="card-body text-dark">
          <h4 className="card-title">Guide Details:</h4>
          <h5 className="card-text">Dr.SRI VIGNA HEMA V</h5>
          <h5 className="card-text">Assistant Professor</h5>
          <h5 className="card-text">Department Of Information Technology</h5>

          </div>  
      </div>
      </div>
      </div>
      </div>
    
        </>
    )
}

export default Abt;