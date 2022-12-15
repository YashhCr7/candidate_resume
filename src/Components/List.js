import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function List() {
    const [allCandidateData, setallCandidateData] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
      let data
      data=JSON.parse(localStorage.getItem('candidateData'))
      setallCandidateData(data)
    }, [])

    const handleDelete = (pos) => {
        let temp = [...allCandidateData]
        temp = temp.filter((item, index) => index !== pos)
        setallCandidateData(temp)
        localStorage.setItem("candidateData", JSON.stringify(temp))
    }

    console.log(allCandidateData);
    
  return (
    <React.Fragment>
          <body className="bg-light">
              <div className="container my-4">
                  <main>
                      <div className="py-5">
                          <h2>
                              Candidates List
                              <button className="btn btn-primary float-end" onClick={()=>navigate('/add')}>Add Candidate</button>
                          </h2>
                      </div>
                      <div className="row">
                          <div className="col-12 ms-auto me-auto">
                              <div className="card">
                                  <div className="card-body">
                                      <table className="table">
                                          <tr>
                                              <th>#</th>
                                              <th>Name</th>
                                              <th>Email</th>
                                              <th>Number of Skills</th>
                                              <th>Total Work Experience (in months)</th>
                                              <th>Actions</th>
                                          </tr>
                                          {allCandidateData?allCandidateData.map((data,i)=>(
                                            <tr>
                                            <td>{i+1}</td>
                                            <td>{data.firstname}</td>
                                            <td>{data.email}</td>
                                            <td>{data.skills.length}</td>
                                            <td>{data.totalWorkExperience}</td>
                                            <td>
                                                <a onClick={()=>navigate('/edit',{state:{id:i}})}>Edit</a>
                                                <a onClick={()=>handleDelete(i)} className="text-danger ms-2">Delete</a>
                                            </td>
                                            </tr>
                                          )):null} 
                                      </table>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </main>
              </div>
          </body>

    </React.Fragment>
  )
}

export default List