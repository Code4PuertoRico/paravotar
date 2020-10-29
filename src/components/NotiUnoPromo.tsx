import React from "react"
import styled from "styled-components"

import NotiUno from "../assets/images/notiuno.png"
import Link from "./link"
import Typography from "./typography"

const PromoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  box-shadow: 0px 6px 10px #cacad9;
  border: 1px solid #886944;
  border-radius: 5px;
  background-color: white;
  margin: 0 10px;
`

const PromoContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  box-shadow: 0px 6px 10px #cacad9;
  border: 1px solid #886944;
  border-radius: 5px;
  background-color: white;
  margin: 0 10px;
`

export const NotiUnoPromo = () => (
  <Link to="https://www.notiuno.com/" target="_blank">
    <PromoContainer>
      <img className="h-10" src={NotiUno} alt="NotiUno" />
      <span>
        <Typography variant="p" tag="span">
          En alianza te invita a
        </Typography>
        <br />
        <Typography variant="p" tag="span">
          <strong className="text-primary">PRACTICAR</strong> tu voto.
        </Typography>
      </span>
    </PromoContainer>
  </Link>
)

export const NotiUnoPromoSideBar = () => (
  <Link to="https://www.notiuno.com/" target="_blank">
    <PromoContainerColumn>
      <img className="h-10" src={NotiUno} alt="NotiUno" />
      <span className="mt-4">
        <Typography variant="p" tag="span">
          En alianza te invita a
        </Typography>
        <br />
        <Typography variant="p" tag="span">
          <strong className="text-primary">PRACTICAR</strong> tu voto.
        </Typography>
      </span>
    </PromoContainerColumn>
  </Link>
)
