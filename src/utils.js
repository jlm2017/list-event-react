import React from 'react'

export function Error(props) {
  return <h4 className="text-center">{props.message}</h4>
}

export function Loading(props) {
  return <p className="text-center">
    {props.message || "Chargement"}
  </p>
}
