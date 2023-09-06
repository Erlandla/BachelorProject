import { useEffect, useState } from 'react'
import axios, { type AxiosResponse } from 'axios'

const useDownloadPdf = (url: string): (() => void) => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Blob> = await axios.get(url, {
          responseType: 'blob',
        })
        setPdfBlob(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData().catch(() => {})
  }, [url])

  const downloadPdf = () => {
    if (pdfBlob !== null && pdfBlob !== undefined) {
      const url = window.URL.createObjectURL(new Blob([pdfBlob ?? '']))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'NestaGuiden.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  return downloadPdf
}

export default useDownloadPdf
