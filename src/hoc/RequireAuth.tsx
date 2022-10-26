import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { AppState } from "../redux/redux"

export const RequireAuth = ({children}: any) => {
   const isAuth = useSelector((state: AppState) => state.auth.isAuth)
   const navigate = useNavigate()

   if(!isAuth){
      return <Navigate to/>
   }
    return children
}