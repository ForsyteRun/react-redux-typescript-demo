import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { AppState } from "../redux/redux"

export const RequireAuth = ({children}: any) => {
   const isAuth = useSelector((state: AppState) => state.auth.isAuth)
   const location = useLocation()

   if(!isAuth){
      return <Navigate to = '/auth' state={{from: location}}/>
   }
    return children
}