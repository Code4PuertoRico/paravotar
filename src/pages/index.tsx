import { useEffect } from "react"

import { useNavigate } from "@reach/router"

import { withTrans } from "../i18n/withTrans"

const Inscribete = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/practica")
  }, [])

  return null
}

export default withTrans(Inscribete)
