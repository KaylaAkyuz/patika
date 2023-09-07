import React from 'react'

import { Button } from 'sakura-button'
import 'sakura-button/dist/index.css'

const App = () => {
  return (
    <>
      <div>
        Normal Size:
        <br />
        <Button text='Primary Button' type='primary' />
        <Button text='Default Button' />
        <Button text='Dashed Button' type='dashed' />
        <Button text='Text Button' type='text' />
        <Button text='Link Button' type='link' />
      </div>
      <div>
        Full Size:
        <br />
        <Button text='Primary Button' type='primary' fullSize={true} />
        <Button text='Default Button' fullSize={true} />
        <Button text='Dashed Button' type='dashed' fullSize={true} />
        <Button text='Text Button' type='text' fullSize={true} />
        <Button text='Link Button' type='link' fullSize={true} />
      </div>
    </>
  )
}

export default App
