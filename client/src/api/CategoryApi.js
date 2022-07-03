import axios from 'axios'
import { useEffect ,useState} from 'react'

export default function CategoryApi(token) {
    const [categories,setCategories] = useState([])
    const [callback,setCallback] = useState(false)

useEffect(()=>{
    const getCategory = async () => {
        try {
            const res = await axios.get("/api/category")
            setCategories(res.data)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    getCategory()
},[token,callback])

  return {
      category: [categories,setCategories],
      callback: [callback,setCallback]

  }
}
