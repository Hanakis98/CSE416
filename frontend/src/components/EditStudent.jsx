import {Component}  from 'react';
import  React  from 'react';
import { Redirect } from "react-router-dom";
import { Alert, Table, Container, Row, Col, Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Cookies from 'js-cookie';
import { backendDomain } from '../App.js';
import AddCourseModal from './AddCourseModal'
import AddCourseWarningModal from './AddCourseWarningModal'
var axios = require("axios")
var sha = require("sha1")
var u=0;


export default class EditStudentAsStudent extends Component{
    constructor(props) {
        super(props);
        this.state={
            firstName: "",
            lastName: "",
            email: "",
                // password: "pass",
            department: "",
            track: "",
            sbu_id: "",
            courses:[],
            studentUserName:u,
            entry_semester: "",
            entry_year : "",
            graduation_semester: "",
            graduation_year: "",
            comments: [],
            commentToAdd:"",
            maxNumCourses: 4,
            preferredCourses: [],
            avoidCourses: [],
            suggestedCoursePlans: [],
            currentPage: 0,
            similarStudents: []
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchStudentInfo()//.then(n => this.setState({}))
        this.readAllStudent().then(newStudents => this.setState({ similarStudents: newStudents }));
    }

    fetchStudentInfo = () => {
        // Get the query paramter and then get the students info and update the state of the page
        const query = new URLSearchParams(window.location.search);
        u = query.get('user')
        
        var urlToGetStudent= backendDomain + "/students/getOneStudent"

        if(u != null  ){
            urlToGetStudent = backendDomain + "/students/getOneStudent?user="+u
        }
        
        fetch(urlToGetStudent, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
                })
            .then(response => response.json())
            .then(data => {
                        //console.log(data);
                        if(data.notAllowed != null){
                            //auth fail from api call?
                            Cookies.set("gpdLoggedIn", "0");
                            Cookies.set("studentLoggedIn", "0");
                            this.setState({});
                            return;
                        }

                    
                        this.setState ( {
                            firstName: data.first_name,
                            lastName: data.last_name,
                            email: data.email,
                            //password: "",
                            department: data.department,
                            track: data.track,
                            sbu_id: data.sbu_id,
                            studentUserName:u,
                            entry_semester: data.entry_semester,
                            entry_year : data.entry_year,
                            graduation_semester: data.graduation_semester,
                            graduation_year: data.graduation_year,
                            comments: data.comments

                        })

                        if(data.coursePlan != null){
                            this.setState ( {
                                courses: data.coursePlan.courses
                            }); 
                        }
                            console.log("Dep",data.department)
                          axios.post(backendDomain + "/degreeRequirements/getDegreeRequriement", {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    } ,
                                    credentials: 'include', 
                                   department :data.department
                                }).then(data=>console.log(this.setState({degreeRequirements:data.data}))
                        );
                                    

            })
            .catch((error) => {
               
            });
    }

    updateStudent=() =>{
  
        let json_data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            sbu_id: this.state.sbu_id,
            email: this.state.email,
            department:  this.state.department,
            track: this.state.track,
            // password: this.state.password,
            entry_semester: this.state.entry_semester,
            entry_year : this.state.entry_year,
            graduation_semester: this.state.graduation_semester,
            graduation_year: this.state.graduation_year
        }
        //The gpd can be updating the student or the student can update themselves.
        //Change the URL depending on this and then send a PUT to update
        
        var URLtoUpdateStudent=backendDomain + "/students/updateStudent";
            if(u != null  ){
                URLtoUpdateStudent = backendDomain + "/students/updateStudent?user="+u
            }
        fetch(URLtoUpdateStudent, {
            method: 'PUT', // or 'PUT'
            headers: { 
                'Content-Type': 'application/json',
            }, credentials: 'include', 
            body: JSON.stringify(json_data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

            })
            .catch((error) => {
                console.error('Error:', error);

            });
    }
  async  deleteCourseFromPlan (sbu_id,department,courseNum,semester,year){


      await   fetch(backendDomain + "/coursePlans/deleteCourseFromPlan", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({sbu_id: sbu_id , department: department, course_num: courseNum,semester: semester,year: year})
                })   
     await        
            fetch(backendDomain + "/students/regrabCoursePlan", {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        } ,credentials: 'include', 
                        body: JSON.stringify({sbu_id: sbu_id })
                            }).then(data=>            window.location.reload() )   ;
    
    await        
    fetch(backendDomain + "/students/regrabCoursePlan", {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                } ,credentials: 'include', 
                body: JSON.stringify({sbu_id: sbu_id })
                    }).then(data=>            window.location.reload() )   ;     




    }
    handleChange(event){
        this.setState({category: event.target.value});
        console.log(event.target.value)
    }
    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }
    addComment=(commentToAdd, sbu_id)=>{
        if(commentToAdd!="")
        fetch(backendDomain + "/students/addComment", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({sbu_id: sbu_id ,commentToAdd : commentToAdd})
                }).then(data=>window.location.reload()                )
    }
    
    addCommentAndNotify=(commentToAdd, sbu_id)=>{
        let templateParams = {
            from_name: "MAST SYSTEM",
            to_name: this.state.email,
            subject: "COMMENT ON COURSEPLAN",
            message_html: "THERES A NEW COMMENT ON YOUR COURSEPLAN",
        }
        if(commentToAdd!="")
        fetch(backendDomain + "/students/addCommentAndNotify", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({sbu_id: sbu_id ,commentToAdd : commentToAdd, email: this.state.email})
                }).then(data=>window.location.reload() );
        
     
    }
    toggleAddCourseWarningModal = () => {
        var newShowModal = !this.state.showAddCourseWarningModal
        this.setState({ showAddCourseWarningModal: newShowModal })

    }
    addCourseToPlan = (department,courseNum,semester,year,section) => {
        if(this.state.coursePlan==null){
            fetch(backendDomain + '/coursePlans/newCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ sbu_id: this.state.sbu_id })
            })
            fetch(backendDomain + '/students/regrabCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include', 
                body: JSON.stringify({sbu_id:this.state.sbu_id})
            })
           
        }
        console.log(department,courseNum,semester,year,section)
        fetch(backendDomain + "/courses/getCourseIfItExists", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({department: department, course_num:courseNum, semester:semester, year:year,section:section})

                })
            .then(response => response.json())
            .then(data => {
                console.log(data.department)
                if(data.department == null)
                {
                    this.toggleAddCourseWarningModal()
                    this.setState({ showAddCourseModal: false })
                }
            });  

            fetch(backendDomain + '/coursePlans/addCourseToPlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include',
                body: JSON.stringify({sbu_id: this.state.sbu_id,department: department, course_num:courseNum, semester:semester, year:year,section:section})
            })
            fetch(backendDomain + '/students/regrabCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include', 
                body: JSON.stringify({sbu_id: this.state.sbu_id})
            })

    }

    async getAMSRequirements(){
       
        // Gather all the tracks from degree requirements
        let urlTrack = backendDomain + "/degreeRequirements/AMSDegreeRequirements"
        let degreeReq = null

        try {
            const response = await fetch(urlTrack, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                } ,credentials: 'include', 
                
            });
            const exam = await response.json();
            return exam;
        } catch (error) {
            console.error(error);
        }
        
    }

    async getECERequirements(){
        // Gather all the tracks from degree requirements
        let urlTrack = backendDomain + "/degreeRequirements/ECEDegreeRequirements"
        let degreeReq = null

        try {
            const response = await fetch(urlTrack, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                } ,credentials: 'include', 
                
            });
            const exam = await response.json();
            return exam;
        } catch (error) {
            console.error(error);
        }
    }

    async getBMIRequirements(){
        // Gather all the tracks from degree requirements
        let urlTrack = backendDomain + "/degreeRequirements/BMIDegreeRequirements"
        let degreeReq = null

        try {
            const response = await fetch(urlTrack, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                } ,credentials: 'include', 
                
            });
            const exam = await response.json();
            return exam;
        } catch (error) {
            console.error(error);
        }
    }

    async getAllCourses(){
        var route = backendDomain + '/courses/allOfferedCourses/'
    
        try {
            const response = await fetch(route, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                } ,credentials: 'include', 
                
            });
            const exam = await response.json();
            return exam;
        } catch (error) {
            console.error(error);
        }
    }

    generateVariation = (coursePlan, coursesBySemester, totalSwaps) => {
        var anotherPlan = {}
        for (let i = 0; i < Object.keys(coursePlan).length; i++){
            anotherPlan[Object.keys(coursePlan)[i]] =  Array.from(coursePlan[Object.keys(coursePlan)[i]])
        }
        let maxCoursesPerSemester = this.state.maxNumCourses > 5 ? 4: this.state.maxNumCourses   
        
        var swaps = 0
    

        for (let i = 0; i < Object.keys(coursePlan).length; i++){
            let courses = coursePlan[Object.keys(coursePlan)[i]]
            for (let j = 0; j < courses.length; j++){
                let course = courses[j]
                let code = courses[j].courseCode
                let semester = courses[j].semester  
                
                // Search Another Semester With this Course and Move it There
                let semsesters = Object.keys(coursesBySemester)
                
                for (let k = 0; k < semsesters.length; k++){
                    if (semsesters[k] !== semester){
                        var swapThisSemester = 0
                        for (let l = 0; l < coursesBySemester[semsesters[k]].length; l++){
                            let currentCourse = coursesBySemester[semsesters[k]][l]
                            let currentCode = course.courseCode
                            if (currentCode === code){
                                // Another variation detected, remove the current element and find new semester for it
                                if (anotherPlan[semsesters[k]].length+1 <= maxCoursesPerSemester){
                                    anotherPlan[semester].splice(anotherPlan[semester].indexOf(currentCourse),  1)
                                    anotherPlan[semsesters[k]].push(course)

                                    swaps++
                                    if (swaps === totalSwaps){
                                        return anotherPlan
                                    }
                                }
                                

                                
                            }
                        }
                    }
                    
                }
            }
        }
        
       
        

        
        return anotherPlan
    }

    async generateSequentialPlans (electives, coreRequirements, orRequirements, uniqueElectives, uniqueRequirements,totalElectiveCredits){        
        
        let maxCoursesPerSemester = this.state.maxNumCourses > 5 ? 4: this.state.maxNumCourses     
        let prefered = this.state.preferredCourses.map(x => x.trim())       

        let allCoursesCatalog = await this.getAllCourses()
        let preferredCourses = allCoursesCatalog.filter(x => prefered.includes(x.department + " " + x.course_num))   
        
        

        for (let i = 0; i < coreRequirements.length; i++){
            coreRequirements[i].semester = coreRequirements[i].semester + " " + coreRequirements[i].year
            coreRequirements[i].courseCode = coreRequirements[i].department + " " + coreRequirements[i].course_num
        }

        for (let i = 0; i < electives.length; i++){
            electives[i].semester = electives[i].semester + " " + electives[i].year
            electives[i].courseCode = electives[i].department + " " + electives[i].course_num
        }
        
        let allCourses = electives.concat(coreRequirements)  
        console.log(uniqueRequirements)         
        
        const coursesBySemester = allCourses.reduce((acc, value) => {
            // Group initialization
            if (!acc[value.semester]) {
              acc[value.semester] = [];
            }
           
            // Grouping
            acc[value.semester].push(value);
           
            return acc;
        }, {});

        let semsesters = Object.keys(coursesBySemester)
        let coursePlan = {}
        var totalElectives = totalElectiveCredits / 3
        var currentElectives = 0
        var allCourseCode = []     
      
        
        

        for (let i = 0; i < semsesters.length; i++){
            coursePlan[semsesters[i]] = []
            // Before we being the sequential loop, we need to add in the prefered courses
            for (let p = 0; p < prefered.length; p++){

                for (let k = 0; k < coursesBySemester[semsesters[i]].length; k++){
                    let course = coursesBySemester[semsesters[i]][k]
                    let code = course.courseCode
                    let codeIdx = prefered.indexOf(code)
                    if (codeIdx !== -1 ){
                        
                        if (uniqueElectives.includes(code)){           
                            if (coursePlan[semsesters[i]].length  < maxCoursesPerSemester && currentElectives < totalElectives){
                                coursePlan[semsesters[i]].push(course)
                                currentElectives = currentElectives + 1
                                allCourseCode.push(code)
                                uniqueElectives.splice(uniqueElectives.indexOf(code), 1)
                                allCourses.splice(allCourses.indexOf(course), 1)
                                console.log("PUSH")
                            }
                        }
                    }
                }
            }


            for (let j = 0; j < coursesBySemester[semsesters[i]].length; j++){
                let course = coursesBySemester[semsesters[i]][j]
                let code = course.courseCode
                
                if (uniqueRequirements.includes(code)){                   
                    if (coursePlan[semsesters[i]].length  < maxCoursesPerSemester){
                        coursePlan[semsesters[i]].push(course)
                        allCourseCode.push(code)                         
                        uniqueRequirements.splice(uniqueRequirements.indexOf(code), 1)
                        allCourses.splice(allCourses.indexOf(course), 1)
                    }
                }else if (uniqueElectives.includes(code)){           
                    if (coursePlan[semsesters[i]].length  < maxCoursesPerSemester && currentElectives < totalElectives){
                        coursePlan[semsesters[i]].push(course)
                        currentElectives = currentElectives + 1
                        allCourseCode.push(code)
                        uniqueElectives.splice(uniqueElectives.indexOf(code), 1)
                        allCourses.splice(allCourses.indexOf(course), 1)
                    }
                }else{
                    // Check orRequirements
                    for (let i = 0; i < orRequirements.length; i++){
                        for (let j = 0; j < orRequirements[i].length; j++){
                            if (code === orRequirements[i][j] && coursePlan[semsesters[i]].length  < maxCoursesPerSemester){
                                coursePlan[semsesters[i]].push(course)
                                allCourseCode.push(code) 
                                orRequirements[i].splice(j, 2)
                                allCourses.splice(allCourses.indexOf(course), 1)
                            }
                        }
                    }
                }
            }
        }
        // Contigency Something is Not Finished
        orRequirements = orRequirements.filter(x => x.length !== 0)     

        if (uniqueRequirements.length !== 0){
            for (let i = 0 ; i < uniqueRequirements.length; i++){
                // Search for this course 
                let course = allCourses.filter(x => x.courseCode === uniqueRequirements[i])[0]
                if (course){
                    coursePlan[course.semester].push(course)
                }
                
            }
        }
        console.log(coursePlan)
        if (orRequirements.length !== 0){
            for (let i = 0; i < orRequirements.length; i++){
                for (let j = 0; j < orRequirements[i].length; j++){
                    let course = allCourses.filter(x => x.courseCode === orRequirements[i][j])[0]
                    if (course){
                        coursePlan[course.semester].push(course)
                    }
                    break
                }
            }            
        }
        if (this.state.department === "CSE" && uniqueElectives.length !== 0){
            for (let i = 0; i < uniqueElectives.length; i++){
                let course = allCourses.filter(x => x.courseCode === uniqueElectives[i])[0]
                if (course){
                    coursePlan[course.semester].push(course)
                }
            }
        }
        
        //Shuffle around to get some other course plan 
        var allPlans = [coursePlan]
        let numCourses = allCourseCode.length
        if (numCourses > 5){
            for (let i = 1; i < 4; i++){
            
                var anotherPlan = this.generateVariation(coursePlan, coursesBySemester, 1)            
                allPlans.push(anotherPlan)
            }
        }

       
        allPlans = allPlans.map(x => Object.keys(x).map(function(key){
            return x[key];
        }).flat())

        allPlans = this.state.suggestedCoursePlans.concat(allPlans)
        this.setState({suggestedCoursePlans: allPlans})
    }

    async regularSuggestAMS() {
        
        let degreeReqs = await this.getAMSRequirements()
        let userEntry = this.state.entry_semester + " " + this.state.entry_year
        let validDegreeReqCondition = (degreeReq) => (degreeReq.version === userEntry)
        let validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
        if (!validDegreeReq){
            validDegreeReq = degreeReqs[0]
        }
        let userTrack = this.state.track
        let allCourses = await this.getAllCourses()
        let prefered = this.state.preferredCourses.map(x => x.trim())
      
        
       
        if (validDegreeReq){
            
            // With valid degree requirement, we check their track
            let trackCondition = (trackReq) => (trackReq.track === userTrack)
            let trackCourses = validDegreeReq.coreRequirements[validDegreeReq.coreRequirements.findIndex(trackCondition)]
            
            
            // We now verify base on the track, first check all the user completed courses and see if it can apply with either core or electives
            let coreRequirements = trackCourses.requiredCourses
            let electivesCondition = trackCourses.electiveCourses[0]
            let totalElectiveCredits = electivesCondition.totalCredits
            let userCompletedCourses = this.state.courses.filter(x => x.grade !== 'F').map(x =>  x.newCourse.department + " " + x.newCourse.course_num         )
            let userCompletedCoursesCode = this.state.courses.filter(x => x.grade !== 'F').map(x => Number(x.newCourse.course_num )        )
           
            
            //let coreRequirementsShortNames = coreRequirements.map(x => x.courseNumber)
            
            // No compromise to be made here but the user's selections can be influenced in the electives
            let uniqueRequirements = []
            let orRequirements = []

            let coreRequirementsNeeded = coreRequirements.map(x =>{ 
                
                if(x.type === "required" && !userCompletedCourses.includes(x.courseNumber.substring(0,7))){     
                    let course = x.courseNumber.toString().substring(0,7)    
                    uniqueRequirements.push(course)
                    return (allCourses.filter(x => x.department + " " + x.course_num === course ))      
                }else if(x.type === "one of many"){
                    const range = (start, end) => {
                        const length = end - start;
                        return Array.from({ length }, (_, i) => start + i);
                    }

                    let rangeArr = x.courseRange.substring(3).split("-").map(str => Number(str.replace(/\s/g,'')))
                    let courseRange = range(rangeArr[0], rangeArr[1])
                    let satisfied = courseRange.filter(x => userCompletedCoursesCode.indexOf(x) !== -1).length > 0
                    let possibleCodes = courseRange.map(x => "AMS" + " " + x.toString())
                    let possibleCourses = allCourses.filter(x => possibleCodes.includes(x.department + " " + x.course_num))   
                    let code = possibleCourses[0].department + " " + possibleCourses[0].course_num
                    
                    if (!satisfied){
                        uniqueRequirements.push(code)
                        return possibleCourses[0]
                    }else{
                        return satisfied
                    }                   


                }else if(x.type === "rotation"){
                    let numRotations = x.rotations
                    let satisfied = userCompletedCourses.filter(course => x.courseNumber === course).length === numRotations    
                    let course = x.courseNumber.toString()  
                    for (let i = 0; i < numRotations; i++){
                        uniqueRequirements.push(course)
                    }                               
                   
                    if (!satisfied){
                        
                        return (allCourses.filter(x => x.department + " " + x.course_num === course ))
                    }else{
                        return satisfied
                    }

                   
                    
                }else if(x.type === "or"){

                    let satisfiedOneOfTwo = (course) => (userCompletedCourses.includes(course))
                    let satisfied = x.courseNumber.some(satisfiedOneOfTwo)      
                    let course = x.courseNumber.toString().split(",")
                    orRequirements.push(course)
                    
                    if (!satisfied){
                        
                        return (allCourses.filter( x => course.includes(x.department + " " + x.course_num) || prefered.includes(x.department + " " + x.course_num) ))      
                    }else{
                        return satisfied
                    }
                    
                }else{
                    return true // satifised requirement already
                }
            }).filter(x => x != true).flat()

            let avoid = this.state.avoidCourses.map(x => x.trim())
            

            if (electivesCondition.courseRange && !electivesCondition.substitutionRange){               
                
                let electives = allCourses.filter(x => electivesCondition.courseRange.includes(x.department + " " + x.course_num))                
                let suggestedElectives = electives.filter(x => 

                    !avoid.includes(x.department + " " + x.course_num)
                )      
                
                let finalSuggestedElectives = []
                let finalSuggestedElectivesCode = []
                let suggestedElectivesCode = suggestedElectives.map(x => (x.department + " " + x.course_num))
                
                // Store unique credit count    
                let totalCreditsPrefered = 0
                for (let i = 0; i < suggestedElectivesCode.length; i++){
                    if (  prefered.includes(suggestedElectivesCode[i])   ){
                        finalSuggestedElectives.push(suggestedElectives[i])

                        if (!finalSuggestedElectivesCode.includes(suggestedElectivesCode[i])){
                            finalSuggestedElectivesCode.push(suggestedElectivesCode[i])
                            totalCreditsPrefered += Number(suggestedElectives[i].credits)
                        }
                    }
                }
                let uniqueElectives = electivesCondition.courseRange
                uniqueElectives = uniqueElectives.filter(x => !userCompletedCourses.includes(x)   )
                

                this.generateSequentialPlans(suggestedElectives, coreRequirementsNeeded, orRequirements, uniqueElectives, uniqueRequirements,totalElectiveCredits)
               

            }else if (electivesCondition.substitutionRange){
                const range = (start, end) => {
                    const length = end - start;
                    return Array.from({ length }, (_, i) => start + i);
                }


                let numRangeCourses = electivesCondition.substitutionRange.length

                // Build Ranges
                let courseRange = electivesCondition.courseRange.substring(3).split("-").map(str => Number(str.replace(/\s/g,'')))
                courseRange = range(courseRange[0], courseRange[1])

                // Build SubRange
                let subRanges =  electivesCondition.substitutionRange.map(x => x.substring(3).split("-").map(str => Number(str.replace(/\s/g,''))) )
                subRanges = subRanges.map(x => range(x[0], x[1])).flat()
                

                // Build Full Range
                let fullRange = courseRange.concat(subRanges).map(x => "AMS" + " " + x.toString()).filter(x => !userCompletedCourses.includes(x)   )
                let electives = allCourses.filter(x => fullRange.includes(x.department + " " + x.course_num))    
                let suggestedElectives = electives.filter(x => 

                    !avoid.includes(x.department + " " + x.course_num)
                ) 
                
                this.generateSequentialPlans(suggestedElectives, coreRequirementsNeeded, orRequirements, fullRange, uniqueRequirements,totalElectiveCredits)

            }else if (electivesCondition.allowedCourses){
                let electives = allCourses.filter(x => electivesCondition.allowedCourses.includes(x.department + " " + x.course_num))   
                let suggestedElectives = electives.filter(x => 

                    !avoid.includes(x.department + " " + x.course_num)
                )  
                let uniqueElectives = electivesCondition.allowedCourses.filter(x => !userCompletedCourses.includes(x)   )
                this.generateSequentialPlans(suggestedElectives, coreRequirementsNeeded, orRequirements, uniqueElectives, uniqueRequirements,totalElectiveCredits)
                
            }else{
                let electives = allCourses.filter(x => x.department === "AMS")
                
                let suggestedElectives = electives.filter(x => 

                    !avoid.includes(x.department + " " + x.course_num)
                )  

                let uniqueElectives = electives.map(x => x.department + " " + x.course_num)
               
                uniqueElectives = [...new Set(uniqueElectives)]
                uniqueElectives = uniqueElectives.filter(x => !userCompletedCourses.includes(x)   )
               
                this.generateSequentialPlans(suggestedElectives, coreRequirementsNeeded, orRequirements, uniqueElectives, uniqueRequirements,totalElectiveCredits)
               
            }

        }
       
    }

    readAllStudent = (params) =>  {
        var route = backendDomain + '/students/allStudents/'
    
        return fetch(route, {
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())

            .then(data => {
                console.log('Success:', data);
                return data
            })
            .catch((error) => {
                console.error('Error:', error);
                return null;
            });
    }

    async getCSERequirements(){
       
        // Gather all the tracks from degree requirements
        let urlTrack = backendDomain + "/degreeRequirements/CSEDegreeRequirements"
        let degreeReq = null

        try {
            const response = await fetch(urlTrack, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                } ,credentials: 'include', 
                
            });
            const exam = await response.json();
            return exam;
        } catch (error) {
            console.error(error);
        }
        
    }

    async parseCSERequirements(degreeReq, prefered) {

        let allCourses = await this.getAllCourses()
        // Get core requirements 
        let coreRequirements = degreeReq.courseRequirements.filter(x => x.area !== "Electives")
        let userCompletedCourses = this.state.courses.filter(x => x.grade !== 'F').map(x =>  x.newCourse.department + " " + x.newCourse.course_num) 

        // Get electives
        let electiveReqs = degreeReq.courseRequirements.filter(x => x.area === "Electives")[0]

        // Get track requirements
        let userTrackReqs = degreeReq.trackRequirements.filter(x => x.track === this.state.track)[0]
        
        //Parse all the courses needed
        let completedCourseCodes = this.state.courses.filter(x => x.grade !== 'F').map(x =>  x.newCourse.department + " " + x.newCourse.course_num)
        
        // Check number of courses left to complete
        let userTrackCourses = userTrackReqs.requiredCourses.map(x => x.courseNumber)
        let neededTrackCourses = userTrackCourses.filter(x => !completedCourseCodes.includes(x))        
        let neededCoreCourses = coreRequirements.map(x => {

            let courseList = x.requiredCourses.map(x => x.courseNumber)
            let completed = (course) => userCompletedCourses.includes(course)
            let userCompleted = courseList.some(completed)
            if (!userCompleted){
                return courseList[0]
            }else{
                return []
            }
            
        }).flat()

        
        let numElectiveCourseNeeded = Math.round(Number(degreeReq.minCredits / 3) - this.state.courses.filter(x => !userTrackCourses.includes(x)).length - neededCoreCourses.length+2)
        
        let electivesRange = electiveReqs.restriction
        const range = (start, end) => {
            const length = end - start;
            return Array.from({ length }, (_, i) => start + i);
        }
        let courseRangeNums = electivesRange.split('-').map(x => parseInt(x))
        let courseRange = range(courseRangeNums[0], courseRangeNums[1]).filter(x => !electiveReqs.exception.includes(x))

        // Generate num Course needed 
        let coreRequirementsCourses = allCourses.filter(x => neededCoreCourses.includes(x.department + " " + x.course_num  )          )
        let electiveCourses = allCourses.filter(x => x.department === this.state.department      )
        

        let count = 0
        let electives = []
        let uniqueElectives = []
        uniqueElectives.concat(prefered)
        count = count + prefered.length

        for (let i = 0; i < numElectiveCourseNeeded*2; i++){

            var randCourse = courseRange[Math.floor(Math.random() * courseRange.length)].toString();
            let exist = allCourses.filter(x => x.course_num === randCourse &&  x.department === this.state.department &&  !userCompletedCourses.includes(x.department + " " + x.course_num)   )
            if (exist.length > 0){
                electives = electives.concat(exist)
                count++
                uniqueElectives.push(this.state.department + " " + randCourse)
            }

            if (count === numElectiveCourseNeeded){
                break
            }

        }

        this.generateSequentialPlans(coreRequirementsCourses, electives, [], uniqueElectives, neededCoreCourses, numElectiveCourseNeeded)
        
        return uniqueElectives
        
    }

    async regularSuggestCSE() {
        let degreeReqs = await this.getCSERequirements()
        let userEntry = this.state.entry_semester + " " + this.state.entry_year
        let validDegreeReqCondition = (degreeReq) => (degreeReq.version === userEntry)
        let validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
        if (!validDegreeReq){
            validDegreeReq = degreeReqs[0]
        }
        let userTrack = this.state.track
        
        let prefered = this.state.preferredCourses.map(x => x.trim())
        
        let hello = await this.parseCSERequirements(validDegreeReq, prefered)
        console.log(hello)
        
      
    }

    async regularSuggestECE(){
        let degreeReqs = await this.getECERequirements()
        let userEntry = this.state.entry_semester + " " + this.state.entry_year
        let validDegreeReqCondition = (degreeReq) => (degreeReq.version === userEntry)
        let validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
        let userTrack = this.state.track
        let allCourses = await this.getAllCourses()
        let prefered = this.state.preferredCourses.map(x => x.trim())
    }


    regularSuggest = () => {

        switch (this.state.department){

            case "AMS":
                this.regularSuggestAMS()
                break
            case "CSE":
                this.regularSuggestCSE()
                break
            case "ECE":
                this.regularSuggestECE()
                break
        }


    }

    generateSequentialPlansSmart = (allCourses, allCodes, leftCredits) => {
        let maxCoursesPerSemester = this.state.maxNumCourses > 5 ? 4: this.state.maxNumCourses 
        for (let i = 0; i < allCourses.length; i++){
            allCourses[i].semester = allCourses[i].semester + " " + allCourses[i].year
            allCourses[i].courseCode = allCourses[i].department + " " + allCourses[i].course_num
        }
        const coursesBySemester = allCourses.reduce((acc, value) => {
            // Group initialization
            if (!acc[value.semester]) {
              acc[value.semester] = [];
            }
           
            // Grouping
            acc[value.semester].push(value);
           
            return acc;
        }, {});

        let semsesters = Object.keys(coursesBySemester)
        let coursePlan = {}
        let totalCredits = 0
        
        for (let i = 0; i < semsesters.length; i++){
            coursePlan[semsesters[i]] = []
            let semesterTimeSlots = []
            for (let j = 0; j < coursesBySemester[semsesters[i]].length; j++){
                let course = coursesBySemester[semsesters[i]][j]
                let code = course.courseCode     
                if (totalCredits > leftCredits){
                    break
                }      
                
                if (!semesterTimeSlots.includes(course.timeslot) && coursePlan[semsesters[i]].length  < maxCoursesPerSemester){
                    coursePlan[semsesters[i]].push(course)                                 
                    allCodes.splice(allCodes.indexOf(code), 1)
                    allCourses.splice(allCourses.indexOf(course), 1)
                    semesterTimeSlots.push(course.timeslot)
                    totalCredits = totalCredits + 3
                    
                }
            }
        }
        
        var allPlans = [coursePlan]
        
        allPlans = allPlans.map(x => Object.keys(x).map(function(key){
            return x[key];
        }).flat())

        allPlans = this.state.suggestedCoursePlans.concat(allPlans)
        this.setState({suggestedCoursePlans: allPlans})
    }

    

    async smartSuggestAsync()  {
        // Search Students With Completed Degrees With Same Index
          
            
        var validStudents = this.state.similarStudents.filter(x => x.department === this.state.department && x.track === this.state.track && x.sbu_id !== this.state.sbu_id && x.completeCoursePlan)
        
        if (validStudents.length > 0){
            var myCourses = this.state.courses.filter(x => x.grade !== 'F' && x.grade).map(x => x.newCourse.department + " " + x.newCourse.course_num)
            
            
            let similarCourse = validStudents.map(x => 
                x.coursePlan.courses.map(y => y.newCourse.department + " " + y.newCourse.course_num)
            )

            let similarCourseNum = similarCourse.map(x => x.flat().filter(z => myCourses.includes(z)).length)
                    
            // Get all courses I have not completed       
            var missingCoursesCode = similarCourse[similarCourseNum.indexOf(Math.max(...similarCourseNum))].filter(z => !myCourses.includes(z))
            var missingCourses = await this.getAllCourses()
            missingCourses = missingCourses.filter(y => missingCoursesCode.includes(y.department + " " + y.course_num)   )
            let userEntry = this.state.entry_semester + " " + this.state.entry_year
            let validDegreeReqCondition = (degreeReq) => (degreeReq.version === userEntry)

            let degreeReqs = null
            let validDegreeReq = null
            let minCredits = 0
            let leftCredits = 0

             // Major specific: Verify if I have completed these areas
             switch (this.state.department){
                case "CSE":
                    degreeReqs  = await this.getCSERequirements()   
                    validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
                    if (!validDegreeReq){
                        validDegreeReq = degreeReqs[0]
                    }
                    minCredits = validDegreeReq.minCredits
                    leftCredits = minCredits - (this.state.courses.filter(x => x.grade !== 'F' && x.grade).length * 3)
                    this.generateSequentialPlansSmart(missingCourses, missingCoursesCode, leftCredits)
                    break
                case "AMS":
                    degreeReqs  = await this.getAMSRequirements()    
                    validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
                    if (!validDegreeReq){
                        validDegreeReq = degreeReqs[0]
                    }
                    minCredits = validDegreeReq.minCredits
                    leftCredits = minCredits - (this.state.courses.filter(x => x.grade !== 'F' && x.grade).length * 3)
                    this.generateSequentialPlansSmart(missingCourses, missingCoursesCode, leftCredits)
                    break
                case "ECE":
                    degreeReqs = await this.getECERequirements()
                    validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
                    if (!validDegreeReq){
                        validDegreeReq = degreeReqs[0]
                    }
                    minCredits = validDegreeReq.minCredits
                    leftCredits = minCredits - (this.state.courses.filter(x => x.grade !== 'F' && x.grade).length * 3)
                    console.log(missingCoursesCode)
                    this.generateSequentialPlansSmart(missingCourses, missingCoursesCode, leftCredits)
                    break
                case "BMI":
                    degreeReqs = await this.getBMIRequirements()
                    validDegreeReq = degreeReqs[degreeReqs.findIndex(validDegreeReqCondition)]
                    if (!validDegreeReq){
                        validDegreeReq = degreeReqs[0]
                    }
                    minCredits = validDegreeReq.minCredits
                    leftCredits = minCredits - (this.state.courses.filter(x => x.grade !== 'F' && x.grade).length * 3)
                    console.log(missingCoursesCode)
                    this.generateSequentialPlansSmart(missingCourses, missingCoursesCode, leftCredits)
                    break
                
                    
            }



           
        }else{
            console.log("No Matching Student in Database")
        }
    }

    smartSuggest = () => {
        this.smartSuggestAsync()
    }

    handlePageClick = (e, index) => {
        e.preventDefault();
        this.setState({currentPage: index})
       
    }

    addCourseToPlanWithTimeSlot = (department,courseNum,semester,year,section, timeslot) => {
        if(this.state.coursePlan==null){
            fetch(backendDomain + '/coursePlans/newCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ sbu_id: this.state.sbu_id })
            })
            fetch(backendDomain + '/students/regrabCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include', 
                body: JSON.stringify({sbu_id:this.state.sbu_id})
            })
           
        }
        console.log(department,courseNum,semester,year,section)
        fetch(backendDomain + "/courses/getCourseIfItExists", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            } ,credentials: 'include', 
            body: JSON.stringify({department: department, course_num:courseNum, semester:semester, year:year,section:section, timeslot:timeslot})

                })
            .then(response => response.json())
            .then(data => {
               
                if(data.department == null)
                {
                    this.toggleAddCourseWarningModal()
                    this.setState({ showAddCourseModal: false })
                }
            });  

            fetch(backendDomain + '/coursePlans/addCourseToPlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include',
                body: JSON.stringify({sbu_id: this.state.sbu_id,department: department, course_num:courseNum, semester:semester, year:year,section:section, timeslot:timeslot})
            })

            fetch(backendDomain + '/students/regrabCoursePlan', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, credentials: 'include', 
                body: JSON.stringify({sbu_id: this.state.sbu_id})
            }).then(response => response.json())
            .then(data => {
                console.log(data)
            });  

    }



    acceptCoursePlan = () => {
        let courses = this.state.suggestedCoursePlans[this.state.currentPage].flat()
        for (let i = 0; i < courses.length; i++){
            let course = courses[i]
            //addCourseToPlan = (department,courseNum,semester,year,section)
            let department = course.department
            let courseNum = course.course_num
            let semester = course.semester.split(" ")[0]
            let year = course.year
            let section = course.section
            let timeslot = course.timeslot
            this.addCourseToPlanWithTimeSlot(department, courseNum, semester, year, section, timeslot)
            console.log(this.state.courses)
        }        
        
    }



    render(){
        const gpdLoggedIn=Cookies.get("gpdLoggedIn");
        const studentLoggedIn=Cookies.get("studentLoggedIn");
        //TODO: use a separate token auth API request to do this instead of the response from the GET
 
        if(gpdLoggedIn !== "1" && studentLoggedIn !== "1"){
            return <Redirect to={{
                pathname:'/', 
                state: { notauth: true }
            }} />
        }
        return (
            <Container fluid={true} style={{ paddingLeft:"100px",paddingRight:"100px"}}>
                <Row style={{ justifyContent: 'center'}}>
                    <p style={{fontSize: "22px", fontWeight: "bold"}}>Viewing Student: {this.state.firstName + " " + this.state.lastName}</p>
                </Row>
                <Row >
                    <Col xs={4} xl={3} style={{padding:"5px", margin:"0px", justifyContent: 'center', alignItems: 'center'}} >
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Edit Student Info</p>
                        <Form>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="name" sm={4}>First Name</Label>
                                <Col sm={8}><Input type="text" id="name" value={this.state.firstName} onChange = {e=> this.setState( {firstName: e.target.value })} /></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="name" sm={4}>Last Name</Label>
                                <Col sm={8}><Input type="text" id="name" value={this.state.lastName} onChange = {e=> this.setState( {lastName: e.target.value })}/></Col>
                            </FormGroup>
                           {gpdLoggedIn==1 && <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="id" sm={4}>ID</Label>
                                <Col sm={8}><Input type="text" id="id" readOnly={false} value={this.state.sbu_id}  onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                            </FormGroup>}
                            {studentLoggedIn==1 && <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="id" sm={4}>ID</Label>
                                <Col sm={8}><Input type="text" id="id" readOnly={true} value={this.state.sbu_id}  onChange = {e=> this.setState( {sbu_id: e.target.value })} /></Col>
                            </FormGroup>}
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}><Input type="text" id="email" value={this.state.email}  onChange = {e=> this.setState( {email: e.target.value })}/></Col>
                            </FormGroup>
                        
                            {/* <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="password" sm={4}>Password</Label>
                                <Col sm={8}><Input type="text" id="password"   onChange = {e=> this.setState( {password:sha( e.target.value+"SaltAndP3pp3r!ghtialkdsflkavnlkanfalglkahtklagnalfkja") })}/></Col>
                            </FormGroup> */}
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="entry_semester" sm={4}>Entry Semester</Label>
                                <Col sm={8}><Input type="text" id="entry_semester"value={this.state.entry_semester}   onChange = {e=> this.setState( { entry_semester : e.target.value})}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="entry_year" sm={4}>Entry Year</Label>
                                <Col sm={8}><Input type="text" id="entry_year"value={this.state.entry_year}   onChange = {e=> this.setState( { entry_year : e.target.value })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="graduation_semester" sm={4}>Graduation Semester</Label>
                                <Col sm={8}><Input type="text" id="graduation_semester"placeholder={this.state.graduation_semester}   onChange = {e=> this.setState( {  graduation_semester: e.target.value })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="graduation_year" sm={4}>Graduation Year</Label>
                                <Col sm={8}>
                                    <Input type="text" id="graduation_year" placeholder={this.state.graduation_year}   onChange = {e=> this.setState( { graduation_year: e.target.value})}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="major" sm={4}>Major</Label>
                                <Col sm={8}>
                                    <Input type="select" id="major" value={this.state.department} onChange = {e=> this.setState( {department: e.target.value })} >
                                        <option value="None">None</option>
                                        <option value="AMS">AMS</option>
                                        <option value="CSE">CSE</option>
                                        <option value="ESE">ESE</option>
                                        <option value="BMI">BMI</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="track" sm={4}>Track</Label>
                                <Col sm={8}><Input type="select" id="track" value={this.state.track} onChange = {e=> this.setState( {track: e.target.value })}>
                                    <option value="None">None</option>
                                    {this.state.department === 'AMS' && <>
                                        <option value="Computational Applied Mathematics">Computational Applied Mathematics</option>
                                        <option value="Computational Biology">Computational Biology</option>
                                        <option value="Operations Research">Operations Research</option>
                                        <option value="Statistics">Statistics</option>
                                        <option value="Quantitative Finance">Quantitative Finance</option>
                                    </>}
                                    {this.state.department === 'BMI' && <>
                                        <option value="Imaging Informatics with Thesis">Imaging Informatics with Thesis</option>
                                        <option value="Imaging Informatics with Project">Imaging Informatics with Project</option>
                                        <option value="Clinical Informatics with Thesis">Clinical Informatics with Thesis</option>
                                        <option value="Clinical Informatics with Project">Clinical Informatics with Project</option>
                                        <option value="Translational Bioinformatics with Thesis">Translational Bioinformatics with Thesis</option>
                                        <option value="Translational Bioinformatics with Project">Translational Bioinformatics with Project</option>
                                    </>}
                                    {(this.state.department === 'ESE' || this.state.department === 'CSE' ) && 
                                        <option value="Thesis">Thesis</option>
                                    }
                                    {this.state.department === 'ESE' && 
                                        <option value="Non-Thesis">Non-Thesis</option>
                                    }
                                    {this.state.department === 'CSE' &&<> 
                                        <option value="Advanced Project">Advanced Project</option>
                                        <option value="Special Project">Special Project</option>
                                    </>}
                                    </Input>
                                </Col>
                            </FormGroup>

                            <Row style={{padding:"0px", margin:"0px"}}>
                                <Col sm={2}>
                                    <Button onClick = {this.updateStudent} color="success" style={{}} >Save</Button>

                                </Col>
                                <br></br>
                             
                                <Col sm={10} style={{}}>
                                    { this.state.error === 1 &&
                                    <Alert color="danger" style={{margin:"0px", padding:"6px"}}>
                                        All fields must be filled.
                                    </Alert>}
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>
                    <Col xs={8} xl={6} style={{padding:"5px", margin:"0px"}}>
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Course Plan</p>
                        <Table  xs="3">
                            <thead><tr>
                                <th>Department</th>
                                <th>Number</th>
                                <th>Section</th>
                                <th>Semester</th>
                                <th>Year</th>
                                <th>Timeslot</th>
                                <th>Grade</th>

                                <th></th>
                                <th></th>
                            </tr></thead>
                            <tbody>
                                {this.state.courses.length !==0 && this.state.courses.map(x =>
                                <tr>
                                    <td>{x.newCourse.department }</td>
                                    <td>{x.newCourse.course_num}</td>
                                    <td>{x.newCourse.section}</td>
                                    <td>{x.newCourse.semester}</td>
                                    <td>{x.newCourse.year}</td>
                                    <td>{x.newCourse.timeslot}  </td>
                                    {x.grade && <td>{x.grade}  </td>}
                                    {!x.grade && <td>{"N/A"}  </td>}

                                   {( x.grade=="" || x.grade==null) && <td> 
                                     <Button  size = "sm" onClick={(e) => this.deleteCourseFromPlan(this.state.sbu_id,x.newCourse.department,x.newCourse.course_num,x.newCourse.semester,x.newCourse.year)}>Delete</Button>  
                                    </td>}
                                </tr>
                                )}
                            </tbody>

                        </Table>
                                              
                         <AddCourseModal buttonLabel="Add Course" addCourseToPlan={this.addCourseToPlan}></AddCourseModal>
                         <AddCourseWarningModal  toggle={this.toggleAddCourseWarningModal} modal={this.state.showAddCourseWarningModal}></AddCourseWarningModal>
                         <AddCourseWarningModal  toggle={this.toggleAddCourseWarningModal} modal={this.state.showAddCourseWarningModal}></AddCourseWarningModal>

                    </Col>
                    <Col xs={4} xl={3} style={{padding:"5px", margin:"0px"}}>
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Comments</p>
                        <Table>
                            <thead><tr>
                            </tr></thead>
                            <tbody>
                                {this.state.comments.length !==0 && this.state.comments.map(x =>
                                <tr>
                                    <td>{x}</td>
                                    <br></br>
                                </tr>
                                )}
                                {gpdLoggedIn==1 &&  <>
                                    <FormGroup row style={{alignItems: 'center',padding:"20px"}}>
                                        <Col style={{padding:"0px",margin:"2px"}}><Input type="text" id="commentToAdd"    onChange = {e=> this.setState( { commentToAdd: e.target.value})}/></Col>

                                        {console.log(this.state.emailNotifCheckbox)}
                                        
                                        <Button onClick = {(e) => this.state.emailNotifCheckbox ? this.addCommentAndNotify(this.state.commentToAdd, this.state.sbu_id) : this.addComment(this.state.commentToAdd, this.state.sbu_id)} color="success" style={{width:"60px",margin:"2px"}} >Save</Button>
                                        <Label check style={{width:"85px",paddingLeft:"25px", justifyContent: 'center'}}>
                                            <Input type="checkbox" onClick = {e => this.setState({emailNotifCheckbox: e.target.checked})} />
                                                Notify by Email
                                        </Label>
                                    </FormGroup>
                                </>}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row >
                    <Col xs={4} xl={3} style={{padding:"5px", margin:"0px", justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Suggest Course Plan</p>
                        <Form>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="max_courses" sm={4}>Max Number of Courses per Semester</Label>
                                    <Col sm={8}><Input type="text" id="max_courses" placeholder={""}   onChange = {e=> this.setState( { maxNumCourses: e.target.value })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="preferred_courses" sm={4}>Preferred Courses</Label>
                                    <Col sm={8}><Input type="text" id="preferred_courses" placeholder={""}   onChange = {e=> this.setState( {preferredCourses: e.target.value.split(",") })}/></Col>
                            </FormGroup>
                            <FormGroup row style={{alignItems: 'center'}}>
                                <Label for="avoid_courses" sm={4}>Courses to Avoid</Label>
                                    <Col sm={8}><Input type="text" id="avoid_courses" placeholder={""}   onChange = {e=> this.setState( {avoidCourses: e.target.value.split(",") })}/></Col>
                            </FormGroup>
                            
                            
                            <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button onClick = {this.regularSuggest} color="success" style={{width:"120px",margin:"5px"}} >Generate Course Plan Suggestions</Button>
                                <Button onClick = {this.smartSuggest} color="success" style={{width:"140px",margin:"5px"}} >Generate Smart Course Plan Suggestions</Button>

                            </Row>
                            

                        </Form>
                    </Col>
                    <Col sm={8} style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Suggested Course Plans</p>
                    
                    
                    <Table xs="3">
                                <thead><tr>
                                    <th>Department</th>
                                    <th>Number</th>
                                    <th>Section</th>
                                    <th>Semester</th>
                                    <th>Year</th>
                                    <th>Timeslot</th>
                                </tr></thead>
                                <tbody>
                                    {this.state.suggestedCoursePlans.length !==0 && this.state.suggestedCoursePlans[this.state.currentPage].map(x =>
                                    <tr>
                                        <td>{x.department }</td>
                                        <td>{x.course_num}</td>
                                        <td>{x.section}</td>
                                        <td>{x.semester}</td>
                                        <td>{x.year}</td>
                                        <td>{x.timeslot}  </td>
                                        
                                    </tr>
                                    )}
                                </tbody>
                    </Table>


                    <Pagination aria-label="plan navigation">
                       
                            <PaginationLink first href="#" />
                            <PaginationLink previous href="#" />
                            {this.state.suggestedCoursePlans.length !== 0 && this.state.suggestedCoursePlans.map( (x, index) => (
                                <PaginationItem active={index === this.state.currentPage} key={index}>
                                    <PaginationLink onClick={e => this.handlePageClick(e, index)}  href="#">{index+1}</PaginationLink>
                                </PaginationItem>
                            ))}
                            <Button color="success" onClick={this.acceptCoursePlan} style={{width:"120px",margin:"5px"}} >Accept</Button>
                            
                    </Pagination>


                    </Col>
                </Row>
            </Container>
        );
    }
}
