import * as React from "react"
const ArrowIcons = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 11 11 1m0 0H1m10 0v10"
    />
  </svg>
)
export default ArrowIcons