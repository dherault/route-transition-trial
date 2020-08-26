import React, { useEffect, useState } from 'react'

import { randomRange } from '../utils/math'

const { PI, cos, sin } = Math
const TAU = 2 * PI

function Blob({ color = 'blue', x, y }) {
  const width = window.innerWidth
  const height = window.innerHeight
  const cx = x || width / 2
  const cy = y || height / 2

  const [points, setPoints] = useState(() => {
    const nPoints = randomRange(6, 12) * 2
    const points = []
    const baseAngle = TAU / nPoints
    const baseSize = 100

    for (let i = 0; i < nPoints; i++) {
      points.push({
        rho: baseSize + (-1) ** i * randomRange(0, baseSize / 8),
        theta: i * baseAngle,
      })
    }

    return points
  })

  useEffect(() => {
    updatePoints()
  }, [updatePoints])

  function updatePoints() {
    // console.log('update')
    const nextPoints = points.map(({ rho, theta }) => ({
      rho: rho + 0.001,
      theta,
    }))

    setPoints(nextPoints)

    window.requestAnimationFrame(updatePoints)
  }

  const cartesianPoints = points.map(({ rho, theta }) => ({
    x: rho * cos(theta) + cx,
    y: rho * sin(theta) + cy,
  }))

  const halfPoints = cartesianPoints.map(({ x, y }, i) => {
    const p = cartesianPoints[i === 0 ? cartesianPoints.length - 1 : i - 1]

    return {
      x: (x + p.x) / 2,
      y: (y + p.y) / 2,
    }
  })

  let path = `M ${halfPoints[0].x} ${halfPoints[0].y}`

  for (let i = 0; i < cartesianPoints.length; i++) {
    const p = cartesianPoints[i]
    const hp = halfPoints[i === cartesianPoints.length - 1 ? 0 : i + 1]

    path += `C ${p.x} ${p.y}, ${p.x} ${p.y}, ${hp.x} ${hp.y}`
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <path d={path} fill={color} />
    </svg>
  )
}

export default Blob
