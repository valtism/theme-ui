/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import { useEffect, useState } from 'react'
import { Editor, Row, ColorPalette } from '@theme-ui/editor'

const fs = {
  open: async () => {
    const handle = await window.chooseFileSystemEntries({
      type: 'openFile',
      accepts: [
        {
          description: 'JSON',
          extensions: ['json'],
          mimeType: 'application/json',
        },
      ],
    })
    return handle
    // const file = await handle.getFile()
    // const content = await file.text()
    // return content
  },
}

export default props => {
  const { theme } = useThemeUI()
  const [canSave, setCanSave] = useState(false)
  const [handle, setHandle] = useState(null)
  const [url, setURL] = useState(null)
  useEffect(() => {
    const enabled = typeof window.chooseFileSystemEntries === 'function'
    const { origin } = window.location
    setCanSave(enabled)
    setURL(origin)
  }, [])

  useEffect(() => {
    console.log('theme update', theme)
    const save = async () => {
      console.log('saving file...')
      const json = JSON.stringify(theme, null, 2)
      const writer = await handle.createWriter()
      await writer.truncate(0)
      await writer.write(0, json)
      await writer.close()
      console.log('file saved')
    }
    if (handle) save()
  }, [theme])

  const openFile = () => {
    fs.open()
      .then(handle => {
        setHandle(handle)
      })
      .catch(e => {
        console.error(e)
      })
  }

  return (
    <Editor>
      <h1>Edit Theme</h1>
      {!canSave && <pre>File System API is not available in this browser</pre>}
      {canSave && (
        <div>
          {!handle && <button onClick={openFile}>Open File for saving</button>}
        </div>
      )}
      <ColorPalette />
      {/*
      <iframe
        src={url}
        width='768'
        height='512'
      />
      */}
    </Editor>
  )
}
