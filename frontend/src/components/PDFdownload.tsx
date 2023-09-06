import React from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import useDownloadPdf from '../hooks/useDownloadPdf'

const PDFdownload: React.FC = () => {
  return (
    <p
      onClick={useDownloadPdf('http://localhost:8080/nesta')}
      className="text-xs text-linkBlue underline underline-offset2 mb-5 whitespace-nowrap text-left cursor-pointer"
    >
      Last ned oversettelse av NESTA-guiden <DownloadIcon sx={{ fontSize: 'medium' }} />
    </p>
  )
}

export default PDFdownload
