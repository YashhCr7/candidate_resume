import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
// import { useForm } from 'react-hook-form';

let checks2 = []

function Add() {
    const [inputs, setInputs] = useState({})
    // const [checkBoxData, setCheckBoxData]  = useState([])
    // const [experience, setExperience] = useState([])
    const [experienceData, setExperienceData] = useState([{companyName:"",duration:"",responsibilities:""},{companyName:"",duration:"",responsibilities:""}])
    const [errors, setErrors] = useState({})
    const [firstRender, setFirstRender] = useState(true)
    
    // const {
    //     register,
    //     handleSubmit,
    //     formState: {errors}
    // } = useForm();

    let navigate = useNavigate()

    useEffect(() => {
        if(firstRender==true){
            setFirstRender(false)
        }else{
            setErrors(validate(inputs))
        }
      }, [inputs]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleExperienceData = (event,pos) => {
        const name = event.target.name;
        const value = event.target.value;

        setExperienceData(experienceData.map((exp,index)=>(
            index===pos?
            {...exp,[name]:value}:exp
        )))
        // console.log(pos);
        // console.log(name);
        // console.log(value);
    }
    
    let dupli; 
    const handleCheckBoxData = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (e.target.checked) {
            dupli = inputs[name] || [];
            dupli.push(value);
            checks2 = dupli;
            setInputs ({
              ...inputs,
              [name]: dupli
            });
        }
        else {
            var dupliV = inputs[name] || [];
            let indi = dupliV.findIndex((item) => item === value);
            dupliV.splice(indi, 1);
            // var dupliV = checks2.filter((each) => each !== e.target.value);
            setInputs({
              ...inputs,
              [name]: dupliV,
            });
            checks2 = dupliV;
        }   
    }

    const handleExperience = () => {
        let temp = []
        temp = [...experienceData]
        temp.push({companyName:"",duration:"",responsibilities:""})
        setExperienceData(temp)
    }

    const removeExperience = (pos) => {
        setExperienceData(experienceData.filter((item, index) => index !== pos))
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.firstname){
            errors.firstname = "Firstname is required"
        }
        if(!values.lastname){
            errors.lastname = "Lastname is required"
        }
        if(!values.email){
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if(!values.gender){
            errors.gender = "Gender is required"
        }
        if(!values.skills){
            errors.skills = "Skills required"
        }
        else if(values.skills.length < 3){
            errors.skills = "Minimum 3 skills required"
        }
        if(!values.address){
            errors.address = "Address required"
        }
        if(!values.country){
            errors.country = "Country required"
        }
        if(!values.state){
            errors.state = "State required"
        }
        return errors;  
    }

    const Submit = (e) => {
        // console.log(inputs);
        e.preventDefault()
        let twe = 0
        let temp = {...inputs,experience:experienceData}
        temp.experience.map(input=>twe+=Number(input.duration))
        temp = {...temp,totalWorkExperience: twe}
        let temp2
        console.log(temp);
        // temp.push(experienceData)
        setInputs(temp)
        setErrors(validate(inputs))
        let data = JSON.parse(localStorage.getItem("candidateData"))
        if(errors == {}){
            if(data == null){
                localStorage.setItem("candidateData", JSON.stringify([temp]))
            }
            else{
                temp2=[...data]
                temp2.push(temp)
                localStorage.setItem("candidateData", JSON.stringify(temp2))
            }
            // console.log(twe)
            setInputs({})
            setExperienceData([{companyName:"",duration:"",responsibilities:""},{companyName:"",duration:"",responsibilities:""}])
            navigate('/list')
        } else {
            alert('Please fill all the required fields')
        }
    }
    console.log(errors);
    // console.log(experienceData);

  return (
      <React.Fragment>
          <body className="bg-light">
              <div className="container my-4">
                  <main>
                      <div className="py-5 text-center">
                          <h2>Add Candidate</h2>
                      </div>
                      <form className="form-horizontal" onSubmit={Submit}>
                      <div className="row g-5">
                          <div className="col-md-7 col-lg-8 ms-auto me-auto">
                              <h4 className="mb-3">Basic Info</h4>
                              <div className="row g-3">
                                  <div className="col-sm-6">
                                      <label className="form-label">First name</label>
                                      <input 
                                      type="text" 
                                      className="form-control" 
                                      name="firstname"
                                      defaultValue={inputs.firstname || ""}
                                      //   {...register("firstname", {required :"First Name Required"})}
                                      onChange={(e)=>{handleChange(e);
                                        // setErrors(validate(inputs))
                                    }}
                                      />
                                      {errors.firstname && <small className="text-danger">First Name is Required</small>}
                                      {/* <small>{errors.firstname}</small> */}
                                  </div>
                                  <div className="col-sm-6">
                                      <label className="form-label">Last name</label>
                                      <input 
                                      type="text" 
                                      className="form-control"
                                      name="lastname"
                                      value={inputs.lastname || ""}
                                    //   {...register("lastname", {required :"Last Name Required"})}
                                      onChange={(e)=>handleChange(e)}
                                    />
                                    {errors.lastname && <small className="text-danger">Last Name is Required</small>}
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label">Gender</label>
                                      <div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              id="male" 
                                              name="gender" 
                                              value="male" 
                                              type="radio"
                                              checked = {inputs.gender === 'male' ? true:false}
                                              onChange={(e)=>handleChange(e)} 
                                               />
                                              <label className="form-check-label">Male</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input"  
                                              id="female" 
                                              name="gender" 
                                              value="female" 
                                              type="radio" 
                                              checked = {inputs.gender === 'female' ? true:false}
                                              onChange={(e)=>handleChange(e)} 
                                              />
                                              <label className="form-check-label">Female</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input"  
                                              id="other" 
                                              name="gender" 
                                              value="other" 
                                              type="radio" 
                                              checked = {inputs.gender === 'other' ? true:false}
                                              onChange={(e)=>handleChange(e)}
                                              />
                                              <label className="form-check-label">Other</label>
                                          </div>
                                      </div>
                                      {errors.gender && <small className="text-danger">Gender is Required</small>}
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label">Email</label>
                                      <input type="email" 
                                      className="form-control" 
                                      placeholder="you@example.com" 
                                      name="email"
                                      value={inputs.email || ""}
                                      onChange={(e)=>handleChange(e)}
                                      />
                                      {errors.email && <small className="text-danger">{errors.email}</small>}
                                  </div>
                                  <div className="col-12">
                                      <label className="form-label">Address</label>
                                      <textarea className="form-control" 
                                      placeholder="1234 Main St"
                                      name="address"
                                      value={inputs.address || ""}
                                      onChange={(e)=>handleChange(e)}
                                      ></textarea>
                                      {errors.address && <small className="text-danger">Address is Required</small>}
                                  </div>

                                  <div className="col-md-5">
                                      <label className="form-label">Country</label>
                                      <select 
                                      className="form-select"
                                      name="country"
                                      value={inputs.country || ""}
                                      onChange={(e)=>handleChange(e)}
                                      >
                                          <option value="">Choose...</option>
                                          <option>India</option>
                                          <option>United States</option>
                                      </select>
                                      {errors.country && <small className="text-danger">Country is Required</small>}
                                  </div>

                                  <div className="col-md-4">
                                      <label className="form-label">State</label>
                                      <select 
                                      className="form-select"
                                      name="state"
                                      value={inputs.state || ""}
                                      onChange={(e)=>handleChange(e)}
                                      >
                                          <option value="">Choose...</option>
                                          <option>Maharashtra</option>
                                          <option>Karnataka</option>
                                      </select>
                                      {errors.state && <small className="text-danger">State is Required</small>}
                                  </div>

                                  <div className="col-md-3">
                                      <label className="form-label">Pin/Zip</label>
                                      <input 
                                      type="text" 
                                      className="form-control" 
                                      name="pin"
                                      value={inputs.pin || ""}
                                      onChange={(e)=>handleChange(e)}
                                      />
                                  </div>
                              </div>

                              <hr className="my-4" />

                              <h4 className="mb-3">Professional Info</h4>

                              <div className="row g-3">
                                  <div className="col-12">
                                      <label className="form-label">
                                          Choose your skills
                                          <span className="small text-muted">(min 3 skills)</span>
                                      </label>
                                      <div className="mb-3">
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              type="checkbox" 
                                              name="skills" 
                                              value="Angular"  
                                              checked={inputs.skills?(inputs.skills.includes('Angular')?true:false):false}
                                              onChange={(e) => handleCheckBoxData(e)}
                                              />
                                              <label className="form-check-label">Angular</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              type="checkbox" 
                                              name="skills" 
                                              value="React" 
                                              checked={inputs.skills?(inputs.skills.includes('React')?true:false):false}
                                              onChange={(e) => handleCheckBoxData(e)}
                                              />
                                              <label className="form-check-label">React</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              type="checkbox" 
                                              name="skills" 
                                              value="NodeJs" 
                                              checked={inputs.skills?(inputs.skills.includes('NodeJs')?true:false):false}
                                              onChange={(e) => handleCheckBoxData(e)}
                                              />
                                              <label className="form-check-label">Node.JS</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              type="checkbox" 
                                              name="skills" 
                                              value="JavaScript" 
                                              checked={inputs.skills?(inputs.skills.includes('JavaScript')?true:false):false}
                                              onChange={(e) => handleCheckBoxData(e)}
                                              />
                                              <label className="form-check-label">JavaScript</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              type="checkbox" 
                                              name="skills" 
                                              value="Flutter" 
                                              checked={inputs.skills?(inputs.skills.includes('Flutter')?true:false):false}
                                              onChange={(e) => handleCheckBoxData(e)}
                                              />
                                              <label className="form-check-label">Flutter</label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                              <input 
                                              className="form-check-input" 
                                              type="checkbox" 
                                              name="skills" 
                                              value="Java" 
                                              checked={inputs.skills?(inputs.skills.includes('Java')?true:false):false}
                                              onChange={(e) => handleCheckBoxData(e)}
                                              />
                                              <label className="form-check-label">Java</label>
                                          </div>
                                        {errors.skills && <small className="text-danger">{errors.skills}</small>}
                                      </div>
                                  </div>
                              </div>
                              <div className="row gy-3">
                                  <div className="col-12">
                                      <label className="form-label">
                                          <strong>
                                              Experience
                                              <span className="small text-muted">(min 2, max 5 items)</span>
                                          </strong>
                                      </label>
                                      {/* <div className="card mx-3 mt-3">
                                          <div className="card-body">
                                              <h6 className="card-title text-muted mb-3">
                                                  Experience #1
                                                  <a href="#" className="float-end text-danger fw-normal">Remove</a>
                                              </h6>
                                              <div className="row g-3">
                                                  <div className="col-6">
                                                      <label className="form-label">Company Name</label>
                                                      <input type="text" className="form-control" name="Company1Name" value={inputs.Company1Name || ""} onChange={(e)=>handleChange(e)}/>
                                                  </div>
                                                  <div className="col-6">
                                                      <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                                                      <input type="number" className="form-control" name="Company1Duration" value={inputs.Company1Duration || ""} onChange={(e)=>handleChange(e)}/>
                                                  </div>
                                                  <div className="col-12">
                                                      <label className="form-label">Describe your responsibilities</label>
                                                      <textarea className="form-control" name="Company1Responsibilites" value={inputs.Company1Responsibilites || ""} onChange={(e)=>handleChange(e)}></textarea>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="card mx-3 mt-3">
                                          <div className="card-body">
                                              <h6 className="card-title text-muted mb-3">
                                                  Experience #2
                                                  <a className="float-end text-danger fw-normal">Remove</a>
                                              </h6>
                                              <div className="row g-3">
                                                  <div className="col-6">
                                                      <label className="form-label">Company Name</label>
                                                      <input type="text" name="Company2Name" value={inputs.Company2Name || ""} onChange={(e)=>handleChange(e)} className="form-control" />
                                                  </div>
                                                  <div className="col-6">
                                                      <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                                                      <input type="number" name="Company2Duration" value={inputs.Company2Duration || ""} onChange={(e)=>handleChange(e)} className="form-control" />
                                                  </div>
                                                  <div className="col-12">
                                                      <label className="form-label">Describe your responsibilities</label>
                                                      <textarea className="form-control" name="Company2Responsibilities" value={inputs.Company2Responsibilities || ""} onChange={(e)=>handleChange(e)} ></textarea>
                                                  </div>
                                              </div>
                                          </div>
                                      </div> */}
                                      {experienceData?experienceData.map((exp,i)=>(
                                          <div className="card mx-3 mt-3">
                                          <div className="card-body">
                                              <h6 className="card-title text-muted mb-3">
                                                  Experience #{i+1}
                                                  {(i+1>2) && <a onClick={()=>removeExperience(i)} className="float-end text-danger fw-normal">Remove</a>} 
                                              </h6>
                                              <div className="row g-3">
                                                  <div className="col-6">
                                                      <label className="form-label">Company Name</label>
                                                      <input type="text" name={`companyName`} value={exp.companyName || ""} onChange={(e)=>handleExperienceData(e,i)} className="form-control" />
                                                  </div>
                                                  <div className="col-6">
                                                      <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                                                      <input type="number" name={`duration`} value={exp.duration || ""} onChange={(e)=>handleExperienceData(e,i)} className="form-control" />
                                                  </div>
                                                  <div className="col-12">
                                                      <label className="form-label">Describe your responsibilities</label>
                                                      <textarea className="form-control" name={`responsibilities`} value={exp.responsibilities || ""} onChange={(e)=>handleExperienceData(e,i)} ></textarea>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      )):null}
                                      {experienceData.length < 5 && <a className="d-block mt-3" onClick={()=>handleExperience()}>Add more experience</a>}
                                      {/* {console.log(experience.length)} */}
                                  </div>
                              </div>
                              <hr className="my-4" />
                              <button className="btn btn-primary" type="submit">Save Candidate</button>
                          </div>
                      </div>
                      </form>
                  </main>
              </div>
          </body>
</React.Fragment>
  )
}

export default Add