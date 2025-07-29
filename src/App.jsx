import { useEffect, useState } from 'react'
import { Button, Col, FormControl, FormLabel, InputGroup, Row, Spinner } from 'react-bootstrap'
import './App.css'

function App() {
  const [qrcodeInput, setQrcodeInput] = useState('')
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("ffffff");
  const [fgColor, setFgColor] = useState("000000");
  const [qrcode, setQrcode] = useState('')
  const [loading, setLoading] = useState(false);
  const generateQrCode = () => {
    setLoading(true);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcodeInput)}&size=${size}x${size}&bgcolor=${bgColor}&color=${fgColor}`;
    setQrcode(qrUrl);
    setTimeout(() => setLoading(false), 500);
  }

  useEffect(() => {
    if (qrcodeInput.trim()) {
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcodeInput)}&size=${size}x${size}&bgcolor=${bgColor}&color=${fgColor}`;
      setQrcode(url);
    } else {
      setQrcode('');
    }
  }, [qrcodeInput, size, bgColor, fgColor]);

  return (
    <>
      <div className='App'>
        <h1>React QR Code Generator</h1>
        <hr />
        <Row>
          <Col md={12} lg={12}>
            <InputGroup className="mb-3">
              <FormControl
                className='form-control'
                placeholder="Enter text"
                aria-label="Enter text"
                aria-describedby="basic-addon2"
                value={qrcodeInput}
                onChange={(e) => setQrcodeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    generateQrCode()
                  }
                }}
              />
              <Button 
                variant="primary" 
                id="button-addon2"
                disabled={!qrcodeInput.trim()}
                onClick={() => generateQrCode()}
              >
                Generate
              </Button>              
            </InputGroup>
            <InputGroup className="mb-3">
              <FormLabel >Size: &nbsp;</FormLabel>
              <FormControl
                type='range'
                min="200" 
                max="600"
                step={"50"}
                placeholder="Size"
                aria-label="Size"
                aria-describedby="basic-addon2"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormLabel>Background Color: &nbsp;</FormLabel>
              <FormControl
                type='color'
                className='form-control'
                placeholder="Background Color"
                aria-label="Background Color"
                aria-describedby="basic-addon2"
                value={`#${bgColor}`}
                onChange={(e) => setBgColor(e.target.value.substring(1))}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormLabel>Foreground Color: &nbsp;</FormLabel>
              <FormControl
                type='color'
                className='form-control'
                placeholder="Foreground Color"
                aria-label="Foreground Color"
                aria-describedby="basic-addon2"
                value={`#${fgColor}`}
                onChange={(e) => setFgColor(e.target.value.substring(1))}
              />
            </InputGroup>
          </Col>
        </Row>
        { qrcode && (
        <Row>
          <Col md={12} lg={12} className='d-flex flex-column justify-content-center align-items-center'>
            {loading ? <Spinner variant="primary" animation="border" /> : <img src={ qrcode } alt={qrcodeInput || "Generated QR Code"} /> }
            <a className='mt-4' href={qrcode} download="QRCode"><button type="button">Download</button></a>
          </Col>
        </Row>
        )}
      </div>
    </>
  )
}

export default App
