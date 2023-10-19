import React, { useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";

const FaceRegistration = () => {
  const webcamRef = useRef(null);
  const [registrationStatus, setRegistrationStatus] = useState("");

  const handleRegisterFace = async () => {
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append("photos", dataURLtoFile(imageSrc, "photo.jpg"));
      formData.append("store", "1");

      const response = await axios.post(
        "https://api.luxand.cloud/v2/person/545a80de-c58c-11ed-a755-0242ac120003",
        formData,
        {
          headers: {
            token: "9587ab96af2540a9b952cae9247fcf7f", // Thay YOUR_API_TOKEN bằng mã thông báo API thực tế
            ...formData.getHeaders(),
          },
        }
      );

      if (response.data.isIdentical) {
        setRegistrationStatus("Khuôn mặt đã được đăng ký thành công.");
      } else {
        setRegistrationStatus(
          "Không thể xác minh khuôn mặt. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error(error);
      setRegistrationStatus("Lỗi xảy ra khi đăng ký khuôn mặt.");
    }
  };

  // Hàm chuyển đổi dữ liệu ảnh base64 thành tệp
  const dataURLtoFile = (dataURL, fileName) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div>
      <h1>Đăng ký khuôn mặt</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={handleRegisterFace}>Đăng ký khuôn mặt</button>
      <p>{registrationStatus}</p>
    </div>
  );
};

export default FaceRegistration;
