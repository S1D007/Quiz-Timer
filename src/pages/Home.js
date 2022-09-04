
import React, { useContext } from 'react'
import { EmailContext, UserNameProvider } from "../components/Functions/context"

function Home() {
  const email = useContext(EmailContext)
  const name = useContext(UserNameProvider)
  console.log(email);
  return (
    <div>Home Coming Soon...
      <div>
        {email}
      </div>
      {name}
    </div>
  )
}

export default Home