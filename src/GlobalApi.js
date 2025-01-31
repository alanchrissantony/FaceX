import axios from "axios";

const axiosClient=axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
})

const CreateNewResume = (data)=>axiosClient.post('/user-resumes/', data)
const GetUserResumes = (userEmail)=>axiosClient.get('/user-resumes/', { params: { email: userEmail } });
const UpdateUserResumes = (data)=>axiosClient.put('/user-resumes/', data)
const DeleteUserResumes = (id)=>axiosClient.delete('/user-resumes/', { params: { id: id } })

const GetResumeById = (id)=>axiosClient.get(`/user-resumes/${id}`)

const CreateUserExperience = (data)=>axiosClient.post('/user-resumes/experience/', data)
const CreateUserEducation = (data)=>axiosClient.post('/user-resumes/education/', data)
const CreateUserSkill = (data)=>axiosClient.post('/user-resumes/skill/', data)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateUserResumes,
    CreateUserExperience,
    CreateUserEducation,
    CreateUserSkill,
    GetResumeById,
    DeleteUserResumes
}