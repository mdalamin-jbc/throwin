import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScannerComponent = () => {
  const [qrData, setQrData] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setQrData(result); // Set the scanned data
      console.log("Scanned QR code:", result);
    }
  };

  const handleError = (error) => {
    console.error("QR Scanner Error:", error); // Log any scanning errors
  };

  return (
    <div>
      <h2>QR Scanner</h2>
      <Scanner
        onDecode={handleScan} // Handles successful QR code scans
        onError={handleError} // Handles scanning errors
        style={{ width: "300px" }} // Adjust size as needed
      />
      {qrData && (
        <div>
          <h3>Scanned Data:</h3>
          <p>{qrData}</p>
        </div>
      )}
    </div>
  );
};

export default QRScannerComponent;
